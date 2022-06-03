import Unocss from 'unocss/vite';

export default {
  vite: true,
  vitePlugins: [Unocss({})],
  outputDir: 'dist',
  plugins: [
    [
      'build-plugin-ignore-style',
      {
        libraryName: '@alifd/next',
      },
    ],
  ],
};
