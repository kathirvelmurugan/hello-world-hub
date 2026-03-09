import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// @base44/vite-plugin is optional and only used in specific environments
const base44Plugin = await (async () => {
  try {
    const mod = await Function('return import("@base44/vite-plugin")')();
    return (mod.default || mod)({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true'
    });
  } catch {
    return null;
  }
})();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    base44Plugin,
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
