<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: @vue-email/nuxt
- Description: My new Nuxt module
-->

# Vue Email Nuxt Module


[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Vue Email Nuxt Module.

## Documentation

Visit https://www.vuemail.net/ssr/nuxt to explore the documentation.


## Quick Setup

1. Add `@vue-email/nuxt` dependency to your project

```bash
# Using pnpm
pnpm add -D @vue-email/nuxt

# Using yarn
yarn add --dev @vue-email/nuxt

# Using npm
npm install --save-dev @vue-email/nuxt
```

2. Add `@vue-email/nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@vue-email/nuxt'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [Vue Email](https://vuemail.net/)


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@vue-email/nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@vue-email/nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/@vue-email/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@vue-email/nuxt

[license-src]: https://img.shields.io/npm/l/@vue-email/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@vue-email/nuxt

[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@vue-email/nuxt
