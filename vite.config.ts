import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { transformWithEsbuild } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Transform .js files that contain JSX (e.g. react-csv ships raw JSX source)
    {
      name: "transform-node-modules-jsx",
      async transform(code, id) {
        if (
          !id.includes("node_modules/react-csv") &&
          !id.includes("node_modules/react-mapbox-gl")
        ) {
          return null;
        }
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
    react(),
    svgr(),
  ],
  // Make Vite understand ?raw imports for SVG strings (built-in, no extra config needed)
  // Ensure process.env.NODE_ENV is replaced in dependencies that check it
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV ?? "development",
    ),
  },
  resolve: {
    alias: {
      "react-mapbox-gl": "react-mapbox-gl/lib/index.js",
    },
  },
  optimizeDeps: {
    include: ["react-csv"],
    exclude: ["react-mapbox-gl", "mapbox-gl"],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
