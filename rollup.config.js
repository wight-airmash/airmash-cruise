import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const isProduction = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/js/chrome.js',
    output: {
      file: 'dist/chrome/js/app.js',
      format: 'iife',
      strict: false,
    },
    plugins: [
      copy({
        'src/icons': 'dist/chrome/icons',
        'src/static/manifest.json': 'dist/chrome/manifest.json',
        'src/js/helpers/inject.js': 'dist/chrome/js/inject.js',
      }),
      cleanup(),
    ],
  },
  {
    input: 'src/js/starmash.js',
    output: {
      file: 'dist/starmash/cruise.js',
      format: 'iife',
      banner: '!',
      strict: false,
    },
    plugins: [
      cleanup(),
      filesize(),
      isProduction &&
        terser({
          sourcemap: false,
        }),
    ],
  },
];
