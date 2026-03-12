import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// @ts-ignore
import base44 from "@base44/vite-plugin";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Expose env variables to the plugin if it relies on process.env
  process.env.VITE_BASE44_APP_ID = env.VITE_BASE44_APP_ID;
  process.env.VITE_BASE44_BACKEND_URL = env.VITE_BASE44_BACKEND_URL;

  return {

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    base44({
      legacySDKImports: true
    }),
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
