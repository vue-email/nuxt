export default defineNuxtConfig({
  modules: ['../src/module'],
  vueEmail: {
    baseUrl: 'https://vue-email-demo.vercel.app/',
    // autoImport: false,
  },
  devtools: { enabled: true },
})
