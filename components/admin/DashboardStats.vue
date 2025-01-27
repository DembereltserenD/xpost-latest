<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <!-- Total News -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
          </svg>
        </div>
        <div class="ml-4">
          <h2 class="text-gray-600 dark:text-gray-400 text-sm">Нийт мэдээ</h2>
          <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ stats.totalNews }}</p>
        </div>
      </div>
      <div class="mt-4">
        <span :class="stats.newsGrowth >= 0 ? 'text-green-500' : 'text-red-500'" class="text-sm font-medium">
          {{ stats.newsGrowth >= 0 ? '+' : '' }}{{ stats.newsGrowth }}%
        </span>
        <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">өмнөх 7 хоногоос</span>
      </div>
    </div>

    <!-- Published News -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
          <svg class="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-4">
          <h2 class="text-gray-600 dark:text-gray-400 text-sm">Нийтлэгдсэн</h2>
          <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ stats.publishedNews }}</p>
        </div>
      </div>
      <div class="mt-4">
        <span class="text-gray-500 dark:text-gray-400 text-sm">Нийт мэдээний {{ Math.round((stats.publishedNews / stats.totalNews) * 100) }}%</span>
      </div>
    </div>

    <!-- Featured News -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
          <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <div class="ml-4">
          <h2 class="text-gray-600 dark:text-gray-400 text-sm">Онцлох мэдээ</h2>
          <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ stats.featuredNews }}</p>
        </div>
      </div>
      <div class="mt-4">
        <span class="text-gray-500 dark:text-gray-400 text-sm">Нийт мэдээний {{ Math.round((stats.featuredNews / stats.totalNews) * 100) }}%</span>
      </div>
    </div>

    <!-- Categories -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
          <svg class="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <div class="ml-4">
          <h2 class="text-gray-600 dark:text-gray-400 text-sm">Ангилал</h2>
          <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ stats.totalCategories }}</p>
        </div>
      </div>
      <div class="mt-4">
        <span class="text-gray-500 dark:text-gray-400 text-sm">Идэвхтэй ангилал</span>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- News by Category Chart -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Ангилал бүрийн мэдээ</h3>
      <canvas ref="categoryChartRef"></canvas>
    </div>

    <!-- News Timeline Chart -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">7 хоногийн мэдээний тоо</h3>
      <canvas ref="timelineChartRef"></canvas>
    </div>

    <!-- Most Active Categories -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 col-span-1 lg:col-span-2">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Идэвхтэй ангилалууд</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="category in stats.topCategories" :key="category.id" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <h4 class="text-gray-800 dark:text-white font-medium">{{ category.name }}</h4>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ category.count }} мэдээ</span>
          </div>
          <div class="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div class="bg-blue-600 h-2 rounded-full" :style="{ width: `${(category.count / stats.totalNews) * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()

const categoryChartRef = ref(null)
const timelineChartRef = ref(null)
let categoryChart: Chart | null = null
let timelineChart: Chart | null = null

const stats = ref({
  totalNews: 0,
  publishedNews: 0,
  featuredNews: 0,
  totalCategories: 0,
  newsGrowth: 0,
  topCategories: []
})

// Fetch dashboard statistics
const fetchStats = async () => {
  try {
    console.log('Fetching dashboard stats...')
    
    // Get total news count
    const { count: totalCount } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })

    // Get published news count
    const { count: publishedCount } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)

    // Get featured news count
    const { count: featuredCount } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
      .eq('is_featured', true)

    // Get categories count
    const { count: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })

    // Get news from last week
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)
    const { count: lastWeekCount } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', lastWeek.toISOString())

    // Calculate growth
    const growth = totalCount > 0 ? ((lastWeekCount / totalCount) * 100) - 100 : 0

    // Get categories with news count
    const { data: categoriesWithCount, error: categoryError } = await supabase
      .from('news')
      .select(`
        category:categories (
          id,
          name
        )
      `)

    if (categoryError) {
      console.error('Error fetching categories:', categoryError)
      throw categoryError
    }

    // Count news per category
    const categoryCount = {}
    categoriesWithCount?.forEach(news => {
      if (news.category) {
        const { id, name } = news.category
        if (!categoryCount[id]) {
          categoryCount[id] = { id, name, count: 0 }
        }
        categoryCount[id].count++
      }
    })

    const topCategories = Object.values(categoryCount)
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 6)

    stats.value = {
      totalNews: totalCount || 0,
      publishedNews: publishedCount || 0,
      featuredNews: featuredCount || 0,
      totalCategories: categoriesCount || 0,
      newsGrowth: Math.round(growth),
      topCategories
    }

    console.log('Stats fetched:', stats.value)

    // Update charts with category data
    updateCharts(categoryCount)
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

// Initialize and update charts
const updateCharts = async (categoryCount: Record<string, any>) => {
  try {
    // Prepare category chart data
    const categoryData = Object.values(categoryCount)
    const labels = categoryData.map(cat => cat.name)
    const counts = categoryData.map(cat => cat.count)

    // Update category chart
    if (categoryChartRef.value) {
      if (categoryChart) categoryChart.destroy()
      categoryChart = new Chart(categoryChartRef.value, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data: counts,
            backgroundColor: [
              '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
              '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
              }
            }
          }
        }
      })
    }

    // Fetch timeline data
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)
    const { data: timelineData } = await supabase
      .from('news')
      .select('created_at')
      .gte('created_at', lastWeek.toISOString())
      .order('created_at')

    const timelineDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split('T')[0]
    }).reverse()

    const timelineCounts = timelineDates.map(date =>
      timelineData?.filter(item => item.created_at.startsWith(date)).length || 0
    )

    // Update timeline chart
    if (timelineChartRef.value) {
      if (timelineChart) timelineChart.destroy()
      timelineChart = new Chart(timelineChartRef.value, {
        type: 'line',
        data: {
          labels: timelineDates.map(date => {
            const [year, month, day] = date.split('-')
            return `${month}/${day}`
          }),
          datasets: [{
            label: 'Мэдээний тоо',
            data: timelineCounts,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
              }
            },
            x: {
              ticks: {
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
              }
            }
          }
        }
      })
    }
  } catch (error) {
    console.error('Error updating charts:', error)
  }
}

// Watch for dark mode changes
watch(() => document.documentElement.classList.contains('dark'), () => {
  updateCharts({})
})

onMounted(() => {
  fetchStats()
})
</script>
