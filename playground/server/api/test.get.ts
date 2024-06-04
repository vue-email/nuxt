import { useRender } from 'vue-email-edge'
import Email from '@/components/Email.vue'


export default defineEventHandler(async () => {
  try {
    const template = await useRender(Email, {
      userFirstName: 'John',
      loginDevice: 'Chrome on Mac OS X',
      loginLocation: 'Upland, California, United States',
      loginIp: '47.149.53.167',
      loginDate: new Date('September 7, 2022, 10:58 am'),
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
})
