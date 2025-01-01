<template>
  <div class="info-item">
    <NuxtLink to="/weather" class="info-link" @click="$emit('close')">
      <Thermometer class="info-icon" />
      <template v-if="weatherStore.isLoading">
        <span class="loading-text">Уншиж байна...</span>
      </template>
      <template v-else-if="weatherStore.currentWeather">
        <div class="info-text">
          <span class="primary-text">
            {{ weatherStore.currentWeather.temperatureDay }}°C / {{ weatherStore.currentWeather.temperatureNight }}°C
          </span>
          <span class="secondary-text">{{ weatherStore.selectedCity }}</span>
        </div>
      </template>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Thermometer } from 'lucide-vue-next'
import { useWeatherStore } from '~/composables/useWeatherStore'

const weatherStore = useWeatherStore()

onMounted(async () => {
  await weatherStore.fetchWeatherInfo()
})
</script>

<style scoped>
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

.secondary-text {
  @apply text-xs text-muted-foreground;
}

.loading-text {
  @apply text-sm text-muted-foreground animate-pulse;
}
</style>
