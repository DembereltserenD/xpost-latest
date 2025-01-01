<template>
  <section v-if="articles && articles.length > 0" class="featured-news py-4">
    <h2 class="text-3xl font-bold mb-6">Онцлох мэдээ</h2>
    <div class="featured-grid">
      <!-- Main Featured Article -->
      <article :key="articles[0].id" class="featured-article large-article bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-[1.02] group">
        <NuxtLink :to="`/news/${articles[0].slug}`" class="block h-full">
          <div class="grid md:grid-cols-2 gap-4 h-full">
            <!-- Text Content -->
            <div class="p-4 pt-2 flex flex-col justify-between content">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">{{ articles[0].category }}</span>
                  <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock class="w-4 h-4 mr-1" />
                    <span>{{ getTimeAgo(articles[0].created_at) }}</span>
                  </div>
                </div>
                <h3 class="text-gray-900 dark:text-white text-2xl font-bold mb-3">{{ articles[0].title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 text-base line-clamp-4 mb-4">{{ articles[0].excerpt }}</p>
              </div>
              <!-- Social Interactions -->
              <div class="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button 
                  @click.prevent="toggleLike(articles[0])"
                  class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
                >
                  <Heart :class="{ 'fill-red-500 stroke-red-500': articles[0].liked }" class="w-5 h-5" />
                  <span class="text-sm">{{ articles[0].likes || 0 }}</span>
                </button>
                <button class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200">
                  <MessageCircle class="w-5 h-5" />
                  <span class="text-sm">{{ articles[0].comments || 0 }}</span>
                </button>
                <button @click.prevent="shareArticle(articles[0])" class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-all duration-200">
                  <Share2 class="w-5 h-5" />
                  <span class="text-sm">{{ articles[0].shares || 0 }}</span>
                </button>
              </div>
            </div>
            <!-- Image -->
            <div v-if="articles[0].image" class="relative h-48 md:h-full">
              <img 
                :src="articles[0].image" 
                :alt="articles[0].title"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
                <span class="text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-medium">
                  Цааш унших
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </article>

      <!-- Other Featured Articles -->
      <div class="small-articles-grid">
        <article 
          v-for="article in articles.slice(1, 4)" 
          :key="article.id" 
          class="featured-article small-article bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-[1.02] group"
        >
          <NuxtLink :to="`/news/${article.slug}`" class="block">
            <div class="relative h-48">
              <img 
                v-if="article.image"
                :src="article.image" 
                :alt="article.title"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
                <span class="text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-medium">
                  Цааш унших
                </span>
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">{{ article.category }}</span>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock class="w-4 h-4 mr-1" />
                  <span>{{ getTimeAgo(article.created_at) }}</span>
                </div>
              </div>
              <h3 class="text-gray-900 dark:text-white font-semibold mb-2 line-clamp-2">{{ article.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">{{ article.excerpt }}</p>
              <!-- Social Interactions -->
              <div class="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button 
                  @click.prevent="toggleLike(article)"
                  class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
                >
                  <Heart :class="{ 'fill-red-500 stroke-red-500': article.liked }" class="w-5 h-5" />
                  <span class="text-sm">{{ article.likes || 0 }}</span>
                </button>
                <button class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200">
                  <MessageCircle class="w-5 h-5" />
                  <span class="text-sm">{{ article.comments || 0 }}</span>
                </button>
                <button @click.prevent="shareArticle(article)" class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-all duration-200">
                  <Share2 class="w-5 h-5" />
                  <span class="text-sm">{{ article.shares || 0 }}</span>
                </button>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Heart, MessageCircle, Share2, Clock, ChevronRight } from 'lucide-vue-next';
import type { Article } from '~/stores/news';

const props = defineProps<{
  articles: Article[]
}>();

const getTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffTime = Math.abs(now.getTime() - past.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Өчигдөр';
  if (diffDays < 7) return `${diffDays} өдрийн өмнө`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} долоо хоногийн өмнө`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} сарын өмнө`;
  return `${Math.floor(diffDays / 365)} жилийн өмнө`;
};

const toggleLike = (article: Article) => {
  // Implement like functionality
  article.liked = !article.liked;
  article.likes = (article.likes || 0) + (article.liked ? 1 : -1);
};

const shareArticle = async (article: Article) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.origin + '/news/' + article.slug
      });
      article.shares = (article.shares || 0) + 1;
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    // Fallback for browsers that don't support Web Share API
    const url = window.location.origin + '/news/' + article.slug;
    navigator.clipboard.writeText(url);
    // You might want to show a tooltip or notification here
  }
};
</script>

<style scoped>
.featured-news {
  @apply max-w-7xl mx-auto px-4;
}

.featured-grid {
  @apply grid gap-6;
}

.large-article {
  @apply col-span-full min-h-[320px];
}

.small-articles-grid {
  @apply grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3;
}

.featured-article {
  @apply overflow-hidden;
}

.content {
  @apply h-full;
}

/* Dark mode styles */
:deep(.dark) {
  .featured-article {
    @apply bg-gray-800;
  }
  
  h3 {
    @apply text-white;
  }
  
  p {
    @apply text-gray-300;
  }
}
</style>