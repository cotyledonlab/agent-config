# Sprite Design Conventions

## Perspective

### Top-Down (90°)
- View from directly above
- Good for: tile-based games, classic RPGs
- Characters show top of head
- Buildings show roof

### ¾ View (Isometric-ish, ~45°)
- Most common for RTS games
- Shows front and top
- Characters face camera at angle
- Buildings show front wall and roof
- **Standard for RTS units and buildings**

### Side View
- Pure profile view
- Good for: platformers, fighting games
- Full character silhouette visible

## Facing Directions

### 4-Direction System
```
    N (Up/Away)
       ↑
W ←    ●    → E (Right)
       ↓
    S (Down/Toward)
```

For ¾ view RTS:
- **South/Down**: Default, facing camera
- **East/Right**: Profile facing right
- **North/Up**: Back view
- **West/Left**: Profile facing left (often mirrored East)

### 8-Direction System
Add diagonals: NE, SE, SW, NW

**Tip**: Create E, SE, S sprites; mirror horizontally for W, SW, N variants.

## Unit Sprite Guidelines

### Soldier (Infantry) - 32×32
```
Structure:
- Head: 6-8 px wide, top third
- Body: 8-12 px wide, middle  
- Legs: slightly apart, bottom
- Weapon: visible, extends from body

Key features to show:
- Helmet/head shape
- Uniform color (team color area)
- Weapon silhouette
- Stance (ready/walking)
```

### Tank (Vehicle) - 32×32
```
Structure:
- Turret: top, ~12px wide
- Hull: main body, ~20-24px wide
- Tracks: sides, ~4px tall

Key features:
- Gun barrel (extends from turret)
- Track detail (simple rectangles)
- Team color on hull
- Shadow underneath
```

### Harvester (Utility) - 32×32
```
Structure:  
- Cab: front, ~10px
- Body/cargo: main area, ~18px
- Collection arm/scoop: front bottom

Key features:
- Industrial look
- Cargo area visible
- Work equipment
- Slower, bulkier silhouette
```

## Building Sprite Guidelines

### Base/HQ - 64×64
```
Structure:
- Main building: 50-60px wide
- Entrance: bottom center
- Roof details: top
- Team color accents

Should convey:
- Importance/command
- Larger than other buildings
- Central, balanced design
```

### Barracks - 64×64
```
Structure:
- Rectangular, utilitarian
- Door(s) visible
- Windows optional
- Military aesthetic

Should convey:
- Troop production
- Functional, not fancy
```

### Factory - 64×64  
```
Structure:
- Industrial elements
- Smokestacks or vents
- Large door for vehicles
- Mechanical details

Should convey:
- Heavy industry
- Vehicle/tank production
- Larger footprint feel
```

## Terrain Tile Guidelines

### Seamless Tiling
Tiles must connect smoothly in all directions:
```
[A][B][A][B]
[B][A][B][A]  ← Should look continuous
[A][B][A][B]
```

**Technique**: Wrap edges. Left edge must match right, top must match bottom.

### Grass Tile - 32×32
```
- Base green fill
- 3-4 shades for variation
- Random grass blade details
- Subtle, not busy
- Darker at edges (optional, for depth)
```

### Dirt Tile - 32×32
```
- Brown base
- Darker patches for texture
- Small pebble details (1-2px dots)
- Can have sparse grass tufts
```

### Water Tile - 32×32
```
- Animated: 2-4 frames
- Wave patterns
- Lighter highlights (foam/reflection)
- Consider transparency for shoreline
```

## Animation Frames

### Idle Animation
- 2-4 frames
- Subtle movement (breathing, shifting weight)
- Loop seamlessly
- ~200ms per frame

### Walk Cycle (4 frames)
```
Frame 0: Contact (foot strikes ground)
Frame 1: Passing (legs cross)
Frame 2: Contact (other foot)
Frame 3: Passing (legs cross)
```

### Attack Animation
```
Frame 0: Ready stance
Frame 1: Wind-up
Frame 2: Strike (weapon extended)
Frame 3: Recovery
```

## Shadow Conventions

### Drop Shadow
- Offset 1-2px down and right
- Semi-transparent black/dark
- Simple oval or sprite shape

### Attached Shadow
- Part of sprite, on ground plane
- Darker shade of ground color
- Suggests lighting direction

## Team Colors

Reserve a specific area/color for team identification:
- 3-5 pixels of a "marker" color
- Replace programmatically
- Common: shoulder pads, flags, building trim

```javascript
// Replace team color marker with actual team color
const teamColors = {
  red: '#b33939',
  blue: '#3d7a9e', 
  green: '#3d7a3d',
  yellow: '#d4a857',
};
```

## Quality Checklist

- [ ] Silhouette is readable at 1x scale
- [ ] Uses limited, consistent palette
- [ ] Has clear outline or contrast
- [ ] Animation loops smoothly
- [ ] Tile edges match (for terrain)
- [ ] Team color area defined
- [ ] Shadow included (if appropriate)
- [ ] File naming follows convention
