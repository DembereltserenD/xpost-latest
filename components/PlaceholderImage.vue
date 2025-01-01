<template>
  <div class="placeholder-image">
    <span class="placeholder-text">{{ computedWidth }} x {{ computedHeight }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  aspectRatio: {
    type: Number,
    default: 1.4 // Default aspect ratio (210/150 ≈ 1.4)
  }
});

const containerRef = ref<HTMLElement | null>(null);
const containerWidth = ref(0);

const updateSize = () => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth;
  }
};

onMounted(() => {
  containerRef.value = document.querySelector('.placeholder-image');
  updateSize();
  window.addEventListener('resize', updateSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSize);
});

const computedWidth = computed(() => Math.round(containerWidth.value));
const computedHeight = computed(() => Math.round(containerWidth.value / props.aspectRatio));
</script>

<style scoped>
.placeholder-image {
  width: 100%;
  height: 0;
  padding-bottom: calc(100% / 1.4); /* This maintains the aspect ratio */
  background-color: #cccccc;
  position: relative;
  overflow: hidden;
}

.placeholder-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666666;
  font-size: 14px;
  white-space: nowrap;
}
</style>