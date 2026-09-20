# Pixel Art Palettes

## RTS Military Palette (16 colors)

Designed for real-time strategy games with military units and industrial buildings.

```
Name            Hex       Use
─────────────────────────────────────────
Black           #1a1a2e   Outlines, shadows
Dark Gray       #2d2d44   Metal shadows
Gray            #4a4a5c   Metal mid
Light Gray      #8b8b9e   Metal highlights
White           #e8e8ec   Brightest highlights

Dark Brown      #3d2817   Wood/earth dark
Brown           #5c3a21   Wood/earth mid  
Tan             #8b6914   Sand, dirt
Cream           #d4a857   Light sand

Dark Green      #1e3d1a   Forest dark
Green           #3d7a3d   Grass, camo
Light Green     #7cb342   Grass highlight

Dark Blue       #1a3d5c   Water dark
Blue            #3d7a9e   Water mid
Light Blue      #7cb8d4   Water highlight

Red             #b33939   Danger, health
Orange          #d4843d   Fire, warnings
Yellow          #e8d857   Selection, energy
```

### Palette as JavaScript Object
```javascript
const RTS_PALETTE = {
  outline: '#1a1a2e',
  metalDark: '#2d2d44',
  metalMid: '#4a4a5c', 
  metalLight: '#8b8b9e',
  highlight: '#e8e8ec',
  earthDark: '#3d2817',
  earthMid: '#5c3a21',
  sand: '#8b6914',
  sandLight: '#d4a857',
  forestDark: '#1e3d1a',
  grass: '#3d7a3d',
  grassLight: '#7cb342',
  waterDark: '#1a3d5c',
  waterMid: '#3d7a9e',
  waterLight: '#7cb8d4',
  danger: '#b33939',
  fire: '#d4843d',
  energy: '#e8d857',
};
```

## Classic 16-Color (CGA-inspired)

```
#000000  Black
#0000aa  Dark Blue
#00aa00  Dark Green
#00aaaa  Dark Cyan
#aa0000  Dark Red
#aa00aa  Dark Magenta
#aa5500  Brown
#aaaaaa  Light Gray
#555555  Dark Gray
#5555ff  Blue
#55ff55  Green
#55ffff  Cyan
#ff5555  Red
#ff55ff  Magenta
#ffff55  Yellow
#ffffff  White
```

## Fantasy RPG Palette (24 colors)

```
Skin Tones:
  #2a1a0a  Dark
  #5c3a21  Medium
  #8b6848  Light
  #d4a878  Pale
  
Metals:
  #3d3d3d  Iron dark
  #6b6b6b  Iron mid
  #a0a0a0  Iron light
  #c4a000  Gold dark
  #ffd700  Gold light
  
Nature:
  #1a2e1a  Forest
  #2d5a2d  Tree
  #4a8b4a  Leaf
  #8bc34a  Grass
  
Magic:
  #4a1a6b  Purple dark
  #7b3daa  Purple mid
  #1a4a6b  Blue dark
  #3d8bbb  Blue light
```

## Terrain Tile Palette

Optimized for seamless tiling:

```
Grass:
  base:      #4a7a4a
  shadow:    #3d6b3d
  highlight: #5c8b5c
  detail:    #3d5c3d

Dirt:
  base:      #6b5a4a
  shadow:    #5c4a3d
  highlight: #7b6b5a
  detail:    #4a3d2d

Water:
  deep:      #2a4a6b
  mid:       #3d6b8b
  shallow:   #5c8baa
  foam:      #9bc4d4

Sand:
  base:      #c4a878
  shadow:    #a08858
  highlight: #d4b888
  detail:    #8b7848

Stone:
  dark:      #4a4a5c
  mid:       #6b6b7b
  light:     #8b8b9b
  moss:      #5c6b5c
```

## Usage Tips

1. **Start with base colors** - Fill large areas first
2. **Add shadows** - Usually 1-2 shades darker, placed on lower/right edges
3. **Add highlights** - 1 shade lighter, placed on upper/left edges  
4. **Details last** - Outlines, specks, texture dots

## Palette Ramps

A "ramp" is a gradient from dark to light of one hue:

```
Blue Ramp (5 steps):
#0a1628 → #1a3d5c → #3d6b8b → #5c9bbb → #9bcde8

Green Ramp (5 steps):  
#0a1a0a → #1e3d1a → #3d6b3d → #5c9b5c → #9bce9b

Brown Ramp (5 steps):
#1a0a00 → #3d2817 → #5c4a3d → #8b7b6b → #bba898
```

## Transparency

- Use `transparent` or `none` in SVG
- Use alpha channel in PNG
- Consider a distinct "transparent marker" color like `#ff00ff` (magenta) for tools that don't support alpha
