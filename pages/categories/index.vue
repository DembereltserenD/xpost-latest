<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
      Categories
    </h1>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="`/categories/${category.slug}`"
        class="block group"
      >
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2">
            {{ category.name }}
          </h2>
          <p v-if="category.description" class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ category.description }}
          </p>
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center">
              <span class="font-medium mr-1">{{ category.article_count }}</span>
              articles
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const categories = ref<any[]>([])
const loading = ref(true)

const fetchCategories = async () => {
  try {
    // First get all categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (categoriesError) throw categoriesError

    if (categoriesData) {
      // Then get article counts for each category
      const categoriesWithCounts = await Promise.all(
        categoriesData.map(async (category) => {
          const { count, error: countError } = await supabase
            .from('news')
            .select('id', { count: 'exact', head: true })
            .eq('category_id', category.id)
            .eq('is_published', true)

          if (countError) throw countError

          return {
            ...category,
            article_count: count || 0
          }
        })
      )

      categories.value = categoriesWithCounts
    }
  } catch (err) {
    console.error('Error fetching categories:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchCategories)
</script>
