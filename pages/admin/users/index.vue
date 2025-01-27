<template>
  <!-- ... -->
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useSupabaseClient } from '#imports'

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
