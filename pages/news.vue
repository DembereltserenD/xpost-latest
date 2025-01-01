<template>
  <div class="index-page">
    <FeaturedNews 
      :articles="featuredArticles" 
      v-if="!isLoading && featuredArticles.length > 0"
    />
    
    <section class="latest-articles">
      <h2 class="section-title">
        <Clock class="section-icon" />
        Сүүлийн үеийн мэдээ
      </h2>
      
      <ArticleList 
        :articles="articles"
        :is-loading="isLoading"
        :error="error"
        :has-more-articles="hasMoreArticles"
        @load-more="loadMore"
        @retry="fetchArticles"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNewsStore } from '~/stores/news'
import { Clock } from 'lucide-vue-next'

const newsStore = useNewsStore()
const isLoading = ref(true)
const error = ref<string | null>(null)

const articles = ref(newsStore.articles)
const featuredArticles = ref(newsStore.getFeaturedArticles)
const hasMoreArticles = ref(true)

const fetchArticles = async () => {
  try {
    await newsStore.fetchArticles()
    articles.value = newsStore.articles
    featuredArticles.value = newsStore.getFeaturedArticles
    hasMoreArticles.value = newsStore.hasMoreArticles
    error.value = null
  } catch (e) {
    error.value = 'Failed to fetch articles'
  } finally {
    isLoading.value = false
  }
}

const loadMore = async () => {
  if (!hasMoreArticles.value) return
  
  try {
    await newsStore.fetchArticles(newsStore.currentPage + 1)
    articles.value = [...articles.value, ...newsStore.articles]
    hasMoreArticles.value = newsStore.hasMoreArticles
  } catch (e) {
    error.value = 'Failed to load more articles'
  }
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.index-page {
  @apply space-y-12 py-8;
}

.latest-articles {
  @apply space-y-6;
}

.section-title {
  @apply flex items-center gap-2 text-2xl font-bold text-white;
}

.section-icon {
  @apply w-6 h-6 text-blue-400;
}

@media (max-width: 768px) {
  .index-page {
    @apply space-y-8 py-6;
  }

  .section-title {
    @apply text-xl;
  }
}
</style>
