import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  // This is needed to make `util` module work (which references process.env.NODE_DEBUG)
  // It's used by: lebab -> recast -> assert -> util
  // See: https://github.com/browserify/node-util/issues/43
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
});
