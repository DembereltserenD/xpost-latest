<template>
  <div class="space-y-4">
    <!-- Breaking News Section -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <div class="flex flex-col space-y-1.5 p-4">
        <h3 class="text-2xl font-semibold leading-none tracking-tight line-clamp-1">Онцлох мэдээ</h3>
      </div>
      <div class="p-4 pt-0">
        <div class="space-y-2">
          <div v-for="(news, index) in breakingNews" :key="index" 
               class="flex items-center space-x-2">
            <span class="inline-flex items-center rounded-md bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive ring-1 ring-inset ring-destructive/20 dark:bg-red-900/10 dark:text-red-300">
              Онцлох
            </span>
            <NuxtLink :to="news.link" class="hover:text-primary dark:text-gray-300 dark:hover:text-white line-clamp-1">
              {{ news.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular News Section -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <div class="flex flex-col space-y-1.5 p-4">
        <h3 class="text-2xl font-semibold leading-none tracking-tight line-clamp-1">Тренд мэдээ</h3>
      </div>
      <div class="p-4 pt-0">
        <div class="space-y-4">
          <div v-for="(item, index) in popularNews" :key="index" 
               class="flex items-start space-x-4">
            <img :src="item.image" :alt="item.title" 
                 class="h-16 w-16 rounded-lg object-cover" />
            <div class="space-y-1 flex-1">
              <h4 class="font-medium leading-none hover:text-primary dark:text-gray-300 dark:hover:text-white line-clamp-2">
                <NuxtLink :to="item.link">{{ item.title }}</NuxtLink>
              </h4>
              <div class="flex items-center space-x-2 text-sm text-muted-foreground dark:text-gray-400">
                <span class="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20 dark:bg-gray-700 dark:text-gray-300">
                  {{ item.category }}
                </span>
                <span>{{ formatDate(item.date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Videos Section -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <div class="flex flex-col space-y-1.5 p-4">
        <h3 class="text-2xl font-semibold leading-none tracking-tight line-clamp-1">Саяханы бичлэг</h3>
      </div>
      <div class="p-4 pt-0">
        <div class="space-y-4">
          <div v-for="(video, index) in latestVideos" :key="index" 
               class="space-y-2">
            <div class="relative">
              <img :src="video.thumbnail" :alt="video.title" 
                   class="h-24 w-full rounded-lg object-cover" />
              <span class="absolute bottom-2 right-2 inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20 dark:bg-gray-700 dark:text-gray-300">
                {{ video.duration }}
              </span>
            </div>
            <h4 class="text-sm font-medium hover:text-primary dark:text-gray-300 dark:hover:text-white line-clamp-2">
              <NuxtLink :to="video.link">{{ video.title }}</NuxtLink>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Section -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <div class="flex flex-col space-y-1.5 p-4">
        <h3 class="text-2xl font-semibold leading-none tracking-tight line-clamp-1">Категорууд</h3>
      </div>
      <div class="p-4 pt-0">
        <div class="space-y-1">
          <NuxtLink v-for="(category, index) in categories" :key="index" :to="category.link" 
                    class="inline-flex w-full items-center justify-between rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
            {{ category.name }}
            <span class="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20 dark:bg-gray-700 dark:text-gray-300">
              {{ category.count }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Add new data structures
interface Video {
  title: string;
  thumbnail: string;
  duration: string;
  link: string;
}

interface BreakingNews {
  title: string;
  link: string;
}

interface PopularNews {
  title: string;
  image: string;
  link: string;
  category: string;
  date: string;
}

interface Category {
  name: string;
  link: string;
  count: number;
}

// Add new reactive data
const breakingNews = ref<BreakingNews[]>([
  { title: 'Major Economic Reform Announced', link: '/news/economic-reform' },
  { title: 'New Technology Breakthrough', link: '/news/tech-breakthrough' },
  { title: 'Important Policy Changes', link: '/news/policy-changes' },
])

const popularNews = ref<PopularNews[]>([
  {
    title: 'Global Climate Summit Results',
    image: '/images/news1.jpg',
    link: '/news/climate-summit',
    category: 'World',
    date: '2024-12-11'
  },
  {
    title: 'Tech Industry Trends 2024',
    image: '/images/news2.jpg',
    link: '/news/tech-trends',
    category: 'Technology',
    date: '2024-12-10'
  },
  {
    title: 'Healthcare Innovation Report',
    image: '/images/news3.jpg',
    link: '/news/healthcare',
    category: 'Health',
    date: '2024-12-09'
  }
])

const categories = ref<Category[]>([
  { name: 'Дэлхий', link: '/category/world', count: 145 },
  { name: 'Технологи', link: '/category/technology', count: 98 },
  { name: 'Бизнес', link: '/category/business', count: 67 },
  { name: 'Эрүүл мэнд', link: '/category/health', count: 43 },
  { name: 'Спорт', link: '/category/sports', count: 89 },
  { name: 'Боловсрол', link: '/category/entertainment', count: 76 }
])

const latestVideos = ref<Video[]>([
  {
    title: 'Weekly News Roundup',
    thumbnail: '/images/video1.jpg',
    duration: '5:30',
    link: '/videos/weekly-roundup'
  },
  {
    title: 'Special Report: Climate Change',
    thumbnail: '/images/video2.jpg',
    duration: '8:45',
    link: '/videos/climate-report'
  }
])

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.space-y-4 {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.border {
  border: 1px solid #ddd;
}
.bg-card {
  background-color: #f7f7f7;
}
.text-card-foreground {
  color: #333;
}
.shadow-sm {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>