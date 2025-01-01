<template>
  <div class="weather-tips">
    <h3 class="tips-title">
      <LightbulbIcon class="w-5 h-5" />
      Цаг агаарын зөвлөмж
    </h3>
    <ul class="tips-list">
      <li 
        v-for="(tip, index) in tips" 
        :key="index"
        class="tip-item"
      >
        <div class="tip-icon">
          <component :is="getTipIcon(tip)" class="w-4 h-4" />
        </div>
        {{ tip }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { 
  Lightbulb as LightbulbIcon,
  Thermometer,
  Umbrella,
  Wind,
  Sun
} from 'lucide-vue-next'

defineProps<{
  tips: string[]
}>()

const getTipIcon = (tip: string) => {
  if (tip.includes('Хүйтэн') || tip.includes('Сэрүүн')) return Thermometer
  if (tip.includes('Хур тунадас')) return Umbrella
  if (tip.includes('Салхитай')) return Wind
  if (tip.includes('Дулаан')) return Sun
  return LightbulbIcon
}
</script>

<style scoped>
.weather-tips {
  @apply bg-gray-700 rounded-lg p-4;
}

.tips-title {
  @apply text-lg font-semibold mb-4 flex items-center gap-2 text-white;
}

.tips-list {
  @apply space-y-3;
}

.tip-item {
  @apply flex items-center gap-3 text-gray-300;
}

.tip-icon {
  @apply text-yellow-400 flex-shrink-0;
}
</style>