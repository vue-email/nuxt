import { join } from 'node:path'
import { existsSync } from 'node:fs'
import {
  addComponent,
  addComponentsDir,
  addImportsSources,
  addServerHandler,
  addTemplate,
  createResolver,
  defineNuxtModule,
  hasNuxtModule,
} from '@nuxt/kit'
import { defu } from 'defu'
import sirv from 'sirv'
import type { I18n, VueEmailPluginOptions } from 'vue-email'

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
const PATH = '/__vue_email__'
const PATH_PLAYGROUND = `${PATH}/client`

// Module options TypeScript interface definition
export interface ModuleOptions {
  baseUrl?: string | null
  i18n?: I18n
  playground?: boolean
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
      nuxt: '>=3.0.0',
      bridge: false,
    },
  },
  defaults(nuxt) {
    const isDev = process.env.NODE_ENV === 'development' || nuxt.options.dev

    return {
      baseUrl: null,
      playground: isDev,
      autoImport: false,
      useNuxtTailwind: true,
      tailwind: undefined,
      emailsDir: '/emails',
    }
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const playgroundDir = resolve('../dist/client')

    nuxt.options.runtimeConfig.public.vueEmail = defu(
      nuxt.options.runtimeConfig.public.vueEmail,
      options,
    )

    let tempaltesDir = resolve(options.emailsDir) || resolve('/emails')

    for (const layer of nuxt.options._layers) {
      const templatePath = join(layer.cwd, '/emails')
      const pathFound = existsSync(templatePath)

      if (!pathFound)
        continue
      tempaltesDir = templatePath
      break
    }

    nuxt.options.runtimeConfig.public.vueEmail.emailsDir = tempaltesDir

    if (hasNuxtModule('@nuxtjs/tailwindcss') && options.useNuxtTailwind) {
      // @ts-expect-error runtime type
      nuxt.hook('tailwindcss:resolvedConfig', (resolvedConfig) => {
        options.tailwind = resolvedConfig
        nuxt.options.runtimeConfig.public.vueEmail = defu(
          nuxt.options.runtimeConfig.public.vueEmail,
          options,
        )
      })
    }

    nuxt.options.nitro.alias = nuxt.options.nitro.alias || {}
    nuxt.options.nitro.externals = defu(
      typeof nuxt.options.nitro.externals === 'object'
        ? nuxt.options.nitro.externals
        : {},
      {
        inline: [resolve('./runtime')],
      },
    )

    nuxt.options.nitro.alias = defu(nuxt.options.nitro.alias, {
      '#vue-email': resolve('./runtime/server/nitro'),
    })

    nuxt.options.nitro.serverAssets = nuxt.options.nitro.serverAssets || []
    nuxt.options.nitro.serverAssets.push({
      baseName: 'emails',
      dir: tempaltesDir,
    })

    if (options.playground) {
      addServerHandler({
        handler: resolve('./runtime/server/api/emails.get'),
        route: '/api/emails',
        method: 'get',
        lazy: true,
      })
      addServerHandler({
        handler: resolve('./runtime/server/api/render/[file].post'),
        route: '/api/render/:file',
        method: 'post',
        lazy: true,
      })

      nuxt.hook('vite:serverCreated', async (server) => {
        server.middlewares.use(
          PATH_PLAYGROUND,
          sirv(playgroundDir, { single: true, dev: true }),
        )
      })

      nuxt.hook('devtools:customTabs', (iframeTabs) => {
        iframeTabs.push({
          name: 'vueemail',
          title: 'Vue Email',
          icon: 'twemoji:incoming-envelope',
          view: {
            type: 'iframe',
            src: PATH_PLAYGROUND,
          },
        })
      })
    }

    addTemplate({
      filename: 'types/vue-email.d.ts',
      getContents: () =>
        [
          'declare module \'#vue-email\' {',
          `  const useCompiler: typeof import('${resolve(
            './runtime/server/nitro',
          )}').useCompiler`,
          '}',
        ].join('\n'),
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push({
        path: resolve(nuxt.options.buildDir, 'types/vue-email.d.ts'),
      })
    })

    if (options.autoImport) {
      components.forEach((component) => {
        addComponent({
          name: component,
          export: component,
          filePath: 'vue-email',
        })
      })

      addImportsSources({
        from: 'vue-email',
        imports: ['useRender'],
      })
    }

    await addComponentsDir({
      // TODO: add options to add a custom path and indicate if is absolute or relative
      // for example (absolute o relative):
      // path: options?.absolutePath ? resolve('emails') : tempaltesDir ,
      //
      // custom:
      // path: options?.emailsDir || tempaltesDir,
      path: tempaltesDir,
      extensions: ['vue'],
      global: true,
    })
  },
})
