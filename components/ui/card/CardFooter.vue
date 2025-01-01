<template>
  <div :class="cn('flex items-center p-6 pt-0', className)">
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