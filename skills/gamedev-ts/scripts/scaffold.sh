#!/bin/bash
# Scaffold a new TypeScript game project with Vite + Vitest
# Usage: ./scaffold.sh my-game-name

set -e

NAME="${1:-my-game}"

echo "Creating game project: $NAME"

npm create vite@latest "$NAME" -- --template vanilla-ts
cd "$NAME"

# Install dev dependencies
npm install -D vitest jsdom @types/node

# Create vitest config
cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
});
EOF

# Update vite config
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'esnext',
  },
});
EOF

# Create game directory structure
mkdir -p src/game src/entities src/systems src/utils

# Create Vec2 utility
cat > src/utils/math.ts << 'EOF'
export interface Vec2 {
  x: number;
  y: number;
}

export const vec2 = {
  create: (x = 0, y = 0): Vec2 => ({ x, y }),
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
EOF

# Create sample test
cat > src/utils/math.test.ts << 'EOF'
import { describe, it, expect } from 'vitest';
import { vec2 } from './math';

describe('vec2', () => {
  it('adds vectors', () => {
    const result = vec2.add({ x: 1, y: 2 }, { x: 3, y: 4 });
    expect(result).toEqual({ x: 4, y: 6 });
  });

  it('calculates length', () => {
    expect(vec2.length({ x: 3, y: 4 })).toBe(5);
  });

  it('normalizes vectors', () => {
    const result = vec2.normalize({ x: 3, y: 4 });
    expect(result.x).toBeCloseTo(0.6);
    expect(result.y).toBeCloseTo(0.8);
  });
});
EOF

# Create Game class
cat > src/game/Game.ts << 'EOF'
export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private running = false;
  private lastTime = 0;
  private accumulator = 0;
  private readonly TICK_RATE = 1000 / 60;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

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

    const frameTime = Math.min(timestamp - this.lastTime, 250);
    this.lastTime = timestamp;
    this.accumulator += frameTime;

    while (this.accumulator >= this.TICK_RATE) {
      this.update(this.TICK_RATE);
      this.accumulator -= this.TICK_RATE;
    }

    this.render(this.accumulator / this.TICK_RATE);
    requestAnimationFrame((t) => this.loop(t));
  }

  private update(dt: number): void {
    // TODO: Update game logic
  }

  private render(alpha: number): void {
    const { ctx, canvas } = this;
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // TODO: Render entities
    ctx.fillStyle = '#eee';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Ready!', canvas.width / 2, canvas.height / 2);
  }
}
EOF

# Update main.ts
cat > src/main.ts << 'EOF'
import './style.css';
import { Game } from './game/Game';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.querySelector<HTMLDivElement>('#app')!.appendChild(canvas);

const game = new Game(canvas);
game.start();
EOF

# Update package.json scripts
npm pkg set scripts.test="vitest"
npm pkg set scripts.test:run="vitest run"

echo ""
echo "✅ Game project created: $NAME"
echo ""
echo "Next steps:"
echo "  cd $NAME"
echo "  npm run dev     # Start dev server"
echo "  npm run test    # Run tests in watch mode"
echo "  npm run build   # Build for production"
EOF
