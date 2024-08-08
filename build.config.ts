import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  externals: ["vue", "immer"],

  rollup: {
    esbuild: {
      minify: true,
      minifyWhitespace: true,
    },
  },
});
