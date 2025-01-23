import { defineStore } from 'pinia'

interface WeatherData {
  temperatureDay: number
  temperatureNight: number
  location: string
  isLoading: boolean
  windDay: number
  windNight: number
  phenoDay: string
  phenoNight: string
}

interface ForecastDay {
  date: string
  temperatureDay: number
  temperatureNight: number
  phenoDay: string
  phenoNight: string
  windDay: number
  windNight: number
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    currentWeather: null as WeatherData | null,
    selectedCity: 'Улаанбаатар',
    isLoading: false,
    error: null as string | null,
    forecast: [] as ForecastDay[],
    weatherTips: [] as string[]
  }),

  actions: {
    async fetchWeatherInfo() {
      this.isLoading = true
      this.error = null
      try {
        const response = await fetch('https://weather.gov.mn/api/get/forecasts')
        if (!response.ok) {
          throw new Error('Weather API request failed')
        }
        
        const xmlData = await response.text()
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml')
        
        const ulaanbaatarForecast = Array.from(xmlDoc.querySelectorAll('forecast5day'))
          .find(forecast => forecast.querySelector('city')?.textContent === this.selectedCity)
        
        if (!ulaanbaatarForecast) {
          throw new Error('Цаг агаарын мэдээлэл олдсонгүй')
        }

        // Get today's weather
        const todayData = ulaanbaatarForecast.querySelector('data')
        if (!todayData) {
          throw new Error('Өнөөдрийн цаг агаарын мэдээлэл олдсонгүй')
        }

        this.currentWeather = {
          temperatureDay: parseInt(todayData.querySelector('temperatureDay')?.textContent || '0'),
          temperatureNight: parseInt(todayData.querySelector('temperatureNight')?.textContent || '0'),
          location: this.selectedCity,
          isLoading: false,
          windDay: parseInt(todayData.querySelector('windDay')?.textContent || '0'),
          windNight: parseInt(todayData.querySelector('windNight')?.textContent || '0'),
          phenoDay: todayData.querySelector('phenoDay')?.textContent || '',
          phenoNight: todayData.querySelector('phenoNight')?.textContent || ''
        }

        // Get 5-day forecast
        const forecastData = Array.from(ulaanbaatarForecast.querySelectorAll('data'))
        this.forecast = forecastData.map(day => ({
          date: day.querySelector('date')?.textContent || '',
          temperatureDay: parseInt(day.querySelector('temperatureDay')?.textContent || '0'),
          temperatureNight: parseInt(day.querySelector('temperatureNight')?.textContent || '0'),
          phenoDay: day.querySelector('phenoDay')?.textContent || '',
          phenoNight: day.querySelector('phenoNight')?.textContent || '',
          windDay: parseInt(day.querySelector('windDay')?.textContent || '0'),
          windNight: parseInt(day.querySelector('windNight')?.textContent || '0')
        }))

        // Set weather tips based on temperature
        const todayTemp = this.currentWeather.temperatureDay
        this.weatherTips = [
          todayTemp < -20 ? 'Маш хүйтэн байна. Дулаан хувцаслаарай.' : 
          todayTemp < -10 ? 'Хүйтэн байна. Бээлий, малгай өмсөөрэй.' :
          todayTemp < 0 ? 'Сэрүүн байна.' :
          'Дулаан байна.'
        ]
      } catch (error) {
        console.error('Error fetching weather:', error)
        this.error = error instanceof Error ? error.message : 'Цаг агаарын мэдээлэл авахад алдаа гарлаа'
        this.currentWeather = null
      } finally {
        this.isLoading = false
      }
    },

    setSelectedCity(city: string) {
      this.selectedCity = city
      this.fetchWeatherInfo()
    }
  }
})
