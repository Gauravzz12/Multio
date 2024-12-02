// vite.config.js
import { defineConfig } from "file:///C:/WEBDEV/Multio/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/WEBDEV/Multio/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import imagemin from "file:///C:/WEBDEV/Multio/client/node_modules/vite-plugin-imagemin/dist/index.mjs";
import viteCompression from "file:///C:/WEBDEV/Multio/client/node_modules/vite-plugin-compression/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    viteCompression(),
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 65 },
      pngquant: { quality: [0.65, 0.9], speed: 4 },
      webp: { quality: 75 }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1e3,
    // Increase chunk size limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          "react-vendor": ["react", "react-dom"],
          router: ["react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxXRUJERVZcXFxcTXVsdGlvXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcV0VCREVWXFxcXE11bHRpb1xcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1dFQkRFVi9NdWx0aW8vY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBpbWFnZW1pbiBmcm9tIFwidml0ZS1wbHVnaW4taW1hZ2VtaW5cIjtcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB2aXRlQ29tcHJlc3Npb24oKSxcbiAgICBpbWFnZW1pbih7XG4gICAgICBnaWZzaWNsZTogeyBvcHRpbWl6YXRpb25MZXZlbDogNyB9LFxuICAgICAgbW96anBlZzogeyBxdWFsaXR5OiA2NSB9LFxuICAgICAgcG5ncXVhbnQ6IHsgcXVhbGl0eTogWzAuNjUsIDAuOV0sIHNwZWVkOiA0IH0sXG4gICAgICB3ZWJwOiB7IHF1YWxpdHk6IDc1IH0sXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLCAvLyBJbmNyZWFzZSBjaHVuayBzaXplIGxpbWl0XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIC8vIFNwbGl0IHZlbmRvciBjaHVua3NcbiAgICAgICAgICBcInJlYWN0LXZlbmRvclwiOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcbiAgICAgICAgICByb3V0ZXI6IFtcInJlYWN0LXJvdXRlci1kb21cIl0sXG4gICAgICAgICAgcmVkdXg6IFtcIkByZWR1eGpzL3Rvb2xraXRcIiwgXCJyZWFjdC1yZWR1eFwiXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUCxTQUFTLG9CQUFvQjtBQUM1UixPQUFPLFdBQVc7QUFDbEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8scUJBQXFCO0FBRzVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGdCQUFnQjtBQUFBLElBQ2hCLFNBQVM7QUFBQSxNQUNQLFVBQVUsRUFBRSxtQkFBbUIsRUFBRTtBQUFBLE1BQ2pDLFNBQVMsRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUN2QixVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzNDLE1BQU0sRUFBRSxTQUFTLEdBQUc7QUFBQSxJQUN0QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsdUJBQXVCO0FBQUE7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUE7QUFBQSxVQUVaLGdCQUFnQixDQUFDLFNBQVMsV0FBVztBQUFBLFVBQ3JDLFFBQVEsQ0FBQyxrQkFBa0I7QUFBQSxVQUMzQixPQUFPLENBQUMsb0JBQW9CLGFBQWE7QUFBQSxRQUMzQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
