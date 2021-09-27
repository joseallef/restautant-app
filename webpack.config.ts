/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
  plugins: [
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: [
          // sync
          () => {
            console.log('run tTimeout 1');
            setTimeout(() => console.log('end Timeout 1'), 1000);
          },
          // async
          () => new Promise((resolve, reject) => {
            console.log('run async tTimeout');
            setTimeout(() => {
              console.log('end async tTimeout');
              resolve('ok');
            }, 1000);
          }),
        ],
        blocking: true,
        parallel: false,
      },
      onBuildEnd: {
        scripts: ['echo "Webpack End"'],
        blocking: false,
        parallel: true,
      },
    }),
  ],
};
