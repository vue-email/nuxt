import {
  addComponent,
  addImportsSources,
  createResolver,
  defineNuxtModule,
  hasNuxtModule,
} from '@nuxt/kit'
import { defu } from 'defu'
import type {  VueEmailPluginOptions } from 'vue-email-edge'
import vue from '@vitejs/plugin-vue'


const components = [
  'EBody',
  'EButton',
  'ECodeBlock',
  'ECodeInline',
  'EColumn',
  'EContainer',
  'EFont',
  'EHead',
  'EStyle',
  'EHeading',
  'EHr',
  'EHtml',
  'EImg',
  'ELink',
  'EPreview',
  'ERow',
  'ESection',
  'EText',
  'ETailwind',
  'EMarkdown',
]

// Module options TypeScript interface definition
export interface ModuleOptions {
  baseUrl?: string | null
  autoImport?: boolean
  useNuxtTailwind?: boolean
  tailwind?: VueEmailPluginOptions['tailwind']
  emailsDir?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-email',
    configKey: 'vueEmail',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false,
    },
  },
  defaults: {
      baseUrl: null,
      autoImport: false,
      useNuxtTailwind: true,
      tailwind: undefined,
  },
  async setup(options, nuxt) {

    nuxt.hook('nitro:config', async (config) => {
      config.rollupConfig = config.rollupConfig || {}
      config.rollupConfig.plugins = config.rollupConfig.plugins || []
      // @ts-expect-error
      config.rollupConfig.plugins.push(vue())
    })

    nuxt.options.runtimeConfig.public.vueEmail = defu(
      nuxt.options.runtimeConfig.public.vueEmail,
      options,
    )


    // if (hasNuxtModule('@nuxtjs/tailwindcss') && options.useNuxtTailwind) {
    //   // @ts-expect-error runtime type
    //   nuxt.hook('tailwindcss:resolvedConfig', (resolvedConfig) => {
    //     options.tailwind = resolvedConfig
    //     nuxt.options.runtimeConfig.public.vueEmail = defu(
    //       nuxt.options.runtimeConfig.public.vueEmail,
    //       options,
    //     )
    //   })
    // }

    if (options.autoImport) {
      components.forEach((component) => {
        addComponent({
          name: component,
          export: component,
          filePath: 'vue-email-edge',
        })
      })

      addImportsSources({
        from: 'vue-email-edge',
        imports: ['useRender'],
      })
    }
  },
})
