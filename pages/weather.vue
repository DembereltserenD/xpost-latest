<template>
  <div class="weather-page">
    <div class="container-custom">
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center gradient-text">
        Монгол улсын цаг агаарын мэдээ
      </h1>

      <!-- Loading state -->
      <div v-if="weatherStore.isLoading" class="text-center py-12">
        <div class="loader"></div>
        <p class="text-xl mt-4">Цаг агаарын мэдээлэл ачаалж байна...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="weatherStore.error" class="text-center py-12">
        <div class="bg-red-900/20 p-6 rounded-lg max-w-md mx-auto">
          <AlertCircle class="w-12 h-12 mx-auto mb-4 text-red-400" />
          <p class="text-xl text-red-400">{{ weatherStore.error }}</p>
          <button 
            @click="retryFetch"
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Дахин оролдох
          </button>
        </div>
      </div>

      <!-- Weather content -->
      <div v-else-if="weatherStore.currentWeather" class="weather-content">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- City selection sidebar -->
          <aside class="w-full lg:w-1/4">
            <div class="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                <MapPin class="w-5 h-5" />
                Хот сонгох
              </h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li v-for="city in showAllCities ? cityList : cityList.slice(0, 6)" :key="city.name">
                  <button
                    @click="weatherStore.setSelectedCity(city.name)"
                    class="w-full text-left px-3 py-2 rounded transition-colors text-sm"
                    :class="weatherStore.selectedCity === city.name ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'"
                  >
                    <span class="block font-medium truncate">{{ city.name }}</span>
                    <span class="block text-xs opacity-75 truncate">{{ city.province }}</span>
                  </button>
                </li>
              </ul>
              <button
                v-if="cityList.length > 6"
                @click="showAllCities = !showAllCities"
                class="w-full mt-3 px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors text-sm"
              >
                {{ showAllCities ? 'Хаах' : 'Бусад аймгууд' }}
              </button>
            </div>

            <!-- Weather Tips -->
            <WeatherTips 
              v-if="weatherStore.weatherTips.length > 0" 
              :tips="weatherStore.weatherTips" 
            />
          </aside>

          <!-- Main weather content -->
          <main class="w-full lg:w-3/4">
            <div class="bg-gray-800 rounded-lg p-6">
              <!-- City header -->
              <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
                <h2 class="text-2xl font-semibold text-white flex items-center gap-2">
                  <MapPin class="w-6 h-6" />
                  {{ weatherStore.selectedCity }} цаг агаар
                </h2>
                <span class="text-gray-400">
                  {{ formatDate(new Date()) }}
                </span>
              </div>

              <!-- Current weather stats -->
              <div class="mb-8">
                <WeatherStats :weather="weatherStore.currentWeather" />
              </div>

              <!-- 5-day forecast -->
              <div class="mb-8">
                <WeatherForecast :forecast="weatherStore.forecast" />
              </div>

              <!-- Temperature chart -->
              <div>
                <h3 class="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                  <LineChart class="w-5 h-5" />
                  Температурын график
                </h3>
                <div class="bg-gray-700 p-6 rounded-lg">
                  <div class="h-[400px]">
                    <ClientOnly>
                      <TemperatureChart 
                        :chart-data="temperatureChartData"
                        :chart-options="chartOptions"
                      />
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { MapPin, LineChart, AlertCircle } from 'lucide-vue-next'
import { useWeatherStore } from '~/composables/useWeatherStore'
import WeatherStats from '~/components/weather/WeatherStats.vue'
import WeatherForecast from '~/components/weather/WeatherForecast.vue'
import WeatherTips from '~/components/weather/WeatherTips.vue'
import TemperatureChart from '~/components/TemperatureChart.client.vue'

const weatherStore = useWeatherStore()
const showAllCities = ref(false)

const cityList = [
  { name: 'Улаанбаатар', province: 'Улаанбаатар' },
  { name: 'Алтай', province: 'Говь-Алтай' },
  { name: 'Арвайхээр', province: 'Өвөрхангай' },
  { name: 'Багануур', province: 'Улаанбаатар' },
  { name: 'Баруун-Урт', province: 'Сүхбаатар' },
  { name: 'Даланзадгад', province: 'Өмнөговь' },
  { name: 'Замын-Үүд', province: 'Дорноговь' },
  { name: 'Зуунмод', province: 'Төв' },
  { name: 'Мандалговь', province: 'Дундговь' },
  { name: 'Сайншанд', province: 'Дорноговь' },
  { name: 'Сүхбаатар', province: 'Сэлэнгэ' },
  { name: 'Тосонцэнгэл', province: 'Завхан' },
  { name: 'Улаангом', province: 'Увс' },
  { name: 'Ханбогд', province: 'Өмнөговь' },
  { name: 'Хархорин', province: 'Өвөрхангай' },
  { name: 'Хатгал', province: 'Хөвсгөл' },
  { name: 'Цэцэрлэг', province: 'Архангай' },
  { name: 'Чойр', province: 'Говьсүмбэр' },
  { name: 'Дархан', province: 'Дархан-Уул' },
  { name: 'Чойбалсан', province: 'Дорнод' },
  { name: 'Мөрөн', province: 'Хөвсгөл' },
  { name: 'Улиастай', province: 'Завхан' },
  { name: 'Ховд', province: 'Ховд' },
  { name: 'Өлгий', province: 'Баян-Өлгий' },
  { name: 'Булган', province: 'Булган' },
  { name: 'Баянхонгор', province: 'Баянхонгор' },
]

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

const temperatureChartData = computed(() => ({
  labels: weatherStore.forecast.map(day => formatDate(new Date(day.date))),
  datasets: [
    {
      label: 'Өдрийн температур',
      data: weatherStore.forecast.map(day => day.temperatureDay),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Шөнийн температур',
      data: weatherStore.forecast.map(day => day.temperatureNight),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
      title: {
        display: true,
        text: 'Температур (°C)',
        color: 'rgba(255, 255, 255, 0.7)',
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: 'rgba(255, 255, 255, 0.7)',
      }
    }
  }
}

const retryFetch = async () => {
  await weatherStore.fetchWeatherInfo()
}

onMounted(async () => {
  if (!weatherStore.currentWeather) {
    await weatherStore.fetchWeatherInfo()
  }
})
</script>

<style scoped>
.weather-page {
  @apply py-8;
  @apply min-h-[calc(100vh-var(--header-height)-var(--ticker-height))];
}

.loader {
  @apply w-12 h-12 border-4 border-blue-500 rounded-full animate-spin mx-auto;
  border-top-color: transparent;
}

.gradient-text {
  @apply text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500;
}

@media (max-width: 768px) {
  .weather-page {
    @apply py-4;
  }
}
</style>