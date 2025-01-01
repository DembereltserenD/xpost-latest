<template>
  <div class="home-page">
    <section class="featured-news py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="i in 6" :key="i" class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <PlaceholderImage />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">Featured Article Title</h3>
              <p class="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <div class="flex justify-between items-center text-sm text-gray-500">
                <span>Category</span>
                <span>5 min read</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="latest-news bg-gray-100 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8">Latest News</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article v-for="i in 4" :key="i" class="flex bg-white rounded-lg shadow-md overflow-hidden">
            <div class="w-1/3">
              <PlaceholderImage />
            </div>
            <div class="w-2/3 p-4">
              <h3 class="text-lg font-semibold mb-2">Latest News Title</h3>
              <p class="text-gray-600 text-sm mb-2">
                Brief description of the latest news article...
              </p>
              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>Category</span>
                <span>3 min read</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PlaceholderImage from './PlaceholderImage.vue'
</script>

<style scoped>
.home-page {
  @apply min-h-[calc(100vh-var(--header-height))];
}
</style>