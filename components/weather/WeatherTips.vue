<template>
  <div class="weather-tips">
    <h3 class="tips-title">
      <LightbulbIcon class="w-5 h-5 animate-pulse" />
      Цаг агаарын зөвлөмж
    </h3>
    <ul class="tips-list">
      <li 
        v-for="(tip, index) in tips" 
        :key="index"
        class="tip-item animate-fade-in"
        :style="{ animationDelay: `${index * 100}ms` }"
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
  @apply bg-card text-card-foreground rounded-lg p-4 transition-all duration-300 hover:shadow-lg;
}

.tips-title {
  @apply text-lg font-semibold mb-4 flex items-center gap-2 text-foreground;
}

.tips-list {
  @apply space-y-3;
}

.tip-item {
  @apply flex items-center gap-2 text-sm text-muted-foreground;
  @apply bg-muted/50 rounded-lg p-3;
  @apply transition-all duration-300;
  @apply hover:bg-muted;
}

.tip-icon {
  @apply text-primary;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>