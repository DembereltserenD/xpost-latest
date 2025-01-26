<template>
  <div class="container-custom py-8">
    <h1 class="text-2xl font-bold mb-6">Улс төр</h1>
    <NewsGrid />
  </div>
</template>

<script setup lang="ts">
import NewsGrid from '~/components/NewsGrid.vue'

definePageMeta({
  ssr: true  // Enable SSR for better SEO on news content
})
</script>