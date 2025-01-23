<template>
  <div class="container-custom py-8">
    <article v-if="article" class="article-content">
      <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
      <div class="article-meta mb-4">
        <span class="text-gray-600">{{ formatDate(article.created_at) }}</span>
      </div>
      <div class="prose max-w-none" v-html="article.content"></div>
    </article>
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else class="loading">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '~/stores/news'

const route = useRoute()
const newsStore = useNewsStore()
const article = ref(null)
const error = ref(null)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    const slug = route.params.slug as string
    article.value = await newsStore.getArticleBySlug(slug)
  } catch (e) {
    error.value = 'Failed to load article'
  }
})
</script>

<style scoped>
.article-content {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6;
}

.error-message {
  @apply text-red-500 text-center py-8;
}

.loading {
  @apply text-center py-8;
}
</style>
