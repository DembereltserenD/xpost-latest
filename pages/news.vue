<template>
  <div class="container-custom py-8">
    <!-- Featured Articles -->
    <section v-if="!error && newsStore.featuredArticles.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Онцлох мэдээ</h2>
      <FeaturedNews :articles="newsStore.featuredArticles" />
    </section>

    <!-- Error Message -->
    <section v-if="error" class="mb-12">
      <div class="text-center text-red-600 dark:text-red-400">
        {{ error }}
      </div>
    </section>

    <!-- Latest Articles -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Сүүлийн мэдээ</h2>
      <NewsGrid 
        :articles="newsStore.latestArticles"
        :loading="loading"
        :has-more="newsStore.hasMore"
        @load-more="newsStore.loadMore"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNewsStore } from '~/stores/news'

definePageMeta({
  ssr: false  // Enable CSR for this page
})

const newsStore = useNewsStore()
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      newsStore.fetchLatestArticles(),
      newsStore.fetchFeaturedArticles()
    ])
  } catch (err) {
    console.error('Error loading articles:', err)
    error.value = 'Failed to load articles'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container-custom {
  @apply space-y-12 py-8;
}

@media (max-width: 768px) {
  .container-custom {
    @apply space-y-8 py-6;
  }
}
</style>
