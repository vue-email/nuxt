import type { RenderOptions } from '@vue-email/compiler'
import { templateRender } from '@vue-email/compiler'
import type { ModuleOptions } from '../../../module'
import { useRuntimeConfig, useStorage } from '#imports'

const storageKey = 'assets:emails'

export async function useCompiler(
  filename: string,
  data?: RenderOptions,
  verbose = false,
) {
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
        source: value as string,
      })
    }
  }

  if (!source)
    throw new Error(`Template ${filename} not found`)

  const template = await templateRender(
    filename,
    { source: source as string, components },
    data,
    {
      verbose,
      options: {
        baseUrl: vueEmailOptions?.baseUrl,
        i18n: vueEmailOptions?.i18n,
        tailwind: vueEmailOptions?.tailwind,
      },
    },
  )

  return template
}
