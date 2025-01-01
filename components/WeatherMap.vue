<template>
  <div class="weather-map">
    <svg viewBox="0 0 800 500" class="map-svg">
      <!-- Mongolia map paths -->
      <g class="provinces">
        <path 
          v-for="province in provinces" 
          :key="province.id"
          :d="province.path"
          :class="['province', { active: selectedProvince === province.id }]"
          @click="$emit('provinceClick', province.id)"
        />
      </g>
      <!-- Weather icons -->
      <g class="weather-icons">
        <g 
          v-for="city in cities" 
          :key="city.name"
          :transform="`translate(${city.coordinates.x}, ${city.coordinates.y})`"
          class="city-weather"
          @click="$emit('cityClick', city.name)"
        >
          <foreignObject 
            x="-20" 
            y="-20" 
            width="40" 
            height="40"
          >
            <WeatherIcon 
              :phenoId="city.weatherData?.phenoIdDay || '4'"
              class="city-weather-icon"
            />
          </foreignObject>
          <text 
            x="0" 
            y="30" 
            class="city-name"
          >{{ city.name }}</text>
          <text 
            x="0" 
            y="45" 
            class="city-temp"
          >{{ city.weatherData?.temperatureDay || 0 }}°C</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import WeatherIcon from './WeatherIcon.vue'

defineProps<{
  cities: Array<{
    name: string
    coordinates: { x: number; y: number }
    weatherData?: {
      phenoIdDay: string
      temperatureDay: number
    }
  }>
  selectedProvince?: string
}>()

defineEmits<{
  (e: 'provinceClick', provinceId: string): void
  (e: 'cityClick', cityName: string): void
}>()

const provinces = [
  {
    id: 'ulaanbaatar',
    path: 'M400 250 L420 250 L420 270 L400 270 Z'
  },
  // Add more provinces with their SVG paths
]
</script>

<style scoped>
.weather-map {
  width: 100%;
  background-color: rgb(31 41 55);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
}

.map-svg {
  width: 100%;
  height: auto;
}

.province {
  fill: rgb(55 65 81);
  stroke: rgb(75 85 99);
  stroke-width: 1;
  transition: all 0.3s ease;
  cursor: pointer;
}

.province:hover,
.province.active {
  fill: rgb(59 130 246);
}

.city-weather {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.city-weather:hover {
  transform: scale(1.1);
}

.city-weather-icon {
  width: 100%;
  height: 100%;
}

.city-name {
  font-size: 12px;
  fill: white;
  text-anchor: middle;
}

.city-temp {
  font-size: 10px;
  fill: rgb(156 163 175);
  text-anchor: middle;
}

@media (max-width: 768px) {
  .weather-map {
    padding: 0.5rem;
  }

  .city-name {
    font-size: 10px;
  }

  .city-temp {
    font-size: 8px;
  }
}
</style>