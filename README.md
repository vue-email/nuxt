[![vue-email](https://github.com/vue-email/vue-email/blob/main/public/repo-banner.png?raw=true)](https://vuemail.net)


<div align="center">

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

</div>

# @vue-email/nuxt

Official Nuxt module for Vue Email. Build email templates with Vue components.

- [✨ &nbsp;Release Notes](https://github.com/vue-email/nuxt/releases)
- [📖 &nbsp;Documentation](https://vuemail.net/ssr/nuxt)

## Features

- Auto-import Vue Email components and composables
- `useCompiler` utility to render emails on the server
- All the DX Magic that comes with Nuxt ✨
- Vue Email DevTools integration

## Ecosystem

| Package                     | Version                                                                                            |
| --------------------------- | :------------------------------------------------------------------------------------------------- |
| [Vue-Email](https://github.com/vue-email/vue-email)       | ![tres version](https://img.shields.io/npm/v/vue-email/latest.svg?label=%20&colorB=1fa669) |
| [Nuxt](https://github.com/vue-email/nuxt) | ![nuxt version](https://img.shields.io/npm/v/@vue-email/nuxt/latest.svg?label=%20&color=4f4f4f&logo=nuxt.js) |
[SSR Compiler](https://github.com/vue-email/compiler) | ![cientos version](https://img.shields.io/npm/v/@vue-email/compiler/latest.svg?label=%20&colorB=1fa669) |
| [CLI](https://github.com/vue-email/cli)       | ![tres version](https://img.shields.io/npm/v/@vue-email/cli/latest.svg?label=%20&colorB=1fa669) |

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
