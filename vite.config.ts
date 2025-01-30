// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import reactNativeWeb from "vite-plugin-react-native-web";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(), reactNativeWeb()],
//   resolve: {
//     alias: {
//       "react-native": "react-native-web",
//     },
//   },
// });

import tailwindcss from "@tailwindcss/vite";
import reactNativeWeb from "vite-plugin-react-native-web";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { esbuildFlowPlugin } from "@bunchtogether/vite-plugin-flow";

// https://tamagui.dev/docs/intro/installation
const extensions = [
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
  ".mjs",
];

const development = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: true,
  plugins: [react(), tailwindcss(), reactNativeWeb()],
  define: {
    // https://github.com/bevacqua/dragula/issues/602#issuecomment-1296313369
    global: "window",
    __DEV__: JSON.stringify(development),
    // https://tamagui.dev/docs/intro/installation
    DEV: JSON.stringify(development),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    extensions: extensions,
    alias: {
      "react-native": "react-native-web",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      // https://github.com/vitejs/vite-plugin-react/issues/192#issuecomment-1627384670
      jsx: "automatic",
      // need either this or the plugin below
      loader: { ".js": "jsx" },
      // plugins: [
      //   esbuildFlowPlugin(/\.(flow|jsx?)$/, (path) =>
      //     /\.jsx$/.test(path) ? "jsx" : "jsx"
      //   ),
      // ],
    },
  },
});


