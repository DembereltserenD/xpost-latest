<template>
  <div class="container-custom py-8">
    <!-- Error Message -->
    <section v-if="error" class="mb-12">
      <div class="text-center text-red-600 dark:text-red-400">
        {{ error }}
      </div>
    </section>

    <!-- User Profile -->
    <section v-if="!error && user" class="mb-12">
      <div class="flex items-center space-x-6 mb-6">
        <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          <img 
            v-if="user.avatar_url" 
            :src="user.avatar_url" 
            :alt="user.full_name || user.username"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600">
            <span class="text-2xl font-bold">{{ (user.full_name || user.username || '').charAt(0).toUpperCase() }}</span>
          </div>
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ user.full_name || user.username }}
          </h1>
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-3">
            <span>
              Member since <span class="font-semibold">{{ formatDate(user.created_at) }}</span>
            </span>
            <span>
              Last updated <span class="font-semibold">{{ formatDate(user.updated_at) }}</span>
            </span>
          </div>
          <div class="flex items-center text-sm">
            <span class="px-3 py-1 rounded-full" :class="user.is_admin ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'">
              {{ user.is_admin ? 'Admin' : 'Editor' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- User's Activity -->
    <section v-if="!error && user" class="space-y-6">
      <div>
        <h2 class="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Activity History
        </h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold">News Articles ({{ totalArticles }})</h3>
            </div>
          </div>
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div v-for="article in articles" :key="article.id" class="p-4">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ article.title }}</h4>
                  <div class="mt-1 text-sm text-gray-500 space-x-4">
                    <span>Created: {{ formatDate(article.created_at) }}</span>
                    <span>Updated: {{ formatDate(article.updated_at) }}</span>
                  </div>
                </div>
                <NuxtLink 
                  :to="`/admin/news/${article.id}`"
                  class="px-3 py-1 text-sm bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100"
                >
                  View
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-if="loading" class="p-4 text-center text-gray-500">
            Loading...
          </div>
          <div v-if="hasMore && !loading" class="p-4 text-center">
            <button 
              @click="loadMore" 
              class="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSupabaseClient } from '#imports'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const user = ref<any>(null)
const articles = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const page = ref(1)
const hasMore = ref(true)
const totalArticles = ref(0)
const itemsPerPage = 10

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchUser = async () => {
  try {
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', route.params.username)
      .single()

    if (userError) throw userError
    if (!userData) throw new Error('User not found')
    
    user.value = userData

    // Get total articles count
    const { count, error: countError } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userData.id)

    if (countError) throw countError
    totalArticles.value = count || 0
  } catch (err: any) {
    error.value = err.message
    router.push('/admin/users')
  }
}

const fetchArticles = async (isLoadMore = false) => {
  if (loading.value) return
  
  try {
    loading.value = true
    
    if (!isLoadMore) {
      page.value = 1
      articles.value = []
    }

    const { data, error: articlesError } = await supabase
      .from('news')
      .select(`
        id,
        title,
        created_at,
        updated_at
      `)
      .eq('author_id', user.value.id)
      .order('created_at', { ascending: false })
      .range((page.value - 1) * itemsPerPage, page.value * itemsPerPage - 1)

    if (articlesError) throw articlesError

    articles.value = isLoadMore ? [...articles.value, ...data] : data
    hasMore.value = data.length === itemsPerPage
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const loadMore = async () => {
  page.value++
  await fetchArticles(true)
}

onMounted(async () => {
  try {
    await fetchUser()
    await fetchArticles()
  } catch (err: any) {
    error.value = err.message
  }
})
</script>
