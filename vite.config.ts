import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'

const pathResolve = (dir: string) => {
	return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		WindiCSS()
	],
	server: {
		open: true,
		host: '0.0.0.0',
		port: 9527
	},
	resolve: {
		alias: [
			// /@/xxxx => src/xxxx
			{
				find: /\/@\//,
				replacement: pathResolve('src') + '/'
			},
			// /#/xxxx => types/xxxx
			{
				find: /\/#\//,
				replacement: pathResolve('types') + '/'
			}
		]
	}
})
