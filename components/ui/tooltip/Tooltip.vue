<template>
  <TooltipRoot v-bind="props" :delayDuration="delayDuration">
    <slot />
  </TooltipRoot>
</template>

<script setup lang="ts">
import { TooltipRoot } from 'radix-vue'

interface TooltipProps {
  delayDuration?: number
  defaultOpen?: boolean
  open?: boolean
}

const props = withDefaults(defineProps<TooltipProps>(), {
  delayDuration: 200
})

defineOptions({
  name: 'TooltipComponent'
})
</script>