# Game Loop Patterns

## Basic requestAnimationFrame Loop

```typescript
class Game {
  private running = false;
  private lastTime = 0;

  start(): void {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  stop(): void {
    this.running = false;
  }

  private loop(timestamp: number): void {
    if (!this.running) return;

    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(delta);
    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }
}
```

## Fixed Timestep (Recommended)

Decouples physics/logic from frame rate for deterministic behavior:

```typescript
class Game {
  private accumulator = 0;
  private lastTime = 0;
  
  // Physics runs at 60 Hz
  private readonly TICK_RATE = 1000 / 60; // ~16.67ms
  private readonly MAX_FRAME_TIME = 250;  // Prevent spiral of death

  private loop(timestamp: number): void {
    let frameTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Clamp to avoid spiral of death on tab switch
    if (frameTime > this.MAX_FRAME_TIME) {
      frameTime = this.MAX_FRAME_TIME;
    }

    this.accumulator += frameTime;

    // Fixed timestep updates
    while (this.accumulator >= this.TICK_RATE) {
      this.update(this.TICK_RATE);
      this.accumulator -= this.TICK_RATE;
    }

    // Interpolation factor for smooth rendering
    const alpha = this.accumulator / this.TICK_RATE;
    this.render(alpha);

    requestAnimationFrame((t) => this.loop(t));
  }
}
```

## Interpolation for Smooth Rendering

Store previous and current positions, blend for rendering:

```typescript
interface Interpolatable {
  prevPosition: Vec2;
  position: Vec2;
}

function renderInterpolated(entity: Interpolatable, alpha: number): Vec2 {
  return {
    x: entity.prevPosition.x + (entity.position.x - entity.prevPosition.x) * alpha,
    y: entity.prevPosition.y + (entity.position.y - entity.prevPosition.y) * alpha,
  };
}

// In update(), before moving:
entity.prevPosition = { ...entity.position };
```

## Frame Rate Independence

Always multiply velocities by delta time:

```typescript
// Wrong - frame-rate dependent
entity.x += entity.vx;

// Correct - frame-rate independent
entity.x += entity.vx * (dt / 1000); // dt in ms, velocity in units/sec
```

## Visibility API (Pause on Tab Switch)

```typescript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    game.pause();
  } else {
    game.resume();
    // Reset lastTime to avoid huge delta
    this.lastTime = performance.now();
  }
});
```

## Performance Monitoring

```typescript
class FPSCounter {
  private frames = 0;
  private lastCheck = 0;
  fps = 0;

  tick(timestamp: number): void {
    this.frames++;
    if (timestamp - this.lastCheck >= 1000) {
      this.fps = this.frames;
      this.frames = 0;
      this.lastCheck = timestamp;
    }
  }
}
```
