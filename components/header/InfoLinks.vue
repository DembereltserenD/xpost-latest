<template>
  <div class="additional-info" :class="{ 'info-active': isMenuOpen }">
    <WeatherWidget @close="$emit('close')" />
    
    <div class="info-item">
      <NuxtLink to="/horoscope" class="info-link" @click="$emit('close')">
        <Star class="info-icon" />
        <div class="info-text">
          <span class="primary-text">Зурхай</span>
        </div>
      </NuxtLink>
    </div>

    <div class="info-item">
      <NuxtLink to="/handalt" class="info-link" @click="$emit('close')">
        <TrendingUp class="info-icon" />
        <div class="info-text">
          <span class="primary-text">Хандалт</span>
        </div>
      </NuxtLink>
    </div>

    <!-- Color Mode Toggle (Desktop) -->
    <div class="info-item hidden lg:block">
      <div class="info-link">
        <ColorModeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, TrendingUp } from 'lucide-vue-next'
import ColorModeToggle from '~/components/ColorModeToggle.vue'
import WeatherWidget from './WeatherWidget.vue'

defineProps<{
  isMenuOpen: boolean
}>()
</script>

<style scoped>
.additional-info {
  @apply hidden lg:flex items-center space-x-4;
}

.info-item {
  @apply relative;
}

.info-link {
  @apply flex items-center gap-2 px-3 py-2 rounded-md text-sm;
  @apply text-foreground/80 hover:text-foreground hover:bg-accent;
  @apply transition-colors duration-200;
}

.info-icon {
  @apply w-4 h-4;
}

.info-text {
  @apply flex flex-col;
}

.primary-text {
  @apply text-sm font-medium text-foreground;
}

@media (max-width: 1023px) {
  .additional-info {
    @apply fixed bottom-0 left-0 right-0 bg-background border-t border-border;
    @apply hidden flex-row items-center justify-around p-4;
    z-index: 55;
  }

  .additional-info.info-active {
    @apply flex;
  }
}
</style>
