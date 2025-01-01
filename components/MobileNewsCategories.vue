<template>
  <div class="placeholder-image">
    <span class="placeholder-text">{{ computedWidth }} x {{ computedHeight }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  aspectRatio: {
    type: Number,
    default: 1.4
  }
})

const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)

const updateSize = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth
  }
}

onMounted(() => {
  containerRef.value = document.querySelector('.placeholder-image')
  updateSize()
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

const computedWidth = computed(() => Math.round(containerWidth.value))
const computedHeight = computed(() => Math.round(containerWidth.value / props.aspectRatio))
</script>

<style scoped>
.placeholder-image {
  @apply w-full h-0 relative overflow-hidden bg-gray-800;
  padding-bottom: theme('spacing.1/1.4');
}

.placeholder-text {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
  @apply text-gray-400 text-sm whitespace-nowrap;
}
</style>