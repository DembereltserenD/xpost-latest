<template>
  <div class="container-custom">
    <!-- Featured News Section -->
    <section class="py-8">
      <h2 class="text-2xl font-bold mb-6">Онцлох мэдээ</h2>
      <FeaturedNews 
        :articles="newsStore.featuredArticles" 
        v-if="!loading && newsStore.featuredArticles.length > 0"
      />
      <div v-else-if="loading" class="grid gap-4 md:grid-cols-2">
        <SkeletonLoader v-for="i in 4" :key="`featured-skeleton-${i}`" />
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="py-8">
      <h2 class="text-2xl font-bold mb-6">Сүүлийн үеийн мэдээ</h2>
      <NewsGrid 
        :articles="newsStore.latestArticles"
        v-if="!loading && newsStore.latestArticles.length > 0"
      />
      <div v-else-if="loading" class="grid gap-4 md:grid-cols-2">
        <SkeletonLoader v-for="i in 6" :key="`latest-skeleton-${i}`" />
      </div>

      <!-- Load More Button -->
      <div class="mt-8 text-center" v-if="newsStore.hasMore">
        <button
          @click="newsStore.loadMore"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          :disabled="loading"
        >
          {{ loading ? 'Уншиж байна...' : 'Цааш үзэх' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'
import FeaturedNews from '@/components/FeaturedNews.vue'
import NewsGrid from '@/components/NewsGrid.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

const loading = ref(true)
const error = ref<string | null>(null)
const newsStore = useNewsStore()

onMounted(async () => {
  try {
    await newsStore.initialize()
  } catch (err) {
    error.value = 'Failed to load news'
    console.error('Error loading news:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home-page {
  @apply space-y-8;
}
</style>