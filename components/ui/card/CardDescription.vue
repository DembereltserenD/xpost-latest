<template>
  <p :class="cn('text-sm text-muted-foreground', className)">
    <slot />
  </p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

defineProps<{
  className?: HTMLAttributes['class']
}>()
</script>