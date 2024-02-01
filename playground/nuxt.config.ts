export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  extends: ['./nuxt-layer'],
  vueEmail: {
    baseUrl: 'https://vue-email-demo.vercel.app/',
    i18n: {
      defaultLocale: 'fr',
      translations: {
        en: {
          title: 'Welcome to Vue Email',
          subtitle:
            'A Vue.js component for generating beautiful emails using MJML',
          button: 'Get Started',
        },
        fr: {
          title: 'Bienvenue sur Vue Email',
          subtitle:
            'Un composant Vue.js pour générer de beaux emails en utilisant MJML',
          button: 'Commencer',
        },
      },
    },
    autoImport: false,
    // tailwind: {
    //   theme: {
    //     extend: {
    //       colors: {
    //         primary: "#ea580c",
    //         secondary: "#ca8a04",
    //       },
    //     },
    //   },
    // },
  },
  devtools: { enabled: true },
})
