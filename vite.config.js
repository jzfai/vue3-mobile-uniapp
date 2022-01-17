import path, { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import viteSvgIcons from 'vite-plugin-svg-icons'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default ({ command, mode }) => {
  console.log('command', command)
  return {
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
