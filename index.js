var mapboxgl = require('mapbox-gl')
const originalPixelRatio = window.devicePixelRatio

class Map {
  constructor (props) {
    if (!props) props = {}
    this.mapDiv = this._createMapDiv()
    if (props.accessToken) mapboxgl.accessToken = props.accessToken
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      preserveDrawingBuffer: true,
      style: props.style
    })
  }

  /**
   * Returns a hidden div element for the map
   * @returns {HTMLElement}
   */
  _createMapDiv () {
    const mapDiv = document.createElement('div')
    document.body.appendChild(mapDiv)
    mapDiv.style.visibility = 'hidden'
    mapDiv.style.position = 'absolute'
    mapDiv.style.width = '500px'
    mapDiv.style.height = '500px'
    return mapDiv
  }

  setStyle (style) {
    this.map.setStyle(style)
  }

  /**
   * @param {import('./types').MapOptions} mapOptions
   * @returns {Promise<Blob?>}
   */
  async getMapImage ({
    accessToken,
    width,
    height,
    style,
    center,
    zoom,
    pixelRatio
  }) {
    return new Promise((resolve, reject) => {
      if (accessToken) mapboxgl.accessToken = accessToken
      this.map.once('error', reject)
      this.map.once('idle', () => {
        // @ts-ignore
        window.devicePixelRatio = originalPixelRatio
        this.map.getCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
      if (style) this.setStyle(style)
      this.mapDiv.style.width = width + 'px'
      this.mapDiv.style.height = height + 'px'
      // @ts-ignore This is actually writable in Chrome, and can be used to
      // trick Mapbox into rendering higher-res
      window.devicePixelRatio = pixelRatio
      this.map.resize()
      this.map.jumpTo({ center, zoom })
    })
  }
}

module.exports = Map
