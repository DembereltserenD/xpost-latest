import { ref, onMounted } from 'vue'

interface WeatherData {
  temperatureDay: number
  temperatureNight: number
  location: string
  isLoading: boolean
}

export function useWeather() {
  const weatherInfo = ref<WeatherData>({
    temperatureDay: 0,
    temperatureNight: 0,
    location: 'Улаанбаатар',
    isLoading: true
  })

  const fetchWeatherData = async () => {
    weatherInfo.value.isLoading = true
    try {
      const response = await fetch('https://weather.gov.mn/api/get/forecasts')
      if (!response.ok) {
        throw new Error('Weather API request failed')
      }
      
      const xmlData = await response.text()
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml')
      
      const ulaanbaatarForecast = Array.from(xmlDoc.querySelectorAll('forecast5day'))
        .find(forecast => forecast.querySelector('city')?.textContent === 'Улаанбаатар')
      
      if (ulaanbaatarForecast) {
        const todayData = ulaanbaatarForecast.querySelector('data')
        if (todayData) {
          weatherInfo.value = {
            temperatureDay: parseInt(todayData.querySelector('temperatureDay')?.textContent || '0'),
            temperatureNight: parseInt(todayData.querySelector('temperatureNight')?.textContent || '0'),
            location: 'Улаанбаатар',
            isLoading: false
          }
        }
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      weatherInfo.value.isLoading = false
    }
  }

  onMounted(() => {
    fetchWeatherData()
  })

  return {
    weatherInfo,
    fetchWeatherData
  }
}