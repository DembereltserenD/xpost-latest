<template>
  <div :class="cn('flex flex-col space-y-1.5 p-6', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

defineProps<{
  className?: HTMLAttributes['class']
}>()
</script>