<template>
  <TooltipTrigger v-bind="$attrs" :as-child="asChild">
    <slot />
  </TooltipTrigger>
</template>

<script setup lang="ts">
import { TooltipTrigger } from 'radix-vue'

withDefaults(defineProps<{
  asChild?: boolean
}>(), {
  asChild: false
})
</script>