<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Хэрэглэгчдийн жагсаалт</h1>
        <div class="mt-4 sm:mt-0">
          <span class="hidden sm:inline-block text-sm text-gray-500 dark:text-gray-400 mr-2">
            Нийт: {{ totalItems }}
          </span>
        </div>
      </div>

      <!-- Filters -->
      <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="relative">
          <input 
            v-model="filters.search" 
            type="text"
            placeholder="Нэр эсвэл имэйлээр хайх" 
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
        <div class="flex space-x-4">
          <select 
            v-model="filters.role"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="">Бүх үүрэг</option>
            <option value="admin">Админ</option>
            <option value="editor">Эдитор</option>
          </select>
          <select 
            v-model="filters.sort"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="id:desc">Шинэ</option>
            <option value="id:asc">Хуучин</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Нэр</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Имэйл</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Үүрэг</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Бүртгүүлсэн</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Үйлдэл</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ user.last_name || user.username }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ user.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="{
                    'px-3 py-1 text-sm rounded-full font-medium': true,
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400': user.role === 'admin' || user.is_admin,
                    'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400': user.role === 'editor' && !user.is_admin
                  }"
                >
                  {{ (user.role === 'admin' || user.is_admin) ? 'Админ' : 'Эдитор' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ user.created_at ? new Date(user.created_at).toLocaleString('mn-MN') : 'Хоосон' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button 
                  @click="toggleRole(user)"
                  :disabled="user.id === currentUser?.id"
                  :class="{
                    'px-3 py-1 rounded-md text-sm font-medium transition-colors': true,
                    'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600': user.id !== currentUser?.id,
                    'opacity-50 cursor-not-allowed': user.id === currentUser?.id
                  }"
                >
                  Үүрэг солих
                </button>
                <button 
                  @click="resetPassword(user.email)"
                  :disabled="resettingPasswordFor === user.email"
                  class="px-3 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-400 dark:hover:bg-yellow-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="resettingPasswordFor === user.email" class="flex items-center space-x-1">
                    <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Уншиж байна...</span>
                  </span>
                  <span v-else>Нууц үг сэргээх</span>
                </button>
                <button 
                  @click="handleDelete(user.id)"
                  :disabled="user.id === currentUser?.id"
                  :class="{
                    'px-3 py-1 rounded-md text-sm font-medium transition-colors': true,
                    'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900': user.id !== currentUser?.id,
                    'opacity-50 cursor-not-allowed': user.id === currentUser?.id
                  }"
                >
                  Устгах
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex items-center justify-between">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="page--"
            :disabled="page === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          >
            Өмнөх
          </button>
          <button
            @click="page++"
            :disabled="!hasMore"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          >
            Дараах
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <span>Хуудас</span>
              <span class="font-medium mx-1">{{ page }}</span>
              <span>/</span>
              <span class="font-medium mx-1">{{ Math.ceil(totalItems / itemsPerPage) }}</span>
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                @click="page--"
                :disabled="page === 1"
                class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="page++"
                :disabled="!hasMore"
                class="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
import { useSupabaseClient, navigateTo } from '#imports'

const supabase = useSupabaseClient()

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

const resettingPasswordFor = ref<string | null>(null)

// Get current user on mount
const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    
    if (user) {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (profileError) throw profileError
      console.log('Current user profile:', data)  
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
      .select(`
        id, 
        username, 
        last_name, 
        role, 
        is_admin, 
        email,
        created_at
      `, { count: 'exact' })

    // Apply search filter
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase()
      query = query.or(`email.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,username.ilike.%${searchTerm}%`)
    }
    
    // Apply role filter
    if (filters.value.role) {
      if (filters.value.role === 'admin') {
        // Show users who are either role='admin' OR is_admin=true
        query = query.or('role.eq.admin,is_admin.eq.true')
      } else {
        // For editor, only show users who are not admins
        query = query.eq('role', 'editor').eq('is_admin', false)
      }
    }

    // Apply sorting
    const [field, direction] = filters.value.sort.split(':')
    query = query.order(field, { ascending: direction === 'asc' })

    // Apply pagination
    const from = (page.value - 1) * itemsPerPage
    query = query.range(from, from + itemsPerPage - 1)

    const { data, count, error } = await query
    if (error) throw error

    users.value = data || []
    totalItems.value = count || 0
    hasMore.value = (from + itemsPerPage) < totalItems.value
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

const toggleRole = async (user) => {
  try {
    // Don't allow changing own role
    if (user.id === currentUser.value?.id) {
      return
    }

    const isCurrentlyAdmin = user.role === 'admin' || user.is_admin
    const newRole = isCurrentlyAdmin ? 'editor' : 'admin'
    const newIsAdmin = !isCurrentlyAdmin

    const { error } = await supabase
      .from('profiles')
      .update({ 
        role: newRole,
        is_admin: newIsAdmin 
      })
      .eq('id', user.id)

    if (error) {
      console.error('Error updating role:', error)
      return
    }

    // Refresh the users list
    await fetchUsers()
  } catch (err) {
    console.error('Error toggling role:', err)
  }
}

const resetPassword = async (email: string) => {
  if (!currentUser.value?.role === 'admin' && !currentUser.value?.is_admin) return

  try {
    resettingPasswordFor.value = email
    // Navigate to forgot-password page with email pre-filled
    await navigateTo(`/auth/forgot-password?email=${encodeURIComponent(email)}`)
  } catch (err) {
    console.error('Error navigating to reset password:', err)
    alert('Алдаа гарлаа')
  } finally {
    resettingPasswordFor.value = null
  }
}

const handleDelete = async (id: string) => {
  if (!currentUser.value?.role === 'admin' && !currentUser.value?.is_admin) return
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
    alert('Алдаа гарлаа')
  }
}

onMounted(async () => {
  await getCurrentUser()
  await fetchUsers()
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})
</script>

<style scoped>
.admin-layout {
  padding: 20px;
  background-color: var(--color-background);
  color: var(--color-text);
}
.filters {
  margin-bottom: 20px;
}
.filters input, .filters select {
  margin-right: 10px;
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}
.pagination {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}
button {
  margin-right: 8px;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  cursor: pointer;
}
button:disabled, button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background: var(--color-background-mute);
}
</style>

<style>
.admin-layout {
  @apply min-h-screen;
}

/* Responsive table */
@media (max-width: 640px) {
  table {
    @apply block;
  }
  
  thead {
    @apply hidden;
  }
  
  tr {
    @apply block border-b border-gray-200 dark:border-gray-700;
  }
  
  td {
    @apply block py-2 px-4;
  }
  
  td:before {
    content: attr(data-label);
    @apply font-medium text-gray-700 dark:text-gray-300 block sm:hidden mb-1;
  }
}

/* Dark mode transitions */
.dark .transition-colors {
  @apply transition-all duration-200;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  @apply w-2 h-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800 rounded-full;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>
