const CracoAlias = require('craco-alias');

// webpack config
module.exports = {
  styles: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            [
              'postcss-px-to-viewport-with-include',
              {
                unitToConvert: 'px',
                viewportWidth: 390,
                viewportHeight: 844,
                unitPrecision: 6,
                propList: ['*'],
                viewportUnit: 'vw',
                fontViewportUnit: 'vw',
                selectorBlackList: ['ignore'],
                minPixelValue: 1,
                mediaQuery: true,
                replace: true,
                exclude: [/node_modules/],
                landscape: false,
              },
            ],
          ],
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        baseUrl: './src',
        source: 'jsconfig',
      },
    },
  ],
};
