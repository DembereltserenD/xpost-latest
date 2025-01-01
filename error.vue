<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}
      </h1>
      <p class="text-gray-600 mb-6">
        {{ error?.message || 'Something went wrong' }}
      </p>
      <button
        @click="handleError"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useError, clearError } from '#imports'

const error = useError()

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>