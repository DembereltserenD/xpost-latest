<template>
  <div class="weather-icon" :class="colorClass">
    <template v-if="isCloud">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/>
      </svg>
    </template>
    <template v-else-if="isSnow">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
        <path d="M8 16a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
        <path d="M8 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
        <path d="M16 16a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
        <path d="M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
        <path d="M24 16a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
        <path d="M24 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
      </svg>
    </template>
    <template v-else-if="isSun">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/>
        <path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/>
        <path d="m19.07 4.93-1.41 1.41"/>
      </svg>
    </template>
    <template v-else-if="isRain">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        <path d="M11 13v2"/>
        <path d="M14 13v2"/>
        <path d="M17 13v2"/>
      </svg>
    </template>
    <template v-else>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  pheno: string
}>()

const isCloud = computed(() => props.pheno.toLowerCase().includes('үүлтэй'))
const isSnow = computed(() => props.pheno.toLowerCase().includes('цас'))
const isSun = computed(() => props.pheno.toLowerCase().includes('нартай'))
const isRain = computed(() => props.pheno.toLowerCase().includes('бороо'))

const colorClass = computed(() => {
  if (isCloud.value) return 'text-gray-500 dark:text-gray-400'
  if (isSnow.value) return 'text-blue-500 dark:text-blue-400'
  if (isSun.value) return 'text-yellow-500 dark:text-yellow-400'
  if (isRain.value) return 'text-blue-500 dark:text-blue-400'
  return 'text-gray-500 dark:text-gray-400'
})
</script>

<style scoped>
.weather-icon {
  @apply transition-colors duration-200;
}
</style>
