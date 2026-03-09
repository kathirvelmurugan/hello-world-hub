import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

let base44Plugin: any = null;
try {
  const base44 = await import("@base44/vite-plugin");
  base44Plugin = (base44.default || base44)({
    legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true'
  });
} catch {
  // @base44/vite-plugin not available, skipping
}

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
