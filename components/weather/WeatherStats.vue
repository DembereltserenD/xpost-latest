<template>
  <div class="stats-grid">
    <div v-for="(stat, index) in stats" :key="index" class="stat-card">
      <div class="stat-icon">
        <component :is="stat.icon" class="w-6 h-6" />
      </div>
      <div class="stat-content">
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-value">{{ stat.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  Cloud, 
  Wind, 
  Droplets, 
  Moon,
  Sun,
  CloudRain,
  Thermometer
} from 'lucide-vue-next'

const props = defineProps<{
  weather: {
    temperatureDay: number
    temperatureNight: number
    windDay: number
    windNight: number
    Percentage_Precipitation_Day: number
    Percentage_Precipitation_Night: number
    phenoDay: string
    phenoNight: string
  }
}>()

const stats = computed(() => [
  {
    icon: Sun,
    label: 'Өдрийн температур',
    value: `${props.weather.temperatureDay}°C`
  },
  {
    icon: Moon,
    label: 'Шөнийн температур',
    value: `${props.weather.temperatureNight}°C`
  },
  {
    icon: Wind,
    label: 'Салхины хурд (Өдөр)',
    value: `${props.weather.windDay} м/с`
  },
  {
    icon: Wind,
    label: 'Салхины хурд (Шөнө)',
    value: `${props.weather.windNight} м/с`
  },
  {
    icon: CloudRain,
    label: 'Хур тунадас (Өдөр)',
    value: `${props.weather.Percentage_Precipitation_Day}%`
  },
  {
    icon: CloudRain,
    label: 'Хур тунадас (Шөнө)',
    value: `${props.weather.Percentage_Precipitation_Night}%`
  }
])
</script>

<style scoped>
.stats-grid {
  @apply grid grid-cols-2 sm:grid-cols-4 gap-4;
}

.stat-card {
  @apply bg-card text-card-foreground rounded-lg p-4;
  @apply flex items-center gap-3;
  @apply transition-all duration-300;
  @apply hover:shadow-md hover:scale-105;
  @apply border border-border;
}

.stat-icon {
  @apply text-primary;
}

.stat-content {
  @apply flex flex-col;
}

.stat-label {
  @apply text-xs text-muted-foreground;
}

.stat-value {
  @apply text-sm font-medium text-foreground;
}
</style>