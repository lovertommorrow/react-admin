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
			"/dev-api": {
				target: "http://220.154.142.17:9090",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/dev-api/, ''),
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
})
