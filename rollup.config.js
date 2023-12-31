import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import html from "@web/rollup-plugin-html";
import { terser } from "rollup-plugin-terser";

export default {
  input: "index.html",
  output: {
    entryFileNames: "[hash].js",
    chunkFileNames: "[hash].js",
    assetFileNames: "[hash][extname]",
    format: "es",
    dir: "dist",
  },
  preserveEntrySignatures: false,

  plugins: [
    /** Enable using HTML as rollup entrypoint */
    html({
      minify: false,
      publicPath: "how-to-build-we-applets",
    }),
    /** Resolve bare module imports */
    nodeResolve(),
    /** Minify JS */
    terser(),
    /** Compile JS to a lower language target */
    babel({
      babelHelpers: "bundled",
      presets: [
        [
          require.resolve("@babel/preset-env"),
          {
            targets: [
              "last 3 Chrome major versions",
              "last 3 Firefox major versions",
              "last 3 Edge major versions",
              "last 3 Safari major versions",
            ],
            modules: false,
            bugfixes: true,
          },
        ],
      ],
      plugins: [
      ],
    }),
  ],
};
