<template>
  <div class="min-h-screen bg-[#15202b]">
    <div class="flex min-h-screen">
      <!-- Left side - Logo/Branding -->
      <div class="hidden lg:flex lg:w-1/2 bg-[#1d2935] items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
        <div class="relative z-10 p-12 text-center">
          <!-- Logo -->
          <div class="mb-8">
            <h1 class="text-4xl font-bold text-white">
              <span class="text-blue-500">X</span>post.mn
            </h1>
          </div>
          <h2 class="text-3xl font-bold text-white mb-4">Тавтай морил</h2>
          <p class="text-gray-300 text-lg">Таны мэдээллийн найдвартай эх сурвалж</p>
        </div>
      </div>
      
      <!-- Right side - Content -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
        <main class="w-full max-w-md">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>

<style>
/* Ensure the layout takes full height */
html, body {
  height: 100%;
  margin: 0;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1d2935;
}

::-webkit-scrollbar-thumb {
  background: #2d3b48;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #34404d;
}
</style>
