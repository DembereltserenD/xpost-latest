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
                  {{ stats.totalArticles }}
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
            <div class="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
              <EyeIcon class="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Нийт үзэлт
              </dt>
              <dd class="mt-1 flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ stats.totalViews }}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- Total Categories -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6" :class="{ 'animate-pulse': loading }">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
              <FolderIcon class="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Ангилал
              </dt>
              <dd class="mt-1 flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ stats.totalCategories }}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
      <!-- Views Over Time Chart -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6 h-[350px]">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Үзэлтийн график</h2>
        <div class="h-[280px]">
          <LineChart
            v-if="viewsChartData"
            :data="viewsChartData"
            :options="viewsChartOptions"
          />
        </div>
      </div>

      <!-- Categories Distribution Chart -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6 h-[350px]">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Ангиллын хуваарилалт</h2>
        <div class="h-[280px]">
          <DoughnutChart
            v-if="categoryChartData"
            :data="categoryChartData"
            :options="categoryChartOptions"
          />
        </div>
      </div>
    </div>

    <!-- Latest Activity Section -->
    <div class="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
      <!-- Most Viewed Articles -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Хамгийн их үзэлттэй</h2>
        <div class="mt-3 sm:mt-4 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table class="min-w-full">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-0">
                      Гарчиг
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-200">
                      Үзэлт
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="article in stats.mostViewedArticles" :key="article.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="font-medium text-gray-900 dark:text-gray-200">{{ article.title }}</div>
                          <div class="text-gray-500 dark:text-gray-400">{{ formatDateTime(article.created_at) }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 dark:text-gray-400">
                      {{ article.views }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Articles -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Сүүлд нэмэгдсэн</h2>
        <div class="mt-3 sm:mt-4 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table class="min-w-full">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-0">
                      Гарчиг
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-200">
                      Огноо
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="article in stats.recentArticles" :key="article.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="font-medium text-gray-900 dark:text-gray-200">{{ article.title }}</div>
                          <div class="text-gray-500 dark:text-gray-400">{{ article.category?.name || 'Ангилалгүй' }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 dark:text-gray-400">
                      {{ formatDateTime(article.created_at) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSupabaseClient } from '#imports'
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
import { useIntervalFn } from '@vueuse/core'
import {
  DocumentTextIcon,
  EyeIcon,
  FolderIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

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

const supabase = useSupabaseClient()
const loading = ref(false)
const error = ref<string | null>(null)

// Stats data
const stats = ref({
  totalArticles: 0,
  totalViews: 0,
  totalCategories: 0,
  mostViewedArticles: [],
  recentArticles: [],
  viewsOverTime: [],
  categoryDistribution: []
})

// User email from session
const userEmail = ref('')

// Chart data
const viewsChartData = ref(null)
const categoryChartData = ref(null)

// Chart options
const viewsChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: true
    }
  }
}

const categoryChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right'
    }
  }
}

// Format date and time
const formatDateTime = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Modified fetchDashboardStats to properly handle chart data
const fetchDashboardStats = async () => {
  try {
    loading.value = true
    error.value = null

    // Get user email from session
    const { data: { session } } = await supabase.auth.getSession()
    userEmail.value = session?.user?.email || ''

    // Fetch total articles count
    const { count: articlesCount } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })

    // Fetch total views
    const { data: viewsData } = await supabase
      .from('news')
      .select('views')
    const totalViews = viewsData?.reduce((sum, article) => sum + (article.views || 0), 0)

    // Fetch total categories
    const { count: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })

    // Fetch most viewed articles
    const { data: mostViewed } = await supabase
      .from('news')
      .select('id, title, views, created_at')
      .order('views', { ascending: false })
      .limit(5)

    // Fetch recent articles
    const { data: recent } = await supabase
      .from('news')
      .select('id, title, created_at, category:categories(name)')
      .order('created_at', { ascending: false })
      .limit(5)

    // Fetch views over time (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const { data: viewsOverTime } = await supabase
      .from('news')
      .select('created_at, views')
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at')

    // Fetch category distribution
    const { data: categories } = await supabase
      .from('news')
      .select('category:categories(name)')

    // Process views over time data for chart
    const viewsByDay = {}
    viewsOverTime?.forEach(item => {
      const date = new Date(item.created_at).toLocaleDateString()
      viewsByDay[date] = (viewsByDay[date] || 0) + (item.views || 0)
    })

    viewsChartData.value = {
      labels: Object.keys(viewsByDay),
      datasets: [{
        label: 'Үзэлт',
        data: Object.values(viewsByDay),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    }

    // Process category distribution data for chart
    const categoryCount = {}
    categories?.forEach(item => {
      const categoryName = item.category?.name || 'Ангилалгүй'
      categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1
    })

    categoryChartData.value = {
      labels: Object.keys(categoryCount),
      datasets: [{
        data: Object.values(categoryCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ]
      }]
    }

    // Update stats
    stats.value = {
      totalArticles: articlesCount || 0,
      totalViews: totalViews || 0,
      totalCategories: categoriesCount || 0,
      mostViewedArticles: mostViewed || [],
      recentArticles: recent || [],
      viewsOverTime: viewsOverTime || [],
      categoryDistribution: categories || []
    }

  } catch (err) {
    console.error('Error fetching dashboard stats:', err)
    error.value = err instanceof Error ? err.message : 'Статистик мэдээлэл авахад алдаа гарлаа'
  } finally {
    loading.value = false
  }
}

// Fetch stats every minute
useIntervalFn(async () => {
  await fetchDashboardStats()
}, 60000)

// Initial fetch
onMounted(() => {
  fetchDashboardStats()
})
</script>