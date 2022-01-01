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
      "/api/": {
        target: "暂时没有",
        ws: true,
        changeOrigin: true,
      },
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