<template>
  <div :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({
  name: 'CardComponent'
})

defineProps<{
  className?: HTMLAttributes['class']
}>()
</script>