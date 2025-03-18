import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 80,
		proxy: {
			'/graphql': {
				target: 'http://localhost:3001',
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			services: path.resolve(__dirname, './src/services'),
			store: path.resolve(__dirname, './src/store'),
		},
	},
	define: {
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			VITE_GRAPHQL_URL: JSON.stringify('http://localhost:3001/graphql'),
		},
	},
})
