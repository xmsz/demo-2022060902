import Unocss from 'unocss/vite';

export default {
  vite: true,
  vitePlugins: [Unocss({})],
  plugins: [
    [
      'build-plugin-ignore-style',
      {
        libraryName: '@alifd/next',
      },
    ],
  ],
};
