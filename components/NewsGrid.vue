<template>
  <div class="news-grid">
    <div v-if="newsStore.latestArticles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div v-for="article in newsStore.latestArticles" :key="article.id" class="bg-gray-800 rounded-lg overflow-hidden">
        <NuxtLink :to="`/news/${article.id}`" class="block">
          <div class="relative h-[200px] sm:h-[250px] lg:h-[300px]">
            <img 
              :src="article.featured_image" 
              :alt="article.title" 
              class="w-full h-full object-cover"
              loading="lazy"
              @error="handleImageError"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            <div v-if="article.category?.name" class="absolute top-3 left-3">
              <span class="px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
                {{ article.category?.name }}
              </span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <h3 class="text-base md:text-lg font-semibold text-white line-clamp-2">
                {{ article.title }}
              </h3>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="newsStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div v-for="i in 6" :key="i" class="h-[200px] sm:h-[250px] lg:h-[300px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-6 md:py-8">
      <p class="text-sm md:text-base text-gray-500 dark:text-gray-400">No articles available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNewsStore } from '~/stores/news';

const newsStore = useNewsStore();

onMounted(() => {
  newsStore.init();
});

const defaultImage = '/placeholder-image.svg';

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  if (img.src !== defaultImage) {
    img.src = defaultImage;
  }
};

// Pre-load the default image
if (typeof window !== 'undefined') {
  const img = new Image();
  img.src = defaultImage;
}
</script>

<style scoped>
.news-grid {
  @apply mb-8 md:mb-12;
}
</style>