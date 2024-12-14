import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import path from "path";

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias @ to the src folder
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
