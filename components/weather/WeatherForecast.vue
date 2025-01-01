<template>
  <div class="forecast-section">
    <h3 class="forecast-title">
      <Calendar class="w-5 h-5" />
      5 хоногийн урьдчилсан мэдээ
    </h3>
    <div class="forecast-grid">
      <div 
        v-for="day in forecast" 
        :key="day.date" 
        class="forecast-card"
      >
        <div class="forecast-date">{{ formatDate(day.date) }}</div>
        <WeatherIcon :phenoId="day.phenoIdDay" class="forecast-icon" />
        <div class="forecast-temps">
          <div class="temp-day">{{ day.temperatureDay }}°C</div>
          <div class="temp-night">{{ day.temperatureNight }}°C</div>
        </div>
        <div class="forecast-pheno">{{ day.phenoDay }}</div>
        <div class="forecast-details">
          <div class="detail-item">
            <Wind class="w-4 h-4" />
            {{ day.windDay }} м/с
          </div>
          <div class="detail-item">
            <CloudRain class="w-4 h-4" />
            {{ day.Percentage_Precipitation_Day }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Wind, CloudRain } from 'lucide-vue-next'
import WeatherIcon from '../WeatherIcon.vue'

const props = defineProps<{
  forecast: Array<{
    date: string
    temperatureDay: number
    temperatureNight: number
    phenoIdDay: string
    phenoDay: string
    windDay: number
    Percentage_Precipitation_Day: number
  }>
}>()

const monthNames = [
  'нэгдүгээр', 'хоёрдугаар', 'гуравдугаар', 'дөрөвдүгээр',
  'тавдугаар', 'зургадугаар', 'долдугаар', 'наймдугаар',
  'есдүгээр', 'аравдугаар', 'арван нэгдүгээр', 'арван хоёрдугаар'
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  return `${month} сарын ${day}`
}
</script>

<style scoped>
.forecast-section {
  @apply mb-8;
}

.forecast-title {
  @apply text-xl font-semibold mb-6 text-white flex items-center gap-2;
}

.forecast-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4;
}

.forecast-card {
  @apply bg-gray-700 p-4 rounded-lg text-center transition-transform duration-300 hover:-translate-y-1;
}

.forecast-date {
  @apply text-sm text-gray-400 mb-2;
}

.forecast-icon {
  @apply w-16 h-16 mx-auto mb-4;
}

.forecast-temps {
  @apply mb-2;
}

.temp-day {
  @apply text-2xl font-bold text-white mb-1;
}

.temp-night {
  @apply text-lg text-gray-300;
}

.forecast-pheno {
  @apply text-sm text-gray-300 mb-3;
}

.forecast-details {
  @apply text-sm text-gray-400 space-y-1;
}

.detail-item {
  @apply flex items-center justify-center gap-2;
}
</style>