<script setup>
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const box = {
  padding: '0 48px',
}


const code = `import { codeToThemedTokens } from 'shikiji'

const tokens = await codeToThemedTokens('<div class="foo">bar</div>', {
  lang: 'html',
  theme: 'min-dark'
})
`
</script>

<template>
  <EHtml>
    <EHead />
    <EBody :style="main">
      <EContainer :style="container">
        <ESection :style="box">
          <ECodeBlock style="padding: 20px;" :code="code" lang="typescript" theme="min-dark" />
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
