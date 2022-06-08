import Unocss from 'unocss/vite';

export default {
  vite: true,
  vitePlugins: [Unocss({})],
  proxy: {
    '/api': {
      enable: true,
      target: 'http://127.0.0.1:7001',
    },
  },
  plugins: [
    [
      'build-plugin-ignore-style',
      {
        libraryName: '@alifd/next',
      },
    ],
  ],
};
