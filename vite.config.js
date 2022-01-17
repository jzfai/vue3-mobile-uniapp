import path, { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import viteSvgIcons from 'vite-plugin-svg-icons'
import vueJsx from '@vitejs/plugin-vue-jsx'
import setting from './src/settings'
export default ({ command, mode }) => {
  console.log('command', command)
  return {
    base: setting.viteBasePath,
    plugins: [
      uni(),
      vueJsx(),
      // #ifdef H5
      viteSvgIcons({
        // config svg dir that can config multi
        iconDirs: [path.resolve(process.cwd(), 'src/icons/common'), path.resolve(process.cwd(), 'src/icons/nav-bar')],
        // appoint svg icon using mode
        symbolId: 'icon-[dir]-[name]'
      })
      // #endif
    ],
    build: {
      //minify: 'terser',
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      //remote console.log in prod
      terserOptions: {
        //detail to look https://terser.org/docs/api-reference#compress-options
        compress: {
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true
        }
      },
      //build assets Separate
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import "@/common/variables.scss";`
        }
      }
    }
  }
}
