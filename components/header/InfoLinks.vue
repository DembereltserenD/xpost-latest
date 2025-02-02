<template>
  <div class="additional-info" :class="{ 'info-active': isMenuOpen }">
    <WeatherWidget @close="$emit('close')" />
    
    <div class="info-item">
      <NuxtLink 
        to="/horoscope" 
        class="info-link"
        :class="{ 'router-link-active': $route.path === '/horoscope' }"
        @click="$emit('close')"
      >
        <Star class="info-icon" />
        <div class="info-text">
          <span class="primary-text">Зурхай</span>
        </div>
      </NuxtLink>
    </div>

    <div class="info-item">
      <NuxtLink 
        to="/exchange" 
        class="info-link"
        :class="{ 'router-link-active': $route.path === '/exchange' }"
        @click="$emit('close')"
      >
        <TrendingUp class="info-icon" />
        <div class="info-text flex flex-col items-start">
          <span v-if="usdRate" class="text-sm font-medium">{{ formatNumber(usdRate) }}₮</span>
          <span v-else class="text-sm font-medium">...</span>
          <span class="text-sm text-muted-foreground">Валютын ханш</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, TrendingUp } from 'lucide-vue-next'
import WeatherWidget from './WeatherWidget.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps<{
  isMenuOpen: boolean
}>()

const usdRate = ref<number | null>(null)

function formatNumber(value: number) {
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

onMounted(async () => {
  try {
    const response = await fetch('https://monxansh.appspot.com/xansh.json?currency=USD')
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    if (data && data.length > 0) {
      usdRate.value = data[0].rate_float
    }
  } catch (error) {
    console.error('Error fetching USD rate:', error)
  }
})
</script>

<style scoped>
.additional-info {
  @apply flex items-center space-x-4;
}

.info-item {
  @apply relative;
}

.info-link {
  @apply flex items-center gap-2 text-sm;
  @apply text-foreground/80 hover:text-foreground;
  @apply transition-all duration-200;
  @apply px-3 py-2 rounded-md;
  @apply hover:bg-accent/50;
}

.info-icon {
  @apply w-4 h-4;
}

.info-text {
  @apply flex flex-col;
}

.router-link-active {
  @apply bg-accent/30 text-foreground;
}

/* Remove active state styles when not on specific pages */
.info-link:not(.router-link-active):hover {
  @apply bg-accent/50;
}

/* Hide entire component on mobile */
@media (max-width: 1023px) {
  .additional-info {
    @apply !hidden;
  }
}
</style>