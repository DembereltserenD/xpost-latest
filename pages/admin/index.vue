<template>
  <!-- Header Section -->
  <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Хянах самбар
        </h1>
        <p class="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
          Сайн байна уу, {{ userEmail }} - Энэ өдрийн мэдээ, статистик
        </p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Published Articles -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6" :class="{ 'animate-pulse': loading }">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <DocumentTextIcon class="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Нийтлэгдсэн мэдээ
              </dt>
              <dd class="mt-1 flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ animatedStats.published }}
                </div>
                <div class="ml-2 flex items-baseline text-sm font-semibold" :class="statsChange.published > 0 ? 'text-green-600' : 'text-red-600'">
                  <span v-if="statsChange.published !== 0">
                    {{ statsChange.published > 0 ? '+' : '' }}{{ statsChange.published }}
                  </span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- Total Views -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6" :class="{ 'animate-pulse': loading }">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
              <EyeIcon class="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Нийт үзэлт
              </dt>
              <dd class="mt-1 flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ animatedStats.views }}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- Today's Articles -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6" :class="{ 'animate-pulse': loading }">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
              <ChatAltIcon class="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Өнөөдрийн мэдээ
              </dt>
              <dd class="mt-1 flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ animatedStats.today }}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
      <!-- Views Over Time Chart -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6 h-[350px]">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Үзэлтийн график</h2>
        <div class="h-[280px]">
          <LineChart
            v-if="!loading && viewsChartData.labels.length > 0"
            :data="viewsChartData"
            :options="{
              ...chartOptions,
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                x: {
                  grid: {
                    display: true
                  }
                },
                y: {
                  grid: {
                    display: true
                  },
                  beginAtZero: true
                }
              }
            }"
            class="w-full h-full"
          />
          <div v-else-if="loading" class="animate-pulse flex space-x-4 h-full">
            <div class="flex-1 space-y-4 py-1">
              <div class="h-full rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Өгөгдөл олдсонгүй
          </div>
        </div>
      </div>

      <!-- Category Distribution Chart -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6 h-full">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Ангиллын харьцаа</h2>
        <div class="mt-3 sm:mt-4 relative h-[400px] flex items-center justify-center">
          <DoughnutChart
            v-if="!loading && categoryChartData.labels.length > 0"
            :data="categoryChartData"
            :options="{
              ...doughnutOptions,
              maintainAspectRatio: false,
              responsive: true
            }"
            class="w-full h-full max-w-[400px]"
          />
          <div v-else-if="loading" class="animate-pulse flex space-x-4 h-full">
            <div class="flex-1 space-y-4 py-1">
              <div class="h-full rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Өгөгдөл олдсонгүй
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
      <!-- Most Viewed Articles -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Хамгийн их үзэлттэй</h2>
        <div class="mt-3 sm:mt-4 flow-root">
          <ul class="-my-4 sm:-my-5 divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="post in topArticles" :key="post.id" class="py-3 sm:py-4">
              <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                    {{ post.title }}
                  </p>
                  <div class="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <EyeIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <p>{{ post.views }} үзэлт</p>
                  </div>
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDateTime(post.published_at) }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Ангилал</h2>
        <div class="mt-3 sm:mt-4 flow-root">
          <ul class="-my-4 sm:-my-5 divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="category in categoryStats" :key="category.category.name" class="py-3 sm:py-4">
              <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                <div class="flex items-center flex-1 min-w-0">
                  <div class="flex-shrink-0">
                    <div class="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span class="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                        {{ category.category.name[0] }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-3 flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {{ category.category.name }}
                    </p>
                  </div>
                </div>
                <div class="sm:ml-3">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    {{ category.count }} мэдээ
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Recent Articles -->
    <div class="mt-6 sm:mt-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Сүүлд нэмэгдсэн</h2>
        <div class="mt-3 sm:mt-4 flow-root">
          <ul class="-my-4 sm:-my-5 divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="post in recentArticles" :key="post.id" class="py-3 sm:py-4">
              <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                <div class="flex items-center space-x-3 flex-1 min-w-0">
                  <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <DocumentTextIcon class="h-6 w-6 text-purple-600 dark:text-purple-300" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {{ post.title }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {{ post.category?.name }}
                    </p>
                  </div>
                </div>
                <div class="sm:ml-3">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    {{ formatDateTime(post.published_at) }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import { 
  DocumentTextIcon, 
  PencilIcon, 
  ChatBubbleLeftIcon as ChatAltIcon, 
  EyeIcon 
} from '@heroicons/vue/24/outline'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js'
import { Line as LineChart, Doughnut as DoughnutChart } from 'vue-chartjs'
import { useIntervalFn, useTransition } from '@vueuse/core'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
)

definePageMeta({
  ssr: false,  // Enable CSR for admin dashboard
  middleware: ['auth', 'admin'],
  layout: 'admin'
})

const supabase = useSupabaseClient()
const userEmail = ref('Admin')
const loading = ref(true)

// Initialize reactive variables
const rawStats = ref({
  total: { 
    published: 0,
    today: 0,
    views: 0
  }
})

const statsChange = ref({
  published: 0,
  today: 0,
  views: 0
})

const topArticles = ref([])
const categoryStats = ref([])
const recentArticles = ref([])

// Chart data initialization with proper structure
const viewsChartData = ref({
  labels: [],
  datasets: [{
    label: 'Үзэлт',
    data: [],
    fill: true,
    borderColor: '#4F46E5',
    tension: 0.1,
    backgroundColor: 'rgba(79, 70, 229, 0.1)'
  }]
})

const categoryChartData = ref({
  labels: [],
  datasets: [{
    label: 'Ангилал',
    data: [],
    backgroundColor: [
      '#4F46E5',
      '#7C3AED',
      '#EC4899',
      '#F59E0B',
      '#10B981'
    ],
    borderWidth: 1,
    borderColor: 'transparent'
  }]
})

// Animated stats using useTransition
const animatedStats = computed(() => ({
  published: Math.round(useTransition(rawStats.value.total.published).value),
  today: Math.round(useTransition(rawStats.value.total.today).value),
  views: Math.round(useTransition(rawStats.value.total.views).value)
}))

// Color mode for chart themes
const colorMode = ref('light')

// Chart options with proper typing
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: window.innerWidth < 640 ? 1 : 2,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: colorMode.value === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      },
      ticks: {
        color: colorMode.value === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#4B5563',
        font: {
          size: 12
        }
      }
    },
    x: {
      grid: {
        color: colorMode.value === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      },
      ticks: {
        color: colorMode.value === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#4B5563',
        font: {
          size: 12
        },
        maxRotation: 45,
        minRotation: 45
      }
    }
  },
  plugins: {
    title: {
      display: true,
      position: 'top' as const,
      labels: {
        color: colorMode.value === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#4B5563',
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: colorMode.value === 'dark' ? '#374151' : 'rgba(255, 255, 255, 0.9)',
      titleColor: colorMode.value === 'dark' ? '#fff' : '#000',
      bodyColor: colorMode.value === 'dark' ? '#fff' : '#000',
      borderColor: colorMode.value === 'dark' ? '#4B5563' : '#E5E7EB',
      borderWidth: 1
    },
    legend: {
      position: 'bottom' as const,
      labels: {
        color: colorMode.value === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#4B5563',
        font: {
          size: 12
        },
        padding: 20
      }
    }
  }
}))

const doughnutOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: colorMode.value === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#4B5563',
        font: {
          size: 12
        },
        padding: 20
      }
    }
  },
  cutout: '60%',
  animation: {
    animateScale: true,
    animateRotate: true
  }
}))

// Format date and time
const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleString('mn-MN', { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Modified fetchDashboardStats to properly handle chart data
const fetchDashboardStats = async () => {
  loading.value = true
  try {
    const oldStats = { ...rawStats.value.total }

    // Fetch published articles count
    const { count: publishedCount, error: publishedError } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)

    if (!publishedError) {
      rawStats.value.total.published = publishedCount || 0
      statsChange.value.published = rawStats.value.total.published - oldStats.published
    }

    // Fetch today's articles count
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { count: todayCount, error: todayError } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)
      .gte('published_at', today.toISOString())

    if (!todayError) {
      rawStats.value.total.today = todayCount || 0
      statsChange.value.today = rawStats.value.total.today - oldStats.today
    }

    // Fetch total views
    const { data: viewsData, error: viewsError } = await supabase
      .from('news')
      .select('views, published_at')
      .not('views', 'is', null)
      .order('published_at', { ascending: true })

    console.log('Raw views data:', viewsData)

    // Process views chart data
    if (viewsData && viewsData.length > 0) {
      const groupedData = viewsData.reduce((acc, item) => {
        if (!item.published_at) return acc  // Only check for valid date
        const date = new Date(item.published_at).toISOString().split('T')[0]
        acc[date] = (acc[date] || 0) + (Number(item.views) || 0)  // Convert to number and handle null/undefined
        return acc
      }, {})

      console.log('Grouped data:', groupedData)

      // Get unique dates (some articles have same publish date)
      const sortedDates = [...new Set(Object.keys(groupedData))].sort((a, b) => 
        new Date(a).getTime() - new Date(b).getTime()
      )

      console.log('Sorted dates:', sortedDates)

      if (sortedDates.length > 0) {
        viewsChartData.value = {
          labels: sortedDates.map(date => {
            const [year, month, day] = date.split('-')
            return `${month}/${day}`
          }),
          datasets: [{
            label: 'Үзэлт',
            data: sortedDates.map(date => groupedData[date]),
            fill: true,  // Changed to true for better visibility
            borderColor: '#4F46E5',
            tension: 0.1,
            backgroundColor: 'rgba(79, 70, 229, 0.1)'
          }]
        }
        console.log('Chart data:', viewsChartData.value)
      }
    }

    // Fetch top articles
    const { data: topData, error: topError } = await supabase
      .from('news')
      .select(`
        id,
        title,
        views,
        published_at
      `)
      .eq('is_published', true)
      .order('views', { ascending: false })
      .limit(5)

    if (!topError && topData) {
      topArticles.value = topData
    }

    // Fetch categories with counts
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name')

    if (!catError && categories) {
      const categoryPromises = categories.map(async (category) => {
        const { count, error } = await supabase
          .from('news')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id)
          .eq('is_published', true)

        return {
          category: { name: category.name },
          count: count || 0
        }
      })

      categoryStats.value = await Promise.all(categoryPromises)

      console.log('Category stats:', categoryStats.value)

      // Update category chart
      if (categoryStats.value.length > 0) {
        categoryChartData.value = {
          labels: categoryStats.value.map(cat => cat.category.name),
          datasets: [{
            label: 'Ангилал',
            data: categoryStats.value.map(cat => cat.count),
            backgroundColor: [
              '#4F46E5',
              '#7C3AED',
              '#EC4899',
              '#F59E0B',
              '#10B981'
            ],
            borderWidth: 1,
            borderColor: 'transparent'
          }]
        }
        console.log('Category chart data:', categoryChartData.value)
      }
    }

    // Fetch recent articles
    const { data: recentData, error: recentError } = await supabase
      .from('news')
      .select(`
        id,
        title,
        published_at,
        category:categories(name)
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(5)

    if (!recentError && recentData) {
      recentArticles.value = recentData
    }

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
  } finally {
    loading.value = false
  }
}

// Fetch stats every minute
useIntervalFn(async () => {
  await fetchDashboardStats()
}, 60000)

// Start fetching data
onMounted(() => {
  fetchDashboardStats()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
