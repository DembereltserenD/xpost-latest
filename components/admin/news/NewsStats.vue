<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
    <!-- Total News -->
    <div class="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Нийт мэдээ</p>
          <p class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ totalCount }}</p>
        </div>
      </div>
    </div>

    <!-- Draft News -->
    <div class="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
          <svg class="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Ноорог</p>
          <p class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ draftCount }}</p>
        </div>
      </div>
    </div>

    <!-- Today's News -->
    <div class="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Өнөөдөр</p>
          <p class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{{ todayCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  totalCount: number
  draftCount: number
  todayCount: number
}

defineProps<Props>()
</script>