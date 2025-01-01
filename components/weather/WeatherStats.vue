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
  @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4;
}

.stat-card {
  @apply bg-gray-700 p-1 rounded-lg flex items-center gap-3;
}

.stat-icon {
  @apply text-blue-400;
}

.stat-content {
  @apply flex-1;
}

.stat-label {
  @apply text-sm text-gray-300;
}

.stat-value {
  @apply text-lg font-semibold text-white;
}

@media (max-width: 768px) {
  .stats-grid {
    @apply grid-cols-2;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    @apply grid-cols-1;
  }
}
</style>