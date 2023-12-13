export default defineNuxtConfig({
  modules: ['../src/module'],
  vueEmail: {
    baseUrl: 'https://vue-email-demo.vercel.app/',
    playground: false,
  },
  devtools: { enabled: true },
})
