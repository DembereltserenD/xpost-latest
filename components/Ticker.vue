<template>
  <div class="ticker-container">
    <div class="container-custom">
      <div class="ticker-wrapper">
        <div class="ticker-content">
          <div 
            class="ticker-item"
            :key="currentIndex"
            :class="{ 'fade-in': isTransitioning }"
          >
            {{ tickerItems[currentIndex] }}
          </div>
        </div>
        
        <div class="nav-buttons">
          <button 
            @click="previousNews" 
            class="ticker-nav-btn"
            :disabled="currentIndex === 0"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <button 
            @click="nextNews" 
            class="ticker-nav-btn"
            :disabled="currentIndex === tickerItems.length - 1"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const currentIndex = ref(0)
const isTransitioning = ref(false)
let autoRotateInterval: ReturnType<typeof setInterval> | null = null

const tickerItems = ref([
  'Breaking News: Important announcement from the government',
  'Weather Alert: Heavy rain expected in central regions',
  'Sports Update: National team wins international tournament',
  'Business News: Stock market reaches new high',
  'Technology: New innovation breakthrough announced'
])

const nextNews = () => {
  if (currentIndex.value < tickerItems.value.length - 1) {
    isTransitioning.value = true
    currentIndex.value++
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  } else {
    isTransitioning.value = true
    currentIndex.value = 0
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  }
}

const previousNews = () => {
  if (currentIndex.value > 0) {
    isTransitioning.value = true
    currentIndex.value--
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  }
}

const startAutoRotate = () => {
  autoRotateInterval = setInterval(() => {
    nextNews()
  }, 5000)
}

const stopAutoRotate = () => {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval)
    autoRotateInterval = null
  }
}

onMounted(() => {
  startAutoRotate()
})

onUnmounted(() => {
  stopAutoRotate()
})
</script>

<style scoped>
.ticker-container {
  @apply relative z-[60];
  height: var(--ticker-height);
  @apply bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60;
  @apply border-b border-border shadow-sm;
}

.container-custom {
  max-width: var(--max-width);
  @apply mx-auto h-full px-4;
}

.ticker-wrapper {
  @apply flex items-center h-full gap-4 justify-between;
}

.nav-buttons {
  @apply flex gap-1 ml-auto order-2;
}

.ticker-nav-btn {
  @apply flex items-center justify-center w-8 h-8 p-0;
  @apply text-foreground/60 hover:text-foreground transition-colors cursor-pointer;
  @apply disabled:opacity-40 disabled:cursor-not-allowed rounded-full;
  @apply hover:bg-accent;
}

.ticker-content {
  @apply flex-1 overflow-hidden order-1;
}

.ticker-item {
  @apply text-sm text-foreground/80 whitespace-nowrap overflow-hidden text-ellipsis;
  @apply transition-opacity duration-300;
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .ticker-item {
    @apply text-xs;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .ticker-item,
  .fade-in {
    @apply transition-none animate-none;
  }
}
</style>