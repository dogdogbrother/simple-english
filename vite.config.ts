import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: "less",
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#285CBE",
          "@border-radius-base": "5px",
          "@error-color": "#DD4964"
        },
      }
    },
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${path.resolve(__dirname, "./src")}/` },
    ],
  },
  server: {
    proxy: {
      "/api": {
        // target: 'http://127.0.0.1:7001',
        target: 'http://49.233.185.168:7001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
  },
})


// import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// export default defineConfig({
//   plugins: [
//     Components({
//       resolvers: [
//         AntDesignVueResolver({
//           importStyle: "less",
//         }),
//       ],
//     }),
//   ],
//   css: {
//     preprocessorOptions: {
//       less: {
//         javascriptEnabled: true,
//       },
//     },
//   },
// });