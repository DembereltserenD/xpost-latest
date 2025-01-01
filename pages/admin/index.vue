<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Хянах самбар</h1>
    
    <!-- Dashboard Statistics -->
    <DashboardStats />

    <!-- Recent News -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Сүүлийн мэдээнүүд</h2>
        <NuxtLink
          to="/admin/news/create"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          + Шинэ мэдээ
        </NuxtLink>
      </div>
      
      <div class="space-y-4">
        <div v-for="item in news" :key="item.id" class="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-gray-900 dark:text-white">{{ item.title }}</h3>
            <div class="flex items-center gap-2">
              <button
                @click="toggleFeatured(item.id, !item.is_featured)"
                class="px-3 py-1 text-sm rounded-full"
                :class="item.is_featured ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
              >
                {{ item.is_featured ? 'Онцлох' : 'Энгийн' }}
              </button>
              <button
                @click="deleteNews(item.id)"
                class="text-red-600 dark:text-red-400 text-sm hover:text-red-800 dark:hover:text-red-300"
              >
                Устгах
              </button>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mt-2">{{ item.summary }}</p>
          <div class="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{{ new Date(item.created_at).toLocaleDateString('mn-MN') }}</span>
            <span>{{ item.category?.name || 'Ангилалгүй' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import DashboardStats from '~/components/admin/DashboardStats.vue'

const config = useRuntimeConfig()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

interface News {
  id: string
  title: string
  content: string
  summary: string
  category: {
    id: string
    name: string
  } | null
  is_featured: boolean
  created_at: string
}

const news = ref<News[]>([])

// Fetch recent news
const fetchNews = async () => {
  try {
    console.log('Fetching news...')
    const { data, error } = await supabase
      .from('news')
      .select(`
        id,
        title,
        content,
        summary,
        is_featured,
        created_at,
        category:category_id (
          id,
          name
        )
      `)
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    console.log('Fetched news:', data)
    news.value = data || []
  } catch (err) {
    console.error('Error details:', err)
    alert(`Мэдээ ачаалахад алдаа гарлаа: ${err.message}`)
  }
}

// Toggle featured status
const toggleFeatured = async (id: string, featured: boolean) => {
  try {
    const { error } = await supabase
      .from('news')
      .update({ is_featured: featured })
      .eq('id', id)

    if (error) throw error
    await fetchNews()
  } catch (err) {
    console.error('Error updating news:', err)
    alert('Мэдээ шинэчлэхэд алдаа гарлаа')
  }
}

// Delete news
const deleteNews = async (id: string) => {
  if (!confirm('Энэ мэдээг устгахдаа итгэлтэй байна уу?')) return

  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) throw error
    await fetchNews()
  } catch (err) {
    console.error('Error deleting news:', err)
    alert('Мэдээ устгахад алдаа гарлаа')
  }
}

onMounted(() => {
  fetchNews()
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})
</script>
