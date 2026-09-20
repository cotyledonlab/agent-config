# Collision Detection

## AABB (Axis-Aligned Bounding Box)

```typescript
interface AABB {
  x: number;      // left edge
  y: number;      // top edge
  width: number;
  height: number;
}

function aabbOverlap(a: AABB, b: AABB): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Center-based AABB (often more convenient)
interface AABBCenter {
  cx: number;     // center x
  cy: number;     // center y
  hw: number;     // half-width
  hh: number;     // half-height
}

function aabbCenterOverlap(a: AABBCenter, b: AABBCenter): boolean {
  return (
    Math.abs(a.cx - b.cx) < a.hw + b.hw &&
    Math.abs(a.cy - b.cy) < a.hh + b.hh
  );
}
```

## Circle Collision

```typescript
interface Circle {
  x: number;
  y: number;
  radius: number;
}

function circleOverlap(a: Circle, b: Circle): boolean {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distSq = dx * dx + dy * dy;
  const radiiSum = a.radius + b.radius;
  return distSq < radiiSum * radiiSum;
}

// Avoid sqrt when possible - compare squared distances
```

## Circle vs AABB

```typescript
function circleAABBOverlap(circle: Circle, rect: AABB): boolean {
  // Find closest point on rectangle to circle center
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  
  return dx * dx + dy * dy < circle.radius * circle.radius;
}
```

## Point in Shape

```typescript
function pointInAABB(px: number, py: number, rect: AABB): boolean {
  return (
    px >= rect.x &&
    px <= rect.x + rect.width &&
    py >= rect.y &&
    py <= rect.y + rect.height
  );
}

function pointInCircle(px: number, py: number, circle: Circle): boolean {
  const dx = px - circle.x;
  const dy = py - circle.y;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}
```

## Collision Response (AABB)

```typescript
interface CollisionResult {
  overlap: boolean;
  penetration: Vec2;  // How much to push a out of b
  normal: Vec2;       // Direction to push
}

function aabbCollision(a: AABBCenter, b: AABBCenter): CollisionResult {
  const dx = a.cx - b.cx;
  const dy = a.cy - b.cy;
  const overlapX = a.hw + b.hw - Math.abs(dx);
  const overlapY = a.hh + b.hh - Math.abs(dy);

  if (overlapX <= 0 || overlapY <= 0) {
    return { overlap: false, penetration: { x: 0, y: 0 }, normal: { x: 0, y: 0 } };
  }

  // Push out along axis of least penetration
  if (overlapX < overlapY) {
    const signX = Math.sign(dx);
    return {
      overlap: true,
      penetration: { x: overlapX * signX, y: 0 },
      normal: { x: signX, y: 0 },
    };
  } else {
    const signY = Math.sign(dy);
    return {
      overlap: true,
      penetration: { x: 0, y: overlapY * signY },
      normal: { x: 0, y: signY },
    };
  }
}
```

## Spatial Hashing

For many entities, avoid O(n²) checks with spatial partitioning:

```typescript
class SpatialHash<T extends { x: number; y: number }> {
  private cellSize: number;
  private cells = new Map<string, T[]>();

  constructor(cellSize: number) {
    this.cellSize = cellSize;
  }

  private key(x: number, y: number): string {
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    return `${cx},${cy}`;
  }

  clear(): void {
    this.cells.clear();
  }

  insert(entity: T): void {
    const k = this.key(entity.x, entity.y);
    if (!this.cells.has(k)) this.cells.set(k, []);
    this.cells.get(k)!.push(entity);
  }

  // For AABB entities, insert into all overlapping cells
  insertAABB(entity: T & AABB): void {
    const x0 = Math.floor(entity.x / this.cellSize);
    const y0 = Math.floor(entity.y / this.cellSize);
    const x1 = Math.floor((entity.x + entity.width) / this.cellSize);
    const y1 = Math.floor((entity.y + entity.height) / this.cellSize);

    for (let cy = y0; cy <= y1; cy++) {
      for (let cx = x0; cx <= x1; cx++) {
        const k = `${cx},${cy}`;
        if (!this.cells.has(k)) this.cells.set(k, []);
        this.cells.get(k)!.push(entity);
      }
    }
  }

  query(x: number, y: number): T[] {
    return this.cells.get(this.key(x, y)) ?? [];
  }

  queryArea(rect: AABB): T[] {
    const result = new Set<T>();
    const x0 = Math.floor(rect.x / this.cellSize);
    const y0 = Math.floor(rect.y / this.cellSize);
    const x1 = Math.floor((rect.x + rect.width) / this.cellSize);
    const y1 = Math.floor((rect.y + rect.height) / this.cellSize);

    for (let cy = y0; cy <= y1; cy++) {
      for (let cx = x0; cx <= x1; cx++) {
        for (const e of this.cells.get(`${cx},${cy}`) ?? []) {
          result.add(e);
        }
      }
    }
    return [...result];
  }
}
```

## Broad Phase + Narrow Phase

```typescript
function detectCollisions(entities: Entity[]): [Entity, Entity][] {
  const hash = new SpatialHash<Entity>(64);
  const pairs: [Entity, Entity][] = [];
  const checked = new Set<string>();

  // Broad phase: spatial hash
  for (const e of entities) {
    hash.insertAABB(e);
  }

  // Narrow phase: actual collision tests
  for (const a of entities) {
    for (const b of hash.queryArea(a)) {
      if (a.id >= b.id) continue; // Avoid duplicate pairs
      
      const pairKey = `${a.id}-${b.id}`;
      if (checked.has(pairKey)) continue;
      checked.add(pairKey);

      if (aabbOverlap(a, b)) {
        pairs.push([a, b]);
      }
    }
  }

  return pairs;
}
```

## Choosing Cell Size

- Too small: entities span many cells, more insertions
- Too large: many entities per cell, more narrow-phase checks
- Rule of thumb: **2x the average entity size**
