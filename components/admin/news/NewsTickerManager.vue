<template>
  <div class="mb-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-5">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Ticker удирдлага</h2>
      <button
        @click="fetchTickerItems"
        class="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
      >
        <RefreshCw class="w-4 h-4" />
      </button>
    </div>

    <div class="space-y-5">
      <!-- Current Ticker Items -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 class="text-base font-medium text-gray-900 dark:text-white mb-3">Одоогийн ticker мэдээнүүд</h3>
        
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="items.length === 0" class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          <svg class="w-12 h-12 mb-2 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p>Ticker мэдээ байхгүй байна</p>
        </div>

        <!-- Ticker Items List -->
        <div v-else class="space-y-2">
          <TransitionGroup name="list">
            <div 
              v-for="(item, index) in items" 
              :key="item.id" 
              class="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300 mr-4">{{ item.content }}</span>
              <div class="flex items-center gap-1">
                <button 
                  @click="moveItem(index, 'up')" 
                  :disabled="index === 0"
                  class="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  :title="'Дээш зөөх'"
                >
                  <ChevronUp class="w-4 h-4" />
                </button>
                <button 
                  @click="moveItem(index, 'down')" 
                  :disabled="index === items.length - 1"
                  class="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  :title="'Доош зөөх'"
                >
                  <ChevronDown class="w-4 h-4" />
                </button>
                <button 
                  @click="removeItem(item.id)"
                  class="p-1.5 text-red-500 hover:text-red-700 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  :title="'Устгах'"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Add New Ticker Item -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 class="text-base font-medium text-gray-900 dark:text-white mb-3">Шинэ ticker нэмэх</h3>
        <form @submit.prevent="addItem" class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1">
            <input
              v-model="newItem"
              type="text"
              class="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ticker мэдээний текст..."
              :disabled="saving"
            />
          </div>
          <button
            type="submit"
            :disabled="!newItem.trim() || saving"
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <Plus v-else class="h-4 w-4 mr-1.5" />
            {{ saving ? 'Нэмж байна...' : 'Нэмэх' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { ChevronUp, ChevronDown, Trash2, RefreshCw, Plus } from 'lucide-vue-next'

interface TickerItem {
  id: string
  content: string
  position: number
  created_at: string
}

const supabase = useSupabaseClient()
const items = ref<TickerItem[]>([])
const newItem = ref('')
const loading = ref(false)
const saving = ref(false)

const fetchTickerItems = async () => {
  try {
    loading.value = true
    const { data, error: fetchError } = await supabase
      .from('ticker_items')
      .select('*')
      .order('position')

    if (fetchError) throw fetchError
    items.value = data || []
  } catch (err) {
    console.error('Error fetching ticker items:', err)
  } finally {
    loading.value = false
  }
}

const addItem = async () => {
  if (!newItem.value.trim() || saving.value) return

  try {
    saving.value = true
    const position = items.value.length

    const { error: insertError } = await supabase
      .from('ticker_items')
      .insert([
        {
          content: newItem.value.trim(),
          position
        }
      ])

    if (insertError) throw insertError

    await fetchTickerItems()
    newItem.value = ''
  } catch (err) {
    console.error('Error adding ticker item:', err)
  } finally {
    saving.value = false
  }
}

const removeItem = async (id: string) => {
  try {
    const { error: deleteError } = await supabase
      .from('ticker_items')
      .delete()
      .eq('id', id)

    if (deleteError) throw deleteError
    await fetchTickerItems()
  } catch (err) {
    console.error('Error removing ticker item:', err)
  }
}

const moveItem = async (index: number, direction: 'up' | 'down') => {
  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= items.value.length) return

  try {
    const item = items.value[index]
    const swapItem = items.value[newIndex]
    
    const { error: updateError } = await supabase
      .from('ticker_items')
      .upsert([
        { id: item.id, position: newIndex },
        { id: swapItem.id, position: index }
      ])

    if (updateError) throw updateError
    await fetchTickerItems()
  } catch (err) {
    console.error('Error moving ticker item:', err)
  }
}

fetchTickerItems()
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>