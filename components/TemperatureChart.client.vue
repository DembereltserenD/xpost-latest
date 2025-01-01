<template>
  <Line
    :data="chartData"
    :options="chartOptions"
    class="temperature-chart"
  />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

defineProps<{
  chartData: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
    }>
  }
  chartOptions: {
    responsive: boolean
    maintainAspectRatio: boolean
    scales: {
      y: {
        beginAtZero: boolean
        title: {
          display: boolean
          text: string
        }
      }
    }
  }
}>()
</script>

<style scoped>
.temperature-chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

@media (max-width: 768px) {
  .temperature-chart {
    min-height: 250px;
  }
}

@media (max-width: 480px) {
  .temperature-chart {
    min-height: 200px;
  }
}
</style>