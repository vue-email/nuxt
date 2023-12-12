import { VueEmailPlugin } from 'vue-email'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import type { ModuleOptions } from '../module'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const options = config.public.vueEmail as ModuleOptions

  nuxtApp.vueApp.use(VueEmailPlugin, options)
})
