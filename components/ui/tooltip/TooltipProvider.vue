<template>
  <TooltipProvider v-bind="props">
    <slot />
  </TooltipProvider>
</template>

<script setup lang="ts">
import { TooltipProvider } from 'radix-vue'

interface TooltipProviderProps {
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
}

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 200,
  skipDelayDuration: 300,
  disableHoverableContent: false
})
</script>