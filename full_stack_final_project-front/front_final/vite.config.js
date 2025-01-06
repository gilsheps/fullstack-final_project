import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';

dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __BASE_SERVER_CINEMA_URL__: JSON.stringify(process.env.BASE_SERVER_CINEMA_URL)
  }
});
