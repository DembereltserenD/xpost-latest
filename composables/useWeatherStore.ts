import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface WeatherData {
  date: string
  temperatureDay: number
  temperatureNight: number
  phenoIdDay: string
  phenoDay: string
  phenoIdNight: string
  phenoNight: string
  Percentage_Precipitation_Day: number
  Percentage_Precipitation_Night: number
  windDay: number
  windNight: number
}

export interface CityWeather {
  city: string
  province: string
  data: WeatherData[]
}

export const useWeatherStore = defineStore('weather', () => {
  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const selectedCity = ref('Улаанбаатар')
  const selectedProvince = ref<string | null>(null)
  const allCityWeather = ref<CityWeather[]>([])

  const currentWeather = computed(() => {
    const cityWeather = allCityWeather.value.find(c => c.city === selectedCity.value)
    return cityWeather?.data[0]
  })

  const forecast = computed(() => {
    const cityWeather = allCityWeather.value.find(c => c.city === selectedCity.value)
    return cityWeather?.data.slice(1) || []
  })

  const weatherTips = computed(() => {
    const tips = []
    if (currentWeather.value) {
      if (currentWeather.value.temperatureDay < 10) {
        tips.push('Хүйтэн: Дулаан хувцаслаж, бээлий, малгай өмсөөрэй.')
      }
      if (currentWeather.value.temperatureDay >= 10 && currentWeather.value.temperatureDay < 20) {
        tips.push('Сэрүүн: Хөнгөн куртик эсвэл цамц өмсөх нь тохиромжтой.')
      }
      if (currentWeather.value.Percentage_Precipitation_Day > 30 || currentWeather.value.Percentage_Precipitation_Night > 30) {
        tips.push('Хур тунадас: Шүхэр авч явахаа бүү мартаарай.')
      }
      if (currentWeather.value.windDay > 5 || currentWeather.value.windNight > 5) {
        tips.push('Салхитай: Гадаа гарахдаа болгоомжтой байгаарай.')
      }
      if (currentWeather.value.temperatureDay > 20) {
        tips.push('Дулаан: Усаа их уух, нарны тос хэрэглэхийг анхааруулж байна.')
      }
    }
    return tips
  })

  const setSelectedCity = (city: string) => {
    selectedCity.value = city
    error.value = null
  }

  const fetchWeatherInfo = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('https://weather.gov.mn/api/get/forecasts')
      if (!response.ok) {
        throw new Error('Цаг агаарын мэдээлэл авах боломжгүй байна')
      }
      const xmlData = await response.text()
      
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml')
      
      if (xmlDoc.querySelector('parsererror')) {
        throw new Error('Цаг агаарын мэдээлэл буруу байна')
      }

      const forecasts = xmlDoc.querySelectorAll('forecast5day')
      
      if (!forecasts.length) {
        throw new Error('Цаг агаарын мэдээлэл хоосон байна')
      }

      allCityWeather.value = Array.from(forecasts).map(forecast => {
        const city = forecast.querySelector('city')?.textContent || ''
        const province = forecast.querySelector('province')?.textContent || ''
        
        // Get all data elements
        const dataElements = Array.from(forecast.querySelectorAll('data'))
        
        // Create today's data from current weather
        const today = new Date()
        const todayData = {
          date: today.toISOString().split('T')[0],
          temperatureDay: parseInt(forecast.querySelector('temperatureDay')?.textContent || '0'),
          temperatureNight: parseInt(forecast.querySelector('temperatureNight')?.textContent || '0'),
          phenoIdDay: getWeatherPhenoId(forecast.querySelector('phenoDay')?.textContent || ''),
          phenoDay: forecast.querySelector('phenoDay')?.textContent || '',
          phenoIdNight: getWeatherPhenoId(forecast.querySelector('phenoNight')?.textContent || ''),
          phenoNight: forecast.querySelector('phenoNight')?.textContent || '',
          Percentage_Precipitation_Day: parseInt(forecast.querySelector('Percentage_Precipitation_Day')?.textContent || '0'),
          Percentage_Precipitation_Night: parseInt(forecast.querySelector('Percentage_Precipitation_Night')?.textContent || '0'),
          windDay: parseInt(forecast.querySelector('windDay')?.textContent || '0'),
          windNight: parseInt(forecast.querySelector('windNight')?.textContent || '0')
        }
        
        // Combine today's data with forecast data
        const data = [todayData, ...dataElements.map(day => ({
          date: day.querySelector('date')?.textContent || '',
          temperatureDay: parseInt(day.querySelector('temperatureDay')?.textContent || '0'),
          temperatureNight: parseInt(day.querySelector('temperatureNight')?.textContent || '0'),
          phenoIdDay: getWeatherPhenoId(day.querySelector('phenoDay')?.textContent || ''),
          phenoDay: day.querySelector('phenoDay')?.textContent || '',
          phenoIdNight: getWeatherPhenoId(day.querySelector('phenoNight')?.textContent || ''),
          phenoNight: day.querySelector('phenoNight')?.textContent || '',
          Percentage_Precipitation_Day: parseInt(day.querySelector('Percentage_Precipitation_Day')?.textContent || '0'),
          Percentage_Precipitation_Night: parseInt(day.querySelector('Percentage_Precipitation_Night')?.textContent || '0'),
          windDay: parseInt(day.querySelector('windDay')?.textContent || '0'),
          windNight: parseInt(day.querySelector('windNight')?.textContent || '0')
        }))]

        return { city, province, data }
      })

      if (allCityWeather.value.length === 0) {
        throw new Error('Цаг агаарын мэдээлэл олдсонгүй')
      }

    } catch (e) {
      console.error('Цаг агаарын мэдээлэл авахад алдаа гарлаа:', e)
      error.value = 'Цаг агаарын мэдээлэл авах боломжгүй байна. Дахин оролдоно уу.'
    } finally {
      isLoading.value = false
    }
  }

  const getWeatherPhenoId = (description: string) => {
    const weatherMap: Record<string, string> = {
      'Багавтар үүлтэй': '3',
      'Үүлшинэ': '4',
      'Бороо': '5',
      'Их бороо': '6',
      'Цас': '7',
      'Их цас': '8',
      'Аадар бороо': '9',
      'Манан': '10',
      'Нартай': '1',
      'Үүл багасна': '2'
    }
    return weatherMap[description] || '4'
  }

  return {
    isLoading,
    error,
    selectedCity,
    selectedProvince,
    allCityWeather,
    currentWeather,
    forecast,
    weatherTips,
    fetchWeatherInfo,
    setSelectedCity,
    setSelectedProvince: (province: string) => selectedProvince.value = province
  }
})