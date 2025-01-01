<template>
  <div :class="['weather-icon', weatherClass]">
    <img :src="`/weather-icons/${weatherClass}.svg`" :alt="weatherClass" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  phenoId: string
}>()

const weatherMap = {
  '1': 'Sunny',           // Цэлмэг
  '2': 'Mostly-Sunny',    // Ихэнхдээ нартай
  '3': 'partly-cloudy',   // Багавтар үүлтэй
  '4': 'cloudy',          // Үүлшинэ
  '5': 'rain',            // Бороо
  '6': 'heavy-rain',      // Их бороо
  '7': 'snow',            // Цас
  '8': 'heavy-snow',      // Их цас
  '9': 'thunderstorm',    // Аадар бороо
  '10': 'fog',            // Манан
  '11': 'partly-snow'     // Цастай
}

const weatherClass = computed(() => {
  return weatherMap[props.phenoId as keyof typeof weatherMap] || 'cloudy'
})
</script>

<style scoped>
.weather-icon {
  display: inline-block;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.weather-icon:hover {
  transform: scale(1.1);
}

.weather-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
  animation: float 3s ease-in-out infinite;
}

/* Weather-specific animations and effects */
.Sunny img {
  filter: drop-shadow(0 0 10px rgba(255, 255, 0, 0.7));
  animation: spin 20s linear infinite;
}

.Mostly-Sunny img {
  filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.7));
  animation: float 4s ease-in-out infinite;
}

.partly-cloudy img {
  filter: drop-shadow(0 0 8px rgba(135, 206, 235, 0.7));
  animation: sway 4s ease-in-out infinite;
}

.rain img {
  filter: drop-shadow(0 0 8px rgba(0, 0, 255, 0.7));
  animation: bounce 2s ease-in-out infinite;
}

.thunderstorm img {
  filter: drop-shadow(0 0 12px rgba(255, 255, 0, 0.8));
  animation: flash 1.5s infinite;
}

.snow img {
  filter: drop-shadow(0 0 8px rgba(255, 250, 250, 0.7));
  animation: fall 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes sway {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes flash {
  0%, 100% { opacity: 1; filter: brightness(1); }
  50% { opacity: 0.7; filter: brightness(1.5); }
}

@keyframes fall {
  0% { transform: translateY(-5px) rotate(0deg); }
  50% { transform: translateY(0) rotate(180deg); }
  100% { transform: translateY(-5px) rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .weather-icon {
    width: 80%;
    height: 80%;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .weather-icon,
  .weather-icon img {
    animation: none;
    transition: none;
  }
}
</style>