<template>
  <!-- eslint-disable vue/require-component-is -->
  <router-link v-bind="linkProps(to)"><slot /></router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup() {
    const external = (path: string) => {
      return /^(https?:|mailto:|tel:)/.test(path)
    }
    const linkProps = (url: string) => {
      if (external(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
    return {
      linkProps
    }
  }
})
</script>
