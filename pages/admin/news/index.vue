<template>
  <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Error Alert -->
    <TransitionGroup name="fade">
      <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
        <strong class="font-bold">Алдаа!</strong>
        <span class="block sm:inline">{{ error }}</span>
        <button @click="error = null" class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </button>
      </div>
    </TransitionGroup>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div class="animate-pulse flex items-center justify-between">
        <div>
          <div class="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="mt-2 h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div class="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      <div class="animate-pulse space-y-4">
        <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div class="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>

    <div v-else>
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Мэдээний жагсаалт</h1>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900 dark:text-white">Нийт мэдээ</p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ stats.total }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900 dark:text-white">Онцлох</p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ stats.featured }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900 dark:text-white">Өнөөдөр</p>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{ stats.today }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters Section -->
      <div class="mb-6 bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <div class="space-y-4">
          <!-- Top Row: Search and New Article -->
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Search Input -->
            <div class="flex-1">
              <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Хайх</label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  id="search"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Гарчиг эсвэл агуулгаар хайх..."
                >
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- New Article Button -->
            <div class="sm:w-48 flex items-end">
              <NuxtLink
                to="/admin/news/create"
                class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Шинэ мэдээ
              </NuxtLink>
            </div>
          </div>

          <!-- Bottom Row: Filters -->
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Category Filter -->
            <div class="sm:w-48">
              <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ангилал</label>
              <select
                v-model="selectedCategory"
                id="category"
                class="block w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Бүгд</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Date Range -->
            <div class="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label for="start-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Эхлэх огноо</label>
                <input
                  v-model="startDate"
                  type="date"
                  id="start-date"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
              </div>
              <div>
                <label for="end-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Дуусах огноо</label>
                <input
                  v-model="endDate"
                  type="date"
                  id="end-date"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
              </div>
            </div>

            <!-- Featured Filter -->
            <div class="sm:w-48 flex items-end">
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  v-model="showFeaturedOnly" 
                  type="checkbox"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Зөвхөн онцлох</span>
              </label>
            </div>

            <!-- Clear Filters -->
            <div class="sm:w-48 flex items-end">
              <button
                @click="clearFilters"
                class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Цэвэрлэх
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured News Management Section -->
      <div v-if="filteredNews.length > 0" class="mb-8 bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex flex-wrap items-center gap-2">
          Онцлох мэдээний удирдлага 
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            (Нийт: {{ featuredCount }}/4)
          </span>
        </h2>
        
        <!-- Featured Articles Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <!-- Main Featured Article -->
          <div class="lg:col-span-2 bg-yellow-50/80 dark:bg-yellow-400/5 p-4 rounded-lg">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">Том онцлох мэдээ</h3>
            <div v-if="mainFeaturedNews" class="relative">
              <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded shadow-sm">
                <div class="flex-1">
                  <span class="text-sm font-medium">{{ mainFeaturedNews.title }}</span>
                  <span class="ml-2 text-xs text-gray-500">(Том)</span>
                </div>
                <button
                  @click="removeFeatured(mainFeaturedNews)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ml-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-else class="text-sm text-gray-500 dark:text-gray-400 text-center p-4 border-2 border-dashed rounded">
              Том онцлох мэдээ сонгоогүй байна
            </div>
          </div>

          <!-- Small Featured Articles -->
          <div class="lg:col-span-2">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">
              Жижиг онцлох мэдээнүүд 
              <span class="text-sm font-normal text-gray-500">
                ({{ smallFeaturedNews.length }}/3)
              </span>
            </h3>
            <div class="space-y-2">
              <TransitionGroup name="list">
                <div
                  v-for="article in smallFeaturedNews"
                  :key="article.id"
                  class="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded shadow-sm"
                >
                  <div class="flex items-center space-x-2 flex-1 min-w-0">
                    <span class="text-sm font-medium truncate">{{ article.title }}</span>
                    <span class="text-xs text-gray-500 flex-shrink-0">
                      (Жижиг {{ article.featured_position }})
                    </span>
                  </div>
                  <div class="flex items-center space-x-2 ml-2">
                    <button
                      v-if="article.featured_position > 1"
                      @click="swapPositions(article, article.featured_position - 1)"
                      class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                      :title="'Move up'"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      v-if="article.featured_position < 3"
                      @click="swapPositions(article, article.featured_position + 1)"
                      class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                      :title="'Move down'"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <button
                      @click="removeFeatured(article)"
                      class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      :title="'Remove from featured'"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </TransitionGroup>
              <div v-if="smallFeaturedNews.length < 3" class="text-sm text-gray-500 dark:text-gray-400 text-center p-4 border-2 border-dashed rounded">
                {{ 3 - smallFeaturedNews.length }} жижиг онцлох мэдээ нэмэх боломжтой
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- News List -->
      <div v-if="filteredNews.length > 0" class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <!-- Bulk Actions -->
        <div v-if="selectedItems.length > 0" class="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 border-b border-blue-100 dark:border-blue-800">
          <div class="flex items-center justify-between">
            <span class="text-sm text-blue-700 dark:text-blue-300">{{ selectedItems.length }} мэдээ сонгосон</span>
            <div class="flex items-center gap-2">
              <button 
                @click="bulkDeleteNews"
                class="inline-flex items-center px-3 py-1 border border-blue-300 dark:border-blue-600 rounded-md text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Устгах
              </button>
              <button @click="clearSelection" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                Цуцлах
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop View -->
        <div class="hidden sm:block">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    v-model="handleSelectAll"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th 
                  @click="toggleSort('title')"
                  scope="col" 
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div class="flex items-center">
                    Гарчиг
                    <svg 
                      v-if="sortBy === 'title'" 
                      class="w-4 h-4 ml-1" 
                      :class="{ 'transform rotate-180': sortOrder === 'asc' }"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ангилал
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Огноо
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Үзэлт
                </th>
                <th class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="news in sortedNews" :key="news.id" :class="{ 'bg-yellow-50/80 dark:bg-yellow-400/5': news.is_featured }">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    v-model="selectedItems"
                    :value="news.id"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div>
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ news.title }}</div>
                      <div v-if="news.is_featured" class="text-xs text-gray-500">
                        {{ news.featured_position === 0 ? 'Том онцлох' : `Жижиг онцлох ${news.featured_position}` }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['inline-flex px-2 py-1 text-xs font-medium rounded-full', getCategoryClasses(news.category?.name)]">
                    {{ news.category?.name || 'Ангилалгүй' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDateTime(news.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ news.views || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="relative">
                    <div class="flex items-center justify-end space-x-2">
                      <!-- Featured Toggle Button -->
                      <button
                        v-if="!news.is_featured"
                        @click="setFeaturedPosition(news, getNextSmallPosition())"
                        class="text-gray-400 hover:text-yellow-500 transition-colors"
                        title="Онцлох болгох"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                      <!-- Edit -->
                      <NuxtLink
                        :to="`/admin/news/${news.id}/edit`"
                        class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </NuxtLink>

                      <!-- Delete -->
                      <button
                        @click="deleteNews(news.id)"
                        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile View -->
        <div class="sm:hidden divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="news in sortedNews" 
               :key="news.id" 
               :class="['mobile-card', { 'bg-yellow-50/80 dark:bg-yellow-400/5': news.is_featured }]">
            <div class="mobile-card-header">
              <div class="mobile-card-title">{{ news.title }}</div>
              <div class="flex items-center gap-2">
                <button
                  v-if="!news.is_featured"
                  @click="setFeaturedPosition(news, getNextSmallPosition())"
                  class="text-gray-400 hover:text-yellow-500 transition-colors"
                  title="Онцлох болгох">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
                <NuxtLink
                  :to="`/admin/news/${news.id}/edit`"
                  class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </NuxtLink>
                <button
                  @click="deleteNews(news.id)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="mobile-card-meta space-y-1">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span :class="['inline-flex px-2 py-1 text-xs font-medium rounded-full', getCategoryClasses(news.category?.name)]">
                  {{ news.category?.name || 'Ангилалгүй' }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ formatDateTime(news.created_at) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{{ news.views || 0 }} үзэлт</span>
              </div>
              <div v-if="news.is_featured" class="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span>{{ news.featured_position === 0 ? 'Том онцлох' : `Жижиг онцлох ${news.featured_position}` }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State (keep the same background) -->
      <div v-if="filteredNews.length === 0 && newsItems.length > 0" class="py-12">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Хайлтад тохирох мэдээ олдсонгүй</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Хайх утгаа өөрчилж дахин оролдоно уу.</p>
          <div class="mt-6">
            <button
              @click="clearFilters"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Шүүлтүүрийг цэвэрлэх
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import type { SupabaseClient } from '@supabase/supabase-js'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

interface NewsArticle {
  id: string
  title: string
  category_id?: string
  author_id?: string
  is_featured: boolean
  featured_position?: number
  status?: string
  created_at?: string
}

const supabase = useSupabaseClient()
const loading = ref(false)
const error = ref<string | null>(null)
const newsItems = ref<NewsArticle[]>([])
const activeMenu = ref<string | null>(null)

// Search and filter states
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedDateRange = ref('')
const showFeaturedOnly = ref(false)
const startDate = ref('')
const endDate = ref('')

// Sorting
const sortBy = ref('created_at')
const sortOrder = ref('desc')

// Stats
const stats = computed(() => ({
  total: newsItems.value.length,
  featured: newsItems.value.filter(n => n.is_featured).length,
  today: newsItems.value.filter(n => {
    const today = new Date()
    const newsDate = new Date(n.created_at)
    return newsDate.toDateString() === today.toDateString()
  }).length
}))

// Bulk selection
const selectedItems = ref<string[]>([])
const handleSelectAll = computed({
  get: () => {
    return selectedItems.value.length === filteredNews.value.length && filteredNews.value.length > 0
  },
  set: (value: boolean) => {
    selectedItems.value = value ? filteredNews.value.map(news => news.id) : []
  }
})

// Filter news items
const filteredNews = computed(() => {
  let filtered = [...newsItems.value]
  
  // Search by title or description
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(news => 
      news.title?.toLowerCase().includes(query) || 
      news.description?.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(news => news.category?.name === selectedCategory.value)
  }

  // Filter by featured status
  if (showFeaturedOnly.value) {
    filtered = filtered.filter(news => news.is_featured)
  }

  // Filter by date range
  if (startDate.value && endDate.value) {
    filtered = filtered.filter(news => {
      const newsDate = new Date(news.created_at)
      const start = new Date(startDate.value)
      const end = new Date(endDate.value)
      return newsDate >= start && newsDate <= end
    })
  }

  return filtered
})

// Sort news items
const sortedNews = computed(() => {
  return [...filteredNews.value].sort((a, b) => {
    const aVal = a[sortBy.value]
    const bVal = b[sortBy.value]
    const modifier = sortOrder.value === 'desc' ? -1 : 1
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * modifier
    }
    return ((aVal < bVal ? -1 : 1) * modifier)
  })
})

// Get unique categories
const categories = computed(() => {
  const uniqueCategories = new Set(newsItems.value.map(news => news.category?.name).filter(Boolean))
  return Array.from(uniqueCategories)
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedDateRange.value = ''
  showFeaturedOnly.value = false
  startDate.value = ''
  endDate.value = ''
}

// Category color mapping
const categoryColors = {
  'Улс төр': 'blue',
  'Нийгэм': 'green',
  'Спорт': 'red',
  'Эдийн засаг': 'purple',
  'Дэлхий': 'indigo',
  'Урлаг': 'pink',
  'Технологи': 'cyan',
  'default': 'gray'
}

const getCategoryColor = (category: string | undefined) => {
  if (!category) return categoryColors.default
  return categoryColors[category] || categoryColors.default
}

const getCategoryClasses = (category: string | undefined) => {
  const color = getCategoryColor(category)
  return {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    green: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    red: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    pink: 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    cyan: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
    gray: 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
  }[color]
}

const setNewsAsFeatured = async (supabase: SupabaseClient, newsId: string, position: number) => {
  try {
    const { error } = await supabase
      .from('news')
      .update({ 
        is_featured: true,
        featured_position: position 
      })
      .eq('id', newsId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error setting news as featured:', error)
    return { success: false, error }
  }
}

const removeNewsFromFeatured = async (supabase: SupabaseClient, newsId: string) => {
  try {
    const { error } = await supabase
      .from('news')
      .update({ 
        is_featured: false,
        featured_position: null 
      })
      .eq('id', newsId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error removing news from featured:', error)
    return { success: false, error }
  }
}

const fetchNews = async () => {
  try {
    loading.value = true
    const { data, error: fetchError } = await supabase
      .from('news')
      .select('*, category:categories(*)')
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError
    
    console.log('Fetched news:', data?.length, 'articles')
    newsItems.value = data || []
  } catch (err) {
    console.error('Error fetching news:', err)
    error.value = err.message || 'Мэдээ татахад алдаа гарлаа'
  } finally {
    loading.value = false
  }
}

const mainFeaturedNews = computed(() => 
  newsItems.value.find(n => n.is_featured && n.featured_position === 0)
)

const smallFeaturedNews = computed(() => {
  return newsItems.value
    .filter(n => n.is_featured && n.featured_position > 0 && n.featured_position <= 3)
    .sort((a, b) => a.featured_position - b.featured_position)
})

const featuredCount = computed(() => {
  const mainCount = mainFeaturedNews.value ? 1 : 0
  const smallCount = smallFeaturedNews.value.length
  return mainCount + smallCount
})

const headerText = computed(() => {
  const main = mainFeaturedNews.value ? 'Том онцлох: 1' : 'Том онцлох: 0'
  const small = `Жижиг онцлох: ${smallFeaturedNews.value.length}/3`
  return `${main}, ${small}`
})

const setFeaturedPosition = async (news: NewsArticle, position: number) => {
  try {
    if (position === 0 && mainFeaturedNews.value && mainFeaturedNews.value.id !== news.id) {
      // If trying to set as main featured and there's already a main featured
      const confirmed = window.confirm('Өөр мэдээ том онцлох байна. Солих уу?')
      if (!confirmed) return
    }

    if (position > 0) {
      const smallFeaturedCount = newsItems.value.filter(n => n.is_featured && n.featured_position > 0).length
      if (smallFeaturedCount >= 3 && !news.is_featured) {
        error.value = 'Жижиг онцлох мэдээний тоо хэтэрсэн байна (3)'
        return
      }
    }

    loading.value = true
    await setNewsAsFeatured(supabase, news.id, position)
    await fetchNews()
  } catch (err) {
    error.value = 'Онцлох мэдээ тохируулахад алдаа гарлаа'
    console.error('Error setting featured position:', err)
  } finally {
    loading.value = false
  }
}

const swapPositions = async (article: NewsArticle, newPosition: number) => {
  try {
    if (newPosition < 1 || newPosition > 3) {
      error.value = 'Буруу position утга'
      return
    }

    const targetArticle = newsItems.value.find(
      n => n.is_featured && n.featured_position === newPosition
    )

    if (!targetArticle) {
      error.value = 'Солих мэдээ олдсонгүй'
      return
    }

    loading.value = true
    const currentPosition = article.featured_position

    // Update both articles' positions
    await Promise.all([
      setNewsAsFeatured(supabase, article.id, newPosition),
      setNewsAsFeatured(supabase, targetArticle.id, currentPosition)
    ])

    await fetchNews()
  } catch (err) {
    error.value = 'Байрлал солиход алдаа гарлаа'
    console.error('Error swapping positions:', err)
  } finally {
    loading.value = false
  }
}

const deleteNews = async (id: string) => {
  try {
    if (!confirm('Энэ мэдээг устгахдаа итгэлтэй байна уу?')) {
      return
    }

    loading.value = true
    error.value = null // Clear any previous errors
    console.log('Starting delete process for news:', id)
    
    const { error: deleteError } = await supabase
      .from('news')
      .delete()
      .eq('id', id)
    
    if (deleteError) {
      console.error('Delete failed:', deleteError)
      throw new Error(deleteError.message)
    }

    console.log('Successfully deleted news')
    await fetchNews()
  } catch (err: any) {
    console.error('Error in delete handler:', err)
    error.value = err.message || 'Мэдээг устгах үед алдаа гарлаа'
  } finally {
    loading.value = false
  }
}

const removeFeatured = async (news: NewsArticle) => {
  try {
    loading.value = true
    console.log('Removing featured:', news.id)
    
    // Remove featured status from the current article
    const { success, error: removeError } = await removeNewsFromFeatured(supabase, news.id)
    if (!success) throw removeError
    
    // Get remaining featured articles
    const remaining = newsItems.value
      .filter(n => n.is_featured && n.id !== news.id)
      .sort((a, b) => (a.featured_position || 99) - (b.featured_position || 99))
    
    // Reposition remaining articles
    for (let i = 0; i < remaining.length; i++) {
      const article = remaining[i]
      const newPosition = i === 0 ? 0 : i + 1 // First gets 0, others get 1, 2, 3
      
      if (article.featured_position !== newPosition) {
        const { success, error: updateError } = await setNewsAsFeatured(
          supabase,
          article.id,
          newPosition
        )
        if (!success) throw updateError
      }
    }
    
    console.log('Successfully removed featured and reordered remaining')
    activeMenu.value = null
    await fetchNews()
  } catch (err) {
    console.error('Error removing featured:', err)
    error.value = err instanceof Error ? err.message : 'Онцлох мэдээг хасахад алдаа гарлаа'
  } finally {
    loading.value = false
  }
}

const toggleMenu = (article: NewsArticle) => {
  article.showMenu = !article.showMenu
}

const getNextSmallPosition = computed(() => () => {
  const usedPositions = newsItems.value
    .filter(n => n.is_featured && n.featured_position !== 0)
    .map(n => n.featured_position)
  for (let i = 1; i <= 3; i++) {
    if (!usedPositions.includes(i)) return i
  }
  return 1
})

const maxSmallPosition = computed(() => {
  const usedPositions = new Set(smallFeaturedNews.value.map(n => n.featured_position))
  const max = Math.max(...usedPositions)
  return max === -Infinity ? 1 : max + 1
})

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('mn-MN')
}

const toggleSort = (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'desc'
  }
}

const clearSelection = () => {
  selectedItems.value = []
  handleSelectAll.value = false
}

const bulkDeleteNews = async () => {
  if (!selectedItems.value.length) return
  
  if (!confirm(`Сонгосон ${selectedItems.value.length} мэдээг устгахдаа итгэлтэй байна уу?`)) {
    return
  }

  try {
    loading.value = true
    error.value = null

    const { error: deleteError } = await supabase
      .from('news')
      .delete()
      .in('id', selectedItems.value)

    if (deleteError) {
      throw new Error(deleteError.message)
    }

    console.log('Successfully deleted selected news')
    selectedItems.value = [] // Clear selection after successful delete
    await fetchNews() // Refresh the news list
  } catch (err: any) {
    console.error('Error in bulk delete:', err)
    error.value = err.message || 'Мэдээг устгах үед алдаа гарлаа'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  console.log('Component mounted, fetching initial data...')
  fetchNews()
})

watch(newsItems, (newVal) => {
  console.log('News items updated:', newVal?.length, 'articles')
}, { deep: true })

watch(activeMenu, (newVal) => {
  console.log('Active menu changed:', newVal)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.table-responsive {
  @apply w-full overflow-x-auto -mx-4 sm:mx-0 sm:rounded-lg;
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.300') theme('colors.gray.100');
}

.table-responsive::-webkit-scrollbar {
  height: 8px;
}

.table-responsive::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-full;
}

.table-responsive::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
  &:hover {
    @apply bg-gray-400;
  }
}

@media (max-width: 640px) {
  .mobile-card {
    @apply block px-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0;
  }
  
  .mobile-card-header {
    @apply flex justify-between items-center mb-2;
  }
  
  .mobile-card-title {
    @apply text-sm font-medium text-gray-900 dark:text-white;
  }
  
  .mobile-card-meta {
    @apply text-xs text-gray-500 dark:text-gray-400;
  }
}
</style>
