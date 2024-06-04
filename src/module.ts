import {
  defineNuxtModule,
} from '@nuxt/kit'
import vue from '@vitejs/plugin-vue'

export default defineNuxtModule({
  meta: {
    name: 'vue-email',
    configKey: 'vueEmail',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false,
    },
  },
  async setup(options, nuxt) {
    nuxt.hook('nitro:config', async (config) => {
      config.rollupConfig = config.rollupConfig || {}
      config.rollupConfig.plugins = config.rollupConfig.plugins || []
      // @ts-expect-error
      config.rollupConfig.plugins.push(vue())
    })
  },
})
