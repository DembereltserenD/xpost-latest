<template>
  <div class="container-custom py-8">
    <!-- Category Header -->
    <section v-if="!error && category" class="mb-12">
      <h1 class="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {{ category.name }}
      </h1>
      <p v-if="category.description" class="text-gray-600 dark:text-gray-400">
        {{ category.description }}
      </p>
    </section>

    <!-- Error Message -->
    <section v-if="error" class="mb-12">
      <div class="text-center text-red-600 dark:text-red-400">
        {{ error }}
      </div>
    </section>

    <!-- Articles -->
    <section>
      <NewsGrid 
        :articles="articles"
        :loading="loading"
        :has-more="hasMore"
        @load-more="loadMore"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSupabaseClient } from '#imports'

definePageMeta({
  ssr: false  // Enable CSR for this page
})

const route = useRoute()
const supabase = useSupabaseClient()

const category = ref<any>(null)
const articles = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const page = ref(1)
const hasMore = ref(true)
const itemsPerPage = 9

const fetchCategory = async () => {
  try {
    const { data, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', route.params.slug)
      .single()

    if (categoryError) throw categoryError
    category.value = data
  } catch (err: any) {
    console.error('Error fetching category:', err)
    error.value = 'Category not found'
    throw err
  }
}

const fetchArticles = async (isLoadMore = false) => {
  if (loading.value) return
  loading.value = true
  error.value = null

  try {
    const from = (page.value - 1) * itemsPerPage
    const to = from + itemsPerPage - 1

    const { data, error: articlesError } = await supabase
      .from('news')
      .select('*, category:categories(*)')
      .eq('category_id', category.value?.id)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(from, to)

    if (articlesError) throw articlesError

    const processedArticles = data.map((article: any) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      short_id: article.short_id,
      excerpt: article.excerpt,
      featured_image: article.featured_image,
      category: article.category,
      published_at: article.published_at
    }))

    if (isLoadMore) {
      articles.value.push(...processedArticles)
    } else {
      articles.value = processedArticles
    }

    hasMore.value = data.length === itemsPerPage
  } catch (err: any) {
    console.error('Error fetching articles:', err)
    error.value = 'Failed to load articles'
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
    await fetchCategory()
    await fetchArticles()
  } catch (err) {
    // Category not found error is already handled
  }
})
</script>
