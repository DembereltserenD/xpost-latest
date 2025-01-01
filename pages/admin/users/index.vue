<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Хэрэглэгчдийн жагсаалт</h1>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Хайх</label>
          <input
            v-model="filters.search"
            type="text"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Имэйл эсвэл нэрээр хайх..."
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Үүрэг</label>
          <select
            v-model="filters.role"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Бүгд</option>
            <option value="admin">Админ</option>
            <option value="editor">Редактор</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Эрэмбэлэх</label>
          <select
            v-model="filters.sort"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="id:desc">Сүүлд нэмэгдсэн</option>
            <option value="id:asc">Эхэнд нэмэгдсэн</option>
            <option value="email:asc">Имэйл (A-Z)</option>
            <option value="email:desc">Имэйл (Z-A)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Users List -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Хэрэглэгч</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Үүрэг</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Сүүлд нэвтэрсэн</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Бүртгүүлсэн</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Үйлдэл</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img 
                      :src="user.avatar_url || 'https://ui-avatars.com/api/?name=' + user.email" 
                      class="h-10 w-10 rounded-full"
                      :alt="user.email"
                    >
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ user.email }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ user.role === 'admin' ? 'Админ' : 'Редактор' }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="user.last_sign_in_at ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
                >
                  {{ user.last_sign_in_at ? 'Идэвхтэй' : 'Идэвхгүй' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('mn-MN') : 'Хэзээ ч нэвтрээгүй' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ new Date(user.created_at).toLocaleDateString('mn-MN') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="toggleRole(user)"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                >
                  {{ user.role === 'admin' ? 'Редактор болгох' : 'Админ болгох' }}
                </button>
                <button
                  @click="resetPassword(user.email)"
                  class="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-4"
                >
                  Нууц үг шинэчлэх
                </button>
                <button
                  @click="handleDelete(user.id)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Устгах
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="page > 1 && (page--)"
            :disabled="page === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            :class="{ 'opacity-50 cursor-not-allowed': page === 1 }"
          >
            Өмнөх
          </button>
          <button
            @click="hasMore && page++"
            :disabled="!hasMore"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            :class="{ 'opacity-50 cursor-not-allowed': !hasMore }"
          >
            Дараах
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Нийт <span class="font-medium">{{ totalItems }}</span> хэрэглэгч
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="page > 1 && (page--)"
                :disabled="page === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': page === 1 }"
              >
                <span class="sr-only">Өмнөх</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="hasMore && page++"
                :disabled="!hasMore"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': !hasMore }"
              >
                <span class="sr-only">Дараах</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

const users = ref([])
const totalItems = ref(0)
const page = ref(1)
const hasMore = ref(false)
const itemsPerPage = 10
const currentUser = ref(null)

const filters = ref({
  search: '',
  role: '',
  sort: 'id:desc'
})

// Get current user on mount
const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      currentUser.value = data
    }
  } catch (err) {
    console.error('Error getting current user:', err)
  }
}

// Watch for filter changes
watch(filters, () => {
  page.value = 1
  fetchUsers()
}, { deep: true })

const fetchUsers = async () => {
  try {
    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (filters.value.search) {
      query = query.ilike('email', `%${filters.value.search}%`)
    }

    // Apply role filter
    if (filters.value.role) {
      query = query.eq('role', filters.value.role)
    } else {
      // If no specific role is selected, get both admin and editor
      query = query.in('role', ['admin', 'editor'])
    }

    // Apply sorting
    const [column, order] = filters.value.sort.split(':')
    query = query.order(column, { ascending: order === 'asc' })

    // Apply pagination
    const from = (page.value - 1) * itemsPerPage
    const to = from + itemsPerPage - 1
    query = query.range(from, to)

    const { data, count, error } = await query

    if (error) throw error

    users.value = data || []
    totalItems.value = count || 0
    hasMore.value = count > (page.value * itemsPerPage)
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

const toggleRole = async (user) => {
  if (currentUser.value.role !== 'admin') return
  if (user.id === currentUser.value.id) {
    alert('Өөрийнхөө үүргийг өөрчлөх боломжгүй')
    return
  }

  const newRole = user.role === 'admin' ? 'editor' : 'admin'
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', user.id)

    if (error) throw error

    fetchUsers()
  } catch (err) {
    console.error('Error updating user role:', err)
    alert('Алдаа гарлаа')
  }
}

const resetPassword = async (email: string) => {
  if (currentUser.value.role !== 'admin') return
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    alert('Нууц үг шинэчлэх холбоос илгээгдлээ')
  } catch (err) {
    console.error('Error resetting password:', err)
    alert('Алдаа гарлаа')
  }
}

const handleDelete = async (id: string) => {
  if (currentUser.value.role !== 'admin') return
  if (id === currentUser.value.id) {
    alert('Өөрийгөө устгах боломжгүй')
    return
  }

  if (!confirm('Энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?')) return

  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)

    if (error) throw error

    fetchUsers()
  } catch (err) {
    console.error('Error deleting user:', err)
  }
}

onMounted(() => {
  getCurrentUser()
  fetchUsers()
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})
</script>
