<template>
  <div class="mb-8">
    <h3 class="text-lg font-medium text-gray-800 dark:text-gray-300 mb-4">5 хоногийн урьдчилсан мэдээ</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div 
        v-for="day in forecast" 
        :key="day.date"
        class="bg-gray-900/50 dark:bg-gray-800/50 rounded-lg p-4"
      >
        <div class="text-center">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {{ formatDate(new Date(day.date)) }}
          </div>
          <WeatherIcon :pheno="day.phenoDay" class="w-16 h-16 mx-auto mb-2" />
          <div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {{ day.temperatureDay }}°C
          </div>
          <div class="text-lg text-gray-700 dark:text-gray-300 mb-2">
            {{ day.temperatureNight }}°C
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {{ day.phenoDay }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ day.windDay }} м/с
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherIcon from './WeatherIcon.vue'

interface ForecastDay {
  date: string
  temperatureDay: number
  temperatureNight: number
  phenoDay: string
  phenoNight: string
  windDay: number
  windNight: number
}

const props = defineProps<{
  forecast: ForecastDay[]
}>()

const monthNames = [
  'Нэгдүгээр', 'Хоёрдугаар', 'Гуравдугаар', 'Дөрөвдүгээр',
  'Тавдугаар', 'Зургадугаар', 'Долдугаар', 'Наймдугаар',
  'Есдүгээр', 'Аравдугаар', 'Арван нэгдүгээр', 'Арван хоёрдугаар'
]

const formatDate = (date: Date) => {
  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  return `${month} сарын ${day}`
}
</script>

<style scoped>
/* Add styles here if needed */
</style>