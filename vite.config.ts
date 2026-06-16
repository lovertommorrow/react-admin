import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 9090,
		host: true,
		proxy: {
			// "/api": {
			// 	target: "http://127.0.0.1:7000",
			// 	changeOrigin: true,
			// 	rewrite: path => isDev ? path.replace(/^\/api/, "") : path,
			// },
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
})
