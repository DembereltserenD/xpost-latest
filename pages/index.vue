<template>
  <div class="py-8">
    <main>
      <!-- Featured News Section - Full Width -->
      <section class="featured-section mb-12">
        <div class="container-custom">
          <FeaturedNews />
        </div>
      </section>
      
      <!-- Error Message -->
      <section v-if="error" class="mb-12">
        <div class="container-custom">
          <div class="text-center text-red-600 dark:text-red-400">
            {{ error }}
          </div>
        </div>
      </section>
      
      <!-- Latest News with Sidebar -->
      <section class="latest-news-section">
        <div class="container-custom">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Latest News -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-2 mb-4">
                <Clock class="h-5 w-5" />
                <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Сүүлийн үеийн мэдээ
                </h2>
              </div>
              
              <NewsGrid 
                :articles="latestPosts" 
                :loading="loading"
                :has-more="hasMore"
                @load-more="fetchMorePosts"
              />
              
              <!-- Load More Button -->
              <div v-if="hasMore" class="mt-8 text-center lg:mr-8">
                <button
                  @click="fetchMorePosts"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  :disabled="loading"
                >
                  <span v-if="loading">Уншиж байна...</span>
                  <span v-else>Цааш үзэх</span>
                </button>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:w-[350px] shrink-0 lg:border-l lg:border-gray-200 dark:lg:border-gray-800 lg:pl-8">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Clock } from 'lucide-vue-next'
import { useNewsStore } from '~/stores/news'

const newsStore = useNewsStore()

// Use computed properties to access store state
const loading = computed(() => newsStore.loading)
const error = computed(() => newsStore.error)
const latestPosts = computed(() => newsStore.latestArticles)
const hasMore = computed(() => newsStore.hasMore)

// Load more posts
const fetchMorePosts = async () => {
  await newsStore.loadMore()
}

onMounted(async () => {
  await newsStore.init()
})
</script>