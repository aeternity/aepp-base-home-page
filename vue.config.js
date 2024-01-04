const path = require('path');
const addClassesToSVGElement = require('svgo/plugins/addClassesToSVGElement').fn;

module.exports = {
  configureWebpack: {
    module: {
      rules: [{
        test: /\.(svg)(\?.*)?$/,
        type: 'javascript/auto',
        oneOf: [{
          resourceQuery: /icon-component/,
          use: [{
            loader: 'vue-loader',
          }, {
            loader: path.resolve('node_modules/aepp-base/config/webpack/vue-svg-loader.js'),
          }, {
            loader: 'svgo-loader',
            options: {
              plugins: [
                'preset-default',
                { name: 'addClassesToSVGElement', params: { className: ['icon'] } },
                {
                  name: 'addFilenameToClasses',
                  type: 'visitor',
                  fn(root, params, extra) {
                    const className = path.basename(extra.path, '.svg');
                    return addClassesToSVGElement(root, { className });
                  },
                },
              ],
            },
          }],
        }, {
          use: [{
            loader: 'svg-url-loader',
            options: {
              noquotes: true,
              limit: 4096,
              name: 'img/[name].[hash:8].[ext]',
              esModule: false,
            },
          }, {
            loader: 'svgo-loader',
          }],
        }],
      }],
    },
  },
  chainWebpack(config) {
    config.module.rules.delete('svg');
  },
};
