<template>
  <div class="weather-page animate-fade-in">
    <div class="container-custom">
      <div class="mb-8 pt-8">
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-foreground">
          Монгол улсын цаг агаарын мэдээ
        </h1>
      </div>

      <!-- Loading state -->
      <div v-if="weatherStore.isLoading" class="text-center py-12">
        <div class="loader"></div>
        <p class="text-xl mt-4 text-foreground">Цаг агаарын мэдээлэл ачаалж байна...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="weatherStore.error" class="text-center py-12">
        <div class="bg-destructive/20 p-6 rounded-lg max-w-md mx-auto">
          <AlertCircle class="w-12 h-12 mx-auto mb-4 text-destructive" />
          <p class="text-xl text-destructive">{{ weatherStore.error }}</p>
          <button 
            @click="retryFetch"
            class="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Дахин оролдох
          </button>
        </div>
      </div>

      <!-- Weather content -->
      <div v-else-if="weatherStore.currentWeather" class="weather-content animate-fade-in">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- City selection sidebar -->
          <aside class="city-selection w-full lg:w-1/4">
            <div class="bg-card text-card-foreground rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 class="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <MapPin class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span>Хот сонгох</span>
              </h2>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li v-for="city in showAllCities ? cityList : cityList.slice(0, 6)" :key="city.name">
                  <button
                    @click="weatherStore.setSelectedCity(city.name)"
                    class="w-full text-left px-3 py-2 rounded transition-all duration-300 text-sm transform hover:scale-102"
                    :class="weatherStore.selectedCity === city.name ? 'bg-primary text-primary-foreground scale-105' : 'bg-muted hover:bg-muted/80'"
                  >
                    <span class="block font-medium truncate">{{ city.name }}</span>
                    <span class="block text-xs opacity-75 truncate">{{ city.province }}</span>
                  </button>
                </li>
              </ul>
              <button
                v-if="cityList.length > 6"
                @click="showAllCities = !showAllCities"
                class="w-full mt-3 px-3 py-2 bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
              >
                <span>{{ showAllCities ? 'Хаах' : 'Бусад аймгууд' }}</span>
              </button>
            </div>

            <!-- Weather Tips -->
            <WeatherTips 
              class="weather-tips"
              v-if="weatherStore.weatherTips.length > 0" 
              :tips="weatherStore.weatherTips" 
            />
          </aside>

          <!-- Main weather content -->
          <main class="w-full lg:w-3/4">
            <div class="bg-card text-card-foreground rounded-lg p-6">
              <!-- Current Weather -->
              <div class="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <h2 class="text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-300">
                  {{ weatherStore.currentWeather.location }}
                </h2>
                <div class="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>{{ formatMonth(new Date()) }}</span>
                  <span>сарын</span>
                  <span>{{ formatDay(new Date()) }}</span>
                </div>
              </div>

              <!-- Weather Stats -->
              <div class="weather-stats grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="relative overflow-hidden bg-card text-card-foreground rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-103 hover:-translate-y-1 border border-border group">
                  <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50 transition-opacity duration-300 group-hover:opacity-70"></div>
                  <div class="relative p-6">
                    <h3 class="text-lg font-medium text-foreground mb-4">Өдрийн цаг агаар</h3>
                    <div class="flex items-center gap-6">
                      <div class="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <ThermometerSun class="w-14 h-14 text-orange-500" />
                      </div>
                      <div>
                        <div class="text-4xl font-bold text-foreground mb-2">
                          {{ weatherStore.currentWeather.temperatureDay }}°C
                        </div>
                        <div class="text-sm text-muted-foreground space-y-1">
                          <div class="flex items-center gap-2">
                            <Wind class="w-4 h-4" />
                            <span>Салхины хурд: {{ weatherStore.currentWeather.windDay }} м/с</span>
                          </div>
                          <div class="flex items-center gap-2">
                            <Cloud class="w-4 h-4" />
                            <span>{{ weatherStore.currentWeather.phenoDay }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="relative overflow-hidden bg-card text-card-foreground rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-103 hover:-translate-y-1 border border-border group">
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10 opacity-50 transition-opacity duration-300 group-hover:opacity-70"></div>
                  <div class="relative p-6">
                    <h3 class="text-lg font-medium text-foreground mb-4">Шөнийн цаг агаар</h3>
                    <div class="flex items-center gap-6">
                      <div class="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Moon class="w-14 h-14 text-blue-500" />
                      </div>
                      <div>
                        <div class="text-4xl font-bold text-foreground mb-2">
                          {{ weatherStore.currentWeather.temperatureNight }}°C
                        </div>
                        <div class="text-sm text-muted-foreground space-y-1">
                          <div class="flex items-center gap-2">
                            <Wind class="w-4 h-4" />
                            <span>Салхины хурд: {{ weatherStore.currentWeather.windNight }} м/с</span>
                          </div>
                          <div class="flex items-center gap-2">
                            <Cloud class="w-4 h-4" />
                            <span>{{ weatherStore.currentWeather.phenoNight }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 5-day Forecast -->
              <div class="forecast-section mb-8">
                <h3 class="text-lg font-medium text-foreground mb-4">5 хоногийн урьдчилсан мэдээ</h3>
                <div 
                  class="forecast-grid"
                  @scroll="handleScroll"
                >
                  <div 
                    v-for="(day, index) in weatherStore.forecast" 
                    :key="day.date"
                    class="forecast-card relative overflow-hidden bg-card text-card-foreground rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-103 hover:-translate-y-1 border border-border group cursor-pointer"
                  >
                    <div class="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/10 opacity-50 transition-opacity duration-300 group-hover:opacity-70"></div>
                    <div class="relative text-center">
                      <p class="text-sm font-medium text-foreground mb-2 transition-transform duration-300 group-hover:scale-105">
                        {{ formatMonth(new Date(day.date)) }} сарын {{ formatDay(new Date(day.date)) }}
                      </p>
                      <div class="flex-shrink-0 mx-auto mb-2 transition-transform duration-300 group-hover:scale-110">
                        <component :is="getWeatherIcon(day.phenoDay)" class="w-10 h-10 mx-auto text-gray-600" />
                      </div>
                      <div class="flex items-center justify-center gap-4">
                        <div>
                          <div class="text-2xl font-bold text-foreground">
                            {{ day.temperatureDay }}°
                          </div>
                          <div class="text-xs text-muted-foreground">
                            Өдөр
                          </div>
                        </div>
                        <div>
                          <div class="text-2xl font-bold text-muted-foreground">
                            {{ day.temperatureNight }}°
                          </div>
                          <div class="text-xs text-muted-foreground">
                            Шөнө
                          </div>
                        </div>
                      </div>
                      <div class="text-sm text-muted-foreground mt-2">
                        {{ day.phenoDay }}
                      </div>
                      <div class="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                        <Wind class="w-4 h-4" />
                        {{ day.windDay }} м/с
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Pagination dots for mobile -->
                <div class="flex justify-center gap-2 mt-4 lg:hidden">
                  <div 
                    v-for="index in Math.ceil(weatherStore.forecast.length / 2)" 
                    :key="index"
                    class="w-2 h-2 rounded-full transition-all duration-300"
                    :class="{ 'bg-primary': activeSlideIndex === index - 1, 'bg-muted': activeSlideIndex !== index - 1 }"
                  ></div>
                </div>
              </div>

              <!-- Temperature Chart -->
              <div class="temperature-chart relative overflow-hidden bg-card text-card-foreground rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-103 hover:-translate-y-1 border border-border">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10 opacity-50 transition-opacity duration-300 group-hover:opacity-70"></div>
                <div class="relative">
                  <h3 class="text-lg font-medium text-foreground mb-4">Температурын график</h3>
                  <div class="h-[300px]">
                    <TemperatureChart 
                      :data="temperatureChartData"
                      :options="chartOptions"
                    />
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
definePageMeta({
  ssr: false  // Enable CSR for dynamic weather updates
})

import { ref, computed, onMounted } from 'vue'
import { useWeatherStore } from '~/composables/useWeatherStore'
import { 
  MapPin, 
  AlertCircle,
  ThermometerSun,
  ThermometerSnowflake,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  CloudLightning,
  Wind
} from 'lucide-vue-next'
import WeatherIcon from '~/components/weather/WeatherIcon.vue'
import WeatherTips from '~/components/weather/WeatherTips.vue'
import WeatherForecast from '~/components/weather/WeatherForecast.vue'
import TemperatureChart from '~/components/weather/TemperatureChart.vue'

const weatherStore = useWeatherStore()
const showAllCities = ref(false)
const activeSlideIndex = ref(0)

// Function to handle scroll events
const handleScroll = (event) => {
  const container = event.target
  const cardWidth = container.firstElementChild?.offsetWidth || 0
  const scrollPosition = container.scrollLeft
  const newIndex = Math.round(scrollPosition / cardWidth)
  activeSlideIndex.value = Math.floor(newIndex / 2) // Divide by 2 since we show 2 cards
}

// Weather icon mapping function
const getWeatherIcon = (condition: string) => {
  const conditionLower = condition?.toLowerCase() || '';
  if (conditionLower.includes('rain') || conditionLower.includes('бороо')) return CloudRain;
  if (conditionLower.includes('snow') || conditionLower.includes('цас')) return CloudSnow;
  if (conditionLower.includes('cloud') || conditionLower.includes('үүлэрхэг')) return Cloud;
  if (conditionLower.includes('thunder') || conditionLower.includes('аянга')) return CloudLightning;
  if (conditionLower.includes('wind') || conditionLower.includes('салхи')) return Wind;
  if (conditionLower.includes('clear') || conditionLower.includes('нартай')) return Sun;
  return Sun; // default icon
}

const cityList = [
  { name: 'Улаанбаатар', province: 'Нийслэл' },
  { name: 'Баруун-Урт', province: 'Сүхбаатар' },
  { name: 'Даланзадгад', province: 'Өмнөговь' },
  { name: 'Дархан', province: 'Дархан-Уул' },
  { name: 'Зуунмод', province: 'Төв' },
  { name: 'Мандалговь', province: 'Дундговь' },
  { name: 'Сайншанд', province: 'Дорноговь' },
  { name: 'Сүхбаатар', province: 'Сэлэнгэ' },
  { name: 'Өндөрхаан', province: 'Хэнтий' },
  { name: 'Улиастай', province: 'Завхан' },
  { name: 'Ховд', province: 'Ховд' },
  { name: 'Хархорин', province: 'Өвөрхангай' },
  { name: 'Цэцэрлэг', province: 'Архангай' },
  { name: 'Чойбалсан', province: 'Дорнод' },
  { name: 'Эрдэнэт', province: 'Орхон' },
  { name: 'Өлгий', province: 'Баян-Өлгий' },
  { name: 'Булган', province: 'Булган' },
  { name: 'Баянхонгор', province: 'Баянхонгор' },
  { name: 'Мөрөн', province: 'Хөвсгөл' },
  { name: 'Алтай', province: 'Говь-Алтай' }
]

const temperatureChartData = computed(() => ({
  labels: weatherStore.forecast.map(day => formatMonth(new Date(day.date)) + ' ' + formatDay(new Date(day.date))),
  datasets: [
    {
      label: 'Өдрийн температур',
      data: weatherStore.forecast.map(day => day.temperatureDay),
      borderColor: '#f87171',
      backgroundColor: '#f87171',
      fill: false
    },
    {
      label: 'Шөнийн температур',
      data: weatherStore.forecast.map(day => day.temperatureNight),
      borderColor: '#60a5fa',
      backgroundColor: '#60a5fa',
      fill: false
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#9ca3af'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#9ca3af'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#9ca3af'
      }
    }
  }
}

const monthNames = [
  'Нэгдүгээр', 'Хоёрдугаар', 'Гуравдугаар', 'Дөрөвдүгээр',
  'Тавдугаар', 'Зургадугаар', 'Долдугаар', 'Наймдугаар',
  'Есдүгээр', 'Аравдугаар', 'Арван нэгдүгээр', 'Арван хоёрдугаар'
]

const formatMonth = (date: Date) => {
  const month = monthNames[date.getMonth()]
  return month
}

const formatDay = (date: Date) => {
  const day = date.getDate()
  return day
}

const formatDate = (date: Date) => {
  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  return `${month} сарын ${day}`
}

const retryFetch = () => {
  weatherStore.fetchWeatherInfo()
}

// Move initial fetch to onMounted
onMounted(() => {
  if (!weatherStore.currentWeather) {
    weatherStore.fetchWeatherInfo()
  }
})
</script>

<style scoped>
.weather-page {
  min-height: 100vh;
}

.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600;
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

.loader {
  @apply w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto;
  animation: spin 1s linear infinite;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.scale-102 {
  --tw-scale-x: 1.02;
  --tw-scale-y: 1.02;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.scale-103 {
  --tw-scale-x: 1.03;
  --tw-scale-y: 1.03;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group:hover .group-hover\:rotate-12 {
  --tw-rotate: 12deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

@media (max-width: 1023px) {
  .weather-content {
    display: flex;
    flex-direction: column;
  }

  .forecast-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding: 0.5rem 0;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scroll-behavior: smooth;
  }

  .forecast-grid::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .forecast-card {
    flex: 0 0 auto;
    width: calc(50% - 1rem); /* Show 2 cards at once */
    min-width: 150px;
    max-width: 200px;
    scroll-snap-align: start;
  }

  /* Current Weather Cards */
  .weather-stats {
    order: 1;
  }

  /* 5-day Forecast */
  .forecast-section {
    order: 2;
  }

  /* City Selection */
  .city-selection {
    order: 3;
  }

  /* Temperature Chart */
  .temperature-chart {
    order: 4;
  }

  /* Weather Tips */
  .weather-tips {
    order: 5;
  }
}

@media (min-width: 1024px) {
  .forecast-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
}
</style>