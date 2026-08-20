# design

## PNG to ICO

To generate `.ico` file...

```
sudo apt install -y imagemagick
convert image.png -define icon:auto-resize:64,48,32,16 image.ico
```

## SVG to React Component

```
npx @svgr/cli --typescript -- emma-logo-square.svg > EmmaLogoSquare.tsx
npx @svgr/cli --typescript -- emma-logo-wide.svg > EmmaLogoWide.tsx
```
