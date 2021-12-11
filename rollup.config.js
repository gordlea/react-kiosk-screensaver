import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import linaria from '@linaria/rollup';
import css from 'rollup-plugin-css-only';
import pkgJson from './package.json'

const config = {
  input: 'src/index.js',
  output: [
    {
      dir: './dist',
      format: 'cjs',
      entryFileNames: '[name].js',
      sourcemap: true,
      exports: 'auto',
    },
    {
      dir: './dist',
      format: 'esm',
      entryFileNames: '[name].es.js',
      sourcemap: true
    }
  ],
  external: [
    /@compiled\/react/,
    ...Object.keys(pkgJson.dependencies),
  ],
  plugins: [
    linaria({
      sourceMap: process.env.NODE_ENV !== 'production',
    }),
    css({
      output: 'styles.css',
    }),
    babel({
      babelHelpers: 'runtime',
      inputSourceMap: true,
      only: ['./src'],
      rootMode: 'root'
    }),
    commonjs(),
    resolve({
      preferBuiltins: false
    }),

  ]
}

export default config
