<template>
  <div class="featured-news">
    <div v-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <!-- Main featured article (position 0) -->
      <div class="md:col-span-2 featured-article">
        <NuxtLink :to="`/news/${mainArticle.id}`" class="block" v-if="mainArticle">
          <div class="relative overflow-hidden rounded-lg bg-gray-800">
            <div class="relative aspect-video md:h-[482.5px]">
              <img 
                :src="mainArticle.featured_image" 
                :alt="mainArticle.title" 
                class="w-full h-full object-cover"
                loading="eager"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div v-if="mainArticle.category?.name" class="mb-2 md:mb-4">
                  <span class="px-2 py-1 text-xs md:text-sm font-medium bg-red-500 text-white rounded-full">
                    {{ mainArticle.category?.name }}
                  </span>
                </div>
                <h2 class="text-lg md:text-2xl font-bold text-white mb-2">
                  {{ mainArticle.title }}
                </h2>
                <p v-if="mainArticle.excerpt" class="hidden md:block text-gray-200 text-sm">
                  {{ mainArticle.excerpt }}
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Smaller featured articles (positions 1-3) -->
      <div class="md:col-span-1" v-if="smallArticles.length > 0">
        <div class="grid grid-cols-1 gap-4">
          <div v-for="article in smallArticles" :key="article.id" class="bg-gray-800 rounded-lg overflow-hidden">
            <NuxtLink :to="`/news/${article.id}`" class="block">
              <div class="relative aspect-video md:h-[150px]">
                <img 
                  :src="article.featured_image" 
                  :alt="article.title" 
                  class="w-full h-full object-cover"
                  loading="lazy"
                  @error="handleImageError"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <div class="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <div v-if="article.category?.name" class="mb-1.5 md:mb-2">
                    <span class="px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
                      {{ article.category?.name }}
                    </span>
                  </div>
                  <h3 class="text-base md:text-lg font-semibold text-white line-clamp-2">
                    {{ article.title }}
                  </h3>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div class="md:col-span-2">
        <div class="aspect-video md:h-[482.5px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
      <div class="md:col-span-1">
        <div class="grid grid-cols-1 gap-4">
          <div v-for="i in 3" :key="i" class="aspect-video md:h-[150px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-6 md:py-8">
      <p class="text-sm md:text-base text-gray-500 dark:text-gray-400">Онцолсон нийтлэл байхгүй</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useNewsStore } from '~/stores/news';
import type { Article } from '~/stores/news';

const newsStore = useNewsStore();
const loading = ref(true);

onMounted(async () => {
  await newsStore.init();
  loading.value = false;
});

const articles = computed(() => newsStore.featuredArticles);

// Compute main article (position 0) and small articles (positions 1-3)
const mainArticle = computed(() => {
  // First try to find position 0
  const position0Article = articles.value.find(a => a.featured_position === 0);
  // If no position 0, use the first featured article
  return position0Article || articles.value[0];
});

const smallArticles = computed(() => {
  if (!mainArticle.value) return [];
  return articles.value
    .filter(a => a.id !== mainArticle.value.id)
    .sort((a, b) => (a.featured_position || 99) - (b.featured_position || 99))
    .slice(0, 3);
});

const defaultImage = '/placeholder-image.svg';

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = defaultImage;
}
</script>

<style scoped>
.featured-news {
  @apply mb-8 md:mb-12;
}

.featured-article,
.smaller-article {
  @apply transition-transform duration-200;
}

.featured-article:hover,
.smaller-article:hover {
  @apply transform-gpu -translate-y-1;
}
</style>