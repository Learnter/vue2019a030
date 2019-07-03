// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  // "plugins": {
  //   "postcss-import": {},
  //   "postcss-url": {},
  //   // to edit target browsers: use "browserslist" field in package.json
  //   "autoprefixer": {}
  // }

    "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      "postcss-aspect-ratio-mini": {}, 
      "postcss-write-svg": {
          utf8: false
      },
      "postcss-cssnext": {},
      "postcss-px-to-viewport": {
          viewportWidth: 375,     // (Number) The width of the viewport.
          viewportHeight: 667,    // (Number) The height of the viewport.
          unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
          viewportUnit: 'vw',     // (String) Expected units.
          selectorBlackList: ['.ignore', '.hairlines','.vjs-loading-spinner:before',
            '.vjs-loading-spinner:after','.van-loading__spinner--spinner i::before',
          '.van-cell:not(:last-child)::after','.van-cell--required::before','.van-tabbar-item__icon--dot::after',
          '.van-action-sheet__cancel::before','.van-dropdown-menu__title::after','van-contact-card::before','.van-step--vertical:first-child::before'],  // (Array) The selectors to ignore and leave as px.
          minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
          mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
      }, 
      "postcss-viewport-units":{},
      // "cssnano": {
      //     preset: "advanced",
      //     autoprefixer: false,
      //     "postcss-zindex": false
      // }
      "cssnano": {
        "cssnano-preset-advanced": {
          zindex: false,
          autoprefixer: false
        }
     }
  }
}
