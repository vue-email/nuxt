import pretty from 'pretty'
import type { Result } from '@vue-email/compiler'
import { upperFirst } from 'scule'
import type { Email, Template } from '@/types/email'

function removeQuotes(inputString: any) {
  // Check if the input is a string and has at least two characters
  if (typeof inputString === 'string' && inputString.length >= 2) {
    // Check if the string starts and ends with double quotes
    if (inputString[0] === '"' && inputString[inputString.length - 1] === '"') {
      // Remove the quotes and return the modified string
      return inputString.slice(1, -1)
    }
    else {
      // If the string doesn't have quotes at the start and end, return the original string
      return inputString
    }
  }
  else {
    // If the input is not a valid string, return an empty string or handle it accordingly
    return ''
  }
}

export function useEmail() {
  const emails = useState<Email[]>('emails')
  const email = useState<Email>('email')
  const sending = useState<boolean>('sending', () => false)
  const refresh = useState<boolean>('refresh', () => false)
  const template = useState<Template>('template')
  const props = useState<{
    label: string
    value: any
    type: string
    description?: string
  }[]>('props')

  const { host } = useWindow()

  const getEmails = async () => {
    const { data, error } = await useFetch<Email[]>('/api/emails', {
      baseURL: host.value,
    })

    if (error && error.value) {
      console.error(error)
      return
    }

    if (data && data.value)
      emails.value = data.value
  }

  const renderEmail = async () => {
    if (!email.value)
      return null

    const { data } = await useFetch<Result>(`/api/render/${email.value.filename}`, {
      method: 'POST',
      baseURL: host.value,
      body: {
        props: props.value,
      },
    })

    if (data.value) {
      template.value = {
        vue: email.value.content,
        html: pretty(data.value.html),
        txt: data.value.text,
      } as Template
    }
  }

  const getEmail = async (filename: string) => {
    if (filename && emails.value && emails.value.length) {
      const found = emails.value.find(email => email.filename === filename)

      if (found) {
        email.value = found
        try {
          if (found.props) {
            props.value = found.props.map((prop) => {
              const value = removeQuotes(prop.default) || ''
              const destructuredType = prop.type.split('|').map((type) => {
                if (type === 'string')
                  return 'string'

                if (type === 'number')
                  return 'number'

                if (type === 'boolean')
                  return 'boolean'

                if (type === 'object')
                  return 'object'

                return 'string'
              })

              return {
                label: upperFirst(prop.name),
                type: destructuredType[0],
                value,
              }
            })
          }
        }
        catch (error) {
          console.error(error)
        }

        await renderEmail()
      }
    }
  }

  const sendTestEmail = async (to: string, subject: string, markup: string) => {
    try {
      if (!email || !subject)
        return

      sending.value = true

      const response = await fetch('https://react.email/api/send/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          subject,
          html: markup,
        }),
      })

      if (response.status === 429) {
        const { error } = await response.json()

        useToast().add({
          title: 'Too many requests',
          description: error,
          color: 'red',
          icon: 'i-ph-bell-bold',
        })
      }

      if (response.status === 200) {
        useToast().add({
          title: 'Success',
          description: 'Email sent successfully.',
          color: 'green',
          icon: 'i-ph-bell-bold',
        })
      }
    }
    catch (error) {
      useToast().add({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        color: 'red',
        icon: 'i-ph-bell-bold',
      })
    }
    finally {
      sending.value = false
    }
  }

  return {
    email,
    emails,
    sending,
    refresh,
    template,
    props,
    getEmail,
    sendTestEmail,
    renderEmail,
    getEmails,
  }
}
