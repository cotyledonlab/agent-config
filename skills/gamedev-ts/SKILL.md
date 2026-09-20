---
name: gamedev-ts
description: Build TypeScript browser games with Canvas 2D, Vite, and Vitest. Use for game loops, entities, input, collision, and game rendering.
---

# gamedev-ts

```yaml
name: gamedev-ts
description: TypeScript browser game development with Canvas 2D, Vite, and Vitest
version: 1.0.0
tags: [gamedev, typescript, canvas, vite, vitest, 2d-games]
globs: ["**/*.ts", "**/*.tsx", "**/vite.config.*", "**/vitest.config.*"]
```

## Overview

Patterns and practices for 2D browser games using TypeScript, Canvas API, Vite bundler, and Vitest testing.

## Project Structure

```
src/
├── main.ts           # Entry point, game initialization
├── game/
│   ├── Game.ts       # Main game class, loop orchestration
│   ├── types.ts      # Shared interfaces and types
│   └── constants.ts  # Game configuration
├── entities/
│   ├── Entity.ts     # Base entity class
│   └── ...           # Specific entities (Player, Enemy, etc.)
├── systems/
│   ├── InputSystem.ts
│   ├── PhysicsSystem.ts
│   └── RenderSystem.ts
├── utils/
│   ├── math.ts       # Vector ops, collision, etc.
│   └── helpers.ts
└── assets/           # Sprites, audio references
```

## Game Loop Pattern

Use **fixed timestep** for deterministic physics:

```typescript
class Game {
  private accumulator = 0;
  private readonly TICK_RATE = 1000 / 60; // 60 updates/sec

  loop(timestamp: number): void {
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.accumulator += delta;

    while (this.accumulator >= this.TICK_RATE) {
      this.update(this.TICK_RATE);
      this.accumulator -= this.TICK_RATE;
    }

    this.render(this.accumulator / this.TICK_RATE); // interpolation alpha
    requestAnimationFrame((t) => this.loop(t));
  }
}
```

See: [references/game-loop.md](references/game-loop.md)

## ECS-Lite Pattern

For small games, use a lightweight entity-component approach:

```typescript
interface Entity {
  id: number;
  position?: Vec2;
  velocity?: Vec2;
  sprite?: Sprite;
  health?: number;
  // Add components as optional properties
}

// Systems operate on entities with required components
function updatePhysics(entities: Entity[], dt: number): void {
  for (const e of entities) {
    if (e.position && e.velocity) {
      e.position.x += e.velocity.x * dt;
      e.position.y += e.velocity.y * dt;
    }
  }
}
```

See: [references/ecs-patterns.md](references/ecs-patterns.md)

## State Machines

Use discriminated unions for game/entity states:

```typescript
type GameState =
  | { kind: 'menu' }
  | { kind: 'playing'; level: number }
  | { kind: 'paused'; resumeState: GameState }
  | { kind: 'gameover'; score: number };

function transition(state: GameState, event: GameEvent): GameState {
  switch (state.kind) {
    case 'menu':
      if (event === 'start') return { kind: 'playing', level: 1 };
      break;
    case 'playing':
      if (event === 'pause') return { kind: 'paused', resumeState: state };
      break;
    // ...
  }
  return state;
}
```

## Canvas 2D Best Practices

```typescript
// Cache canvas context
const ctx = canvas.getContext('2d')!;

// Use integer coordinates for crisp pixels
ctx.imageSmoothingEnabled = false;

// Batch similar draw calls
ctx.save();
ctx.fillStyle = 'red';
entities.filter(e => e.team === 'red').forEach(e => {
  ctx.fillRect(Math.floor(e.x), Math.floor(e.y), e.w, e.h);
});
ctx.restore();

// Offscreen canvas for static backgrounds
const bgCanvas = new OffscreenCanvas(width, height);
const bgCtx = bgCanvas.getContext('2d')!;
// Draw once, blit every frame
ctx.drawImage(bgCanvas, 0, 0);
```

## Sprite & Tilemap Handling

```typescript
interface Sprite {
  image: HTMLImageElement;
  frames: { x: number; y: number; w: number; h: number }[];
  frameTime: number;
}

function drawSprite(ctx: CanvasRenderingContext2D, sprite: Sprite, frame: number, x: number, y: number): void {
  const f = sprite.frames[frame % sprite.frames.length];
  ctx.drawImage(sprite.image, f.x, f.y, f.w, f.h, x, y, f.w, f.h);
}

// Tilemap: 2D array of tile IDs
type Tilemap = number[][];

function drawTilemap(ctx: CanvasRenderingContext2D, map: Tilemap, tileset: HTMLImageElement, tileSize: number): void {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      const sx = (tile % 16) * tileSize;
      const sy = Math.floor(tile / 16) * tileSize;
      ctx.drawImage(tileset, sx, sy, tileSize, tileSize, x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}
```

## Game Math Essentials

```typescript
interface Vec2 { x: number; y: number; }

const vec2 = {
  add: (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y }),
  sub: (a: Vec2, b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y }),
  scale: (v: Vec2, s: number): Vec2 => ({ x: v.x * s, y: v.y * s }),
  length: (v: Vec2): number => Math.hypot(v.x, v.y),
  normalize: (v: Vec2): Vec2 => {
    const len = vec2.length(v);
    return len > 0 ? vec2.scale(v, 1 / len) : { x: 0, y: 0 };
  },
  dot: (a: Vec2, b: Vec2): number => a.x * b.x + a.y * b.y,
  distance: (a: Vec2, b: Vec2): number => vec2.length(vec2.sub(a, b)),
};
```

See: [references/collision.md](references/collision.md) for AABB, circle collision, spatial hashing.

## Pathfinding Basics (A*)

```typescript
function astar(grid: boolean[][], start: Vec2, goal: Vec2): Vec2[] {
  // Priority queue, came_from map, g/f scores
  // Heuristic: Manhattan or Euclidean distance
  // Return path or empty array if unreachable
}
```

Keep pathfinding off the main thread for large grids (use Web Workers).

## Testing Strategies

### Deterministic Updates
- Pass `dt` explicitly—never use `Date.now()` inside update logic
- Seed random number generators for reproducibility

### Mocking Time
```typescript
// vitest example
import { vi, describe, it, expect } from 'vitest';

describe('Game.update', () => {
  it('moves entity by velocity * dt', () => {
    const entity = { position: { x: 0, y: 0 }, velocity: { x: 10, y: 0 } };
    updatePhysics([entity], 0.016); // 16ms tick
    expect(entity.position.x).toBeCloseTo(0.16);
  });
});
```

### Snapshot Testing for Rendering
Use canvas snapshots sparingly; prefer logic-only unit tests.

## Vite + Vitest Setup

```bash
npm create vite@latest my-game -- --template vanilla-ts
cd my-game
npm install -D vitest
```

**vite.config.ts**
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: { target: 'esnext' },
});
```

**vitest.config.ts**
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // for canvas/DOM tests
    include: ['src/**/*.test.ts'],
  },
});
```

**package.json scripts**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

## Quick Checklist

- [ ] Fixed timestep game loop
- [ ] Separate update (logic) from render
- [ ] Use `Vec2` interface consistently
- [ ] Entity factory functions for spawning
- [ ] Input abstraction (keyboard/mouse/gamepad)
- [ ] State machine for game flow
- [ ] Unit tests for core math and systems
- [ ] Asset preloading before game start
