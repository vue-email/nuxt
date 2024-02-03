<script lang="ts" setup>
import { camelCase } from 'scule'
import JsonEditorVue from 'json-editor-vue'
import { copyTextToClipboard } from '@/util/copy-text-to-clipboard'
import 'vanilla-jsoneditor/themes/jse-theme-dark.css'

defineEmits(['setlang'])

const toast = useToast()
const { editorCode } = useTool()
const { template, email, renderEmail } = useEmail()

const emailProps = ref(email.value.props)

function handleDownload(lang: 'html' | 'txt' | 'vue') {
  const content = template.value[lang]
  const file = new File([content], `${camelCase(email.value.label)}.${lang}`)
  const url = URL.createObjectURL(file)

  const a = document.createElement('a')

  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  toast.add({
    title: 'Downloaded',
    description: 'Check your downloads folder.',
    icon: 'i-ph-download-simple-bold',
  })
}

async function handleClipboard(lang: 'html' | 'txt' | 'vue') {
  await copyTextToClipboard(template.value[lang])
  toast.add({
    title: 'Copied to clipboard',
    description: 'You can now paste it anywhere you want.',
    icon: 'i-ph-copy-bold',
  })
}

const items = computed(() => {
  let arr = []

  if (editorCode.value.id === 'all') {
    arr = [
      {
        key: 'vue',
        label: 'Vue',
        icon: 'i-ph-file-vue-duotone',
        code: template.value.vue,
      },
      {
        key: 'html',
        label: 'HTML',
        icon: 'i-ph-file-html-duotone',
        code: template.value.html,
      },
      {
        key: 'txt',
        label: 'Plain Text',
        icon: 'i-ph-text-t-duotone',
        code: template.value.txt,
      },
    ]
  }
  else if (editorCode.value.id === 'html') {
    arr.push({
      key: 'html',
      label: 'HTML',
      icon: 'i-ph-file-html-duotone',
      code: template.value.html,
    })
  }
  else if (editorCode.value.id === 'txt') {
    arr.push({
      key: 'txt',
      label: 'Plain Text',
      icon: 'i-ph-text-t-duotone',
      code: template.value.txt,
    })
  }
  else if (editorCode.value.id === 'vue') {
    arr.push({
      key: 'vue',
      label: 'Vue',
      icon: 'i-ph-file-vue-duotone',
      code: template.value.vue,
    })
  }

  if (emailProps.value.length) {
    arr.push({
      key: 'props',
      label: 'Props',
      icon: 'i-ph-code-duotone',
    } as any)
  }

  return arr
})

const tab = ref(0)

watchEffect(() => {
  emailProps.value = email.value.props
})
</script>

<template>
  <UTabs
    v-model="tab" :items="items" :ui="{
      wrapper: 'relative space-y-0',
    }"
  >
    <template #default="{ item, selected }">
      <div class="flex items-center gap-2 relative truncate">
        <UIcon :name="item.icon" class="w-7 h-7 flex-shrink-0" />

        <span class="truncate">{{ item.label }}</span>
        <template v-if="selected && item.code">
          <UTooltip text="Copy to clipboard">
            <UButton class="ml-6" icon="i-ph-copy-duotone" size="xs" square color="gray" variant="solid" @click="handleClipboard(item.key)" />
          </UTooltip>
          <UTooltip :text="`Download .${item.key} file`">
            <UButton icon="i-ph-download-simple-duotone" size="xs" square color="gray" variant="solid" @click="handleDownload(item.key)" />
          </UTooltip>
        </template>

        <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
      </div>
    </template>

    <template #item="{ item }">
      <div v-if="item.code" class="w-full h-full" v-html="highlight(item.code, item.key)" />
      <div v-else-if="item.key === 'props' && email.props && email.props.length" class="w-full h-full">
        <UContainer class="py-5 flex flex-col gap-y-4">
          <template v-for="prop in email.props" :key="prop.label">
            <UFormGroup v-if="prop.type === 'string'" size="lg" :label="prop.label" :description="prop.description">
              <UInput v-model="prop.value" type="text" />
            </UFormGroup>
            <UFormGroup v-if="prop.type === 'number'" size="lg" :label="prop.label" :description="prop.description">
              <UInput v-model.number="prop.value" type="number" />
            </UFormGroup>
            <UFormGroup v-if="prop.type === 'date'" size="lg" :label="prop.label" :description="prop.description">
              <UInput v-model="prop.value" type="datetime-local" :value="prop.value" />
            </UFormGroup>
            <UFormGroup v-if="prop.type === 'boolean'" size="lg" :label="prop.label" :description="prop.description">
              <UToggle v-model="prop.value" />
            </UFormGroup>
            <UFormGroup v-if="prop.type === 'object'" size="lg" :label="prop.label" :description="prop.description">
              <JsonEditorVue
                v-model="prop.value"
                :class="[$colorMode.value === 'dark' ? 'jse-theme-dark' : 'light']"
                class="json-editor-vue of-auto text-sm outline-none"
                mode="tree" :navigation-bar="false" :indentation="2" :tab-size="2"
              />
            </UFormGroup>
            <UFormGroup v-if="prop.type === 'array'" size="lg" :label="prop.label" :description="prop.description">
              <JsonEditorVue
                v-model="prop.value"
                :class="[$colorMode.value === 'dark' ? 'jse-theme-dark' : 'light']"
                class="json-editor-vue of-auto text-sm outline-none"
                mode="tree" :navigation-bar="false" :indentation="2" :tab-size="2"
              />
            </UFormGroup>
          </template>
          <UButton size="lg" icon="i-ph-floppy-disk" block label="Update Props" @click="renderEmail(emailProps)" />
        </UContainer>
      </div>
    </template>
  </UTabs>
</template>

<style>
/* TODO: fix content height issues */
.shiki {
  width: 100%;
  height: 90vh;
  padding-bottom: 100px;
  padding-inline: 20px;
  font-size: 16px;
  outline: none;
  border: none;
  overflow: auto;
  white-space: break-spaces;
}

.dark,
.jse-theme-dark {
  --jse-panel-background: #111 !important;
  --jse-theme-color: #111 !important;
  --jse-text-color-inverse: #fff !important;
  --jse-main-border: none !important;
}

.json-editor-vue .no-main-menu {
  border: none !important;
}

.json-editor-vue .jse-main {
  min-height: 1em !important;
}

.json-editor-vue .jse-contents {
  border-width: 0 !important;
  border-radius: 5px !important;
}
</style>
