import { useCompiler } from "#vue-email";

export default defineEventHandler(async () => {
  try {
    const template = await useCompiler("TestEmail.vue", {
      props: {
        username: "Flowko",
      },
    }).catch((error) => {
      console.error(error);
    });

    if (!template) return null;

    return template.html;
  } catch (error) {
    console.error(error);
  }
});
