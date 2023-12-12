import type { RenderOptions } from '@vue-email/compiler'
import { templateRender } from '@vue-email/compiler'
import { useRuntimeConfig, useStorage } from '#imports'
import type { ModuleOptions } from '~/src/module'

const storageKey = 'assets:emails'

/**
 * Compile a email template
 * @param {string} filename
 * @param {object} options
 * @returns {string}
 *
 * @example
 * ```ts
 * useCompiler('template.vue', {
 *  props: {
 *    name: 'foo',
 *  },
 *  locale: 'en',
 *  translations: {},
 * })
 * ```
 */
export async function useCompiler(filename: string, data?: RenderOptions, verbose = false) {
  const vueEmailOptions = useRuntimeConfig().public.vueEmail as ModuleOptions
  const source = await useStorage(storageKey).getItem(filename)
  const keys = await useStorage(storageKey).getKeys()
  const components: {
    name: string
    source: string
  }[] = []
  for (const key of keys) {
    const value = await useStorage(storageKey).getItem(key)
    if (value && key.endsWith('.vue')) {
      components.push({
        name: key,
        source: value,
      })
    }
  }


  const template = await templateRender(filename, { source, components }, data, {
    verbose,
    options: {
      baseUrl: vueEmailOptions?.baseUrl,
      i18n: vueEmailOptions?.i18n,
    },
  })

  return template
}
