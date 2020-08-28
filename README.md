# hidden-mapbox

A utility wrapper for mapbox-gl to do operations while hidden.

## Usage

```js
const HiddenMapbox = require('hidden-mapbox')

const hmap = new HiddenMapbox({
  accessToken, style
})

const image = await hmap.getMapImage({
  width, height, center, zoom, pixelRatio
})
```

## License

MIT
