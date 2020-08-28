# hidden-mapbox

A utility wrapper for mapbox-gl to do operations while hidden.

## Install

```sh
npm install hidden-mapbox
```

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

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License

MIT
