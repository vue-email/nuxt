import { useRender } from 'vue-email-edge'
import { defineAsyncComponent } from 'vue'
import Email from '@/components/Tailwind.vue'

export default defineEventHandler(async (event) => {
  try {
    const template = await useRender(Email, {
      // userFirstName: 'John',
      // loginDevice: 'Chrome on Mac OS X',
      // loginLocation: 'Upland, California, United States',
      // loginIp: '47.149.53.167',
      // loginDate: new Date('September 7, 2022, 10:58 am'),
      invitedByEmail: 'anpch@example.com',
      inviteLink: 'https://vercel.com/teams/invite/foo',
      inviteFromIp: '172.0.0.1',
      inviteFromLocation: 'San Francisco, CA',
      invitedByUsername: 'bukinoshita',
      teamName: 'My project',
      username: 'John Doe',
    }).catch((error) => {
      console.error(error)
    })

    if (!template)
      return null

    return template.html
  }
  catch (error) {
    console.error(error)
  }

  // const body = await readBody(event)

  // const { filename } = body

  // if (!filename) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'Filename is required',
  //   })
  // }

  // const component = await defineAsyncComponent(() => import(`../../components/${filename}.vue`))

  // const template = await useRender(component)

  // return { html: template.html }
})
