import { destr } from 'destr'
import { useCompiler } from '#vue-email'
import { createError, defineEventHandler, readBody } from '#imports'

export default defineEventHandler(async (event: any) => {
  try {
    const file = event.context.params && event.context.params.file ? event.context.params.file : null
    const body = await readBody(event)

    let props: any = null
    if (body && body.props) {
      props = body.props.reduce((acc: Record<string, any>, prop: any) => {
        if (prop.type === 'string')
          acc[prop.label] = destr(prop.value) || ''

        if (prop.type === 'number')
          acc[prop.label] = destr(prop.value) || 0

        if (prop.type === 'boolean')
          acc[prop.label] = destr(prop.value) || false

        if (prop.type === 'object')
          acc[prop.label] = destr(prop.value) || {}

        if (prop.type === 'array')
          acc[prop.label] = destr(prop.value) || []

        if (prop.type === 'date')
          acc[prop.label] = new Date(prop.value) || new Date()

        return acc
      }, {})
    }

    // TODO: pass props to template
    const template = await useCompiler(file, {
      props,
    })

    if (!template) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    }

    return template
  }
  catch (error) {
    console.error(error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
