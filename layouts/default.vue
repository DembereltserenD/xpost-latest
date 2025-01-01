<template>
  <div class="min-h-screen dark:bg-gradient-to-b from-gray-950 to-gray-900 text-black dark:text-white">
    <div class="container py-8">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<style>
.container {
  @apply mx-auto px-4 max-w-7xl;
}
</style>