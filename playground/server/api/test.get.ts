import { useCompiler } from '#vue-email'

export default defineEventHandler(async () => {
  try {
    const template = await useCompiler('github-access-token.vue', {
      props: {
        username: 'Flowko',
      },
    }).catch((error) => {
      console.error(error);
    })

    return template
  } catch (error) {
    console.error(error);

  }
})
