# ECS-Lite Patterns for Small Games

Full ECS frameworks (bitecs, ecsy) add complexity. For small games, use these lightweight patterns.

## Option 1: Interface with Optional Components

```typescript
interface Entity {
  id: number;
  tags: Set<string>;
  
  // Components as optional properties
  position?: Vec2;
  velocity?: Vec2;
  sprite?: Sprite;
  health?: { current: number; max: number };
  collider?: { type: 'aabb' | 'circle'; width?: number; height?: number; radius?: number };
  ai?: { state: string; target?: Entity };
}

// Type guard helpers
function hasPhysics(e: Entity): e is Entity & { position: Vec2; velocity: Vec2 } {
  return e.position !== undefined && e.velocity !== undefined;
}

function hasHealth(e: Entity): e is Entity & { health: { current: number; max: number } } {
  return e.health !== undefined;
}
```

## Option 2: Component Maps (Data-Oriented)

```typescript
type EntityId = number;

interface World {
  nextId: number;
  entities: Set<EntityId>;
  
  // Component storage
  positions: Map<EntityId, Vec2>;
  velocities: Map<EntityId, Vec2>;
  sprites: Map<EntityId, Sprite>;
  healths: Map<EntityId, { current: number; max: number }>;
}

function createEntity(world: World): EntityId {
  const id = world.nextId++;
  world.entities.add(id);
  return id;
}

function destroyEntity(world: World, id: EntityId): void {
  world.entities.delete(id);
  world.positions.delete(id);
  world.velocities.delete(id);
  world.sprites.delete(id);
  world.healths.delete(id);
}
```

## Systems

Systems are functions that process entities with specific components:

```typescript
function physicsSystem(world: World, dt: number): void {
  for (const id of world.entities) {
    const pos = world.positions.get(id);
    const vel = world.velocities.get(id);
    if (pos && vel) {
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;
    }
  }
}

function renderSystem(ctx: CanvasRenderingContext2D, world: World): void {
  for (const id of world.entities) {
    const pos = world.positions.get(id);
    const sprite = world.sprites.get(id);
    if (pos && sprite) {
      drawSprite(ctx, sprite, pos.x, pos.y);
    }
  }
}

function healthSystem(world: World): void {
  for (const id of world.entities) {
    const health = world.healths.get(id);
    if (health && health.current <= 0) {
      destroyEntity(world, id);
    }
  }
}
```

## Entity Factories

```typescript
function createPlayer(world: World, x: number, y: number): EntityId {
  const id = createEntity(world);
  world.positions.set(id, { x, y });
  world.velocities.set(id, { x: 0, y: 0 });
  world.healths.set(id, { current: 100, max: 100 });
  world.sprites.set(id, playerSprite);
  return id;
}

function createBullet(world: World, x: number, y: number, vx: number, vy: number): EntityId {
  const id = createEntity(world);
  world.positions.set(id, { x, y });
  world.velocities.set(id, { x: vx, y: vy });
  // No health - bullets are destroyed on collision
  return id;
}
```

## Querying Entities

```typescript
function* entitiesWith<K extends keyof World>(
  world: World,
  ...components: K[]
): Generator<EntityId> {
  for (const id of world.entities) {
    const hasAll = components.every(c => {
      const store = world[c];
      return store instanceof Map && store.has(id);
    });
    if (hasAll) yield id;
  }
}

// Usage
for (const id of entitiesWith(world, 'positions', 'velocities')) {
  // Process physics entities
}
```

## Tags for Entity Types

```typescript
interface World {
  // ... components
  tags: Map<EntityId, Set<string>>;
}

function hasTag(world: World, id: EntityId, tag: string): boolean {
  return world.tags.get(id)?.has(tag) ?? false;
}

function addTag(world: World, id: EntityId, tag: string): void {
  if (!world.tags.has(id)) world.tags.set(id, new Set());
  world.tags.get(id)!.add(tag);
}

// Usage
if (hasTag(world, id, 'enemy')) {
  // Enemy-specific logic
}
```

## When to Use Full ECS

Consider a real ECS library when you have:
- 1000+ active entities
- Complex component combinations
- Need for cache-friendly iteration
- Multiple developers needing clear architecture

For jam games and prototypes, these patterns are simpler and sufficient.
