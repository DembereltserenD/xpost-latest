import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

interface Category {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

interface News {
  id: string
  title: string
  slug: string
  content: string
  summary: string
  featured_image: string | null
  category_id: string
  is_published: boolean
  is_featured: boolean
  published_at?: string
  created_at: string
  updated_at: string
  categories?: {
    name: string
  }
}

export const useAdminStore = defineStore('admin', () => {
  const supabase = useSupabaseClient()
  
  const news = ref<News[]>([])
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // News Actions
  const fetchNews = async () => {
    try {
      isLoading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('news')
        .select(`
          *,
          categories (
            name
          )
        `)
        .order('created_at', { ascending: false })

      if (err) throw err
      news.value = data || []
    } catch (err: any) {
      error.value = err?.message || 'An unexpected error occurred'
      console.error('Error fetching news:', err)
    } finally {
      isLoading.value = false
    }
  }

  const createNews = async (newsData: Partial<News>) => {
    try {
      isLoading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('news')
        .insert(newsData)
        .select()
        .single()

      if (err) throw err
      return data
    } catch (err: any) {
      error.value = err?.message || 'An unexpected error occurred'
      console.error('Error creating news:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateNews = async (id: string, newsData: Partial<News>) => {
    try {
      isLoading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      await fetchNews()
      return data
    } catch (err: any) {
      error.value = err?.message || 'An unexpected error occurred'
      console.error('Error updating news:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteNews = async (id: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { error: err } = await supabase
        .from('news')
        .delete()
        .eq('id', id)

      if (err) throw err
      await fetchNews()
    } catch (err: any) {
      error.value = err?.message || 'An unexpected error occurred'
      console.error('Error deleting news:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Category Actions
  const fetchCategories = async () => {
    try {
      isLoading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (err) throw err
      categories.value = data || []
    } catch (err: any) {
      error.value = err?.message || 'An unexpected error occurred'
      console.error('Error fetching categories:', err)
    } finally {
      isLoading.value = false
    }
  }

  const createCategory = async (categoryData: Partial<Category>) => {
    try {
      isLoading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('categories')
        .insert(categoryData)
        .select()
        .single()

      if (err) throw err
      await fetchCategories()
      return data
    } catch (err: any) {
      error.value = err?.message || 'An unexpected error occurred'
      console.error('Error creating category:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateCategory = async (id: string, categoryData: Partial<Category>) => {
    try {
      isLoading.value = true
      error.value = null

      const { data, error: err } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      await fetchCategories()
      return data
    } catch (err: any) {
      error.value = err?.message || 'An unexpected error occurred'
      console.error('Error updating category:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { error: err } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (err) throw err
      await fetchCategories()
    } catch (err: any) {
      error.value = err?.message || 'An unexpected error occurred'
      console.error('Error deleting category:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    news,
    categories,
    isLoading,
    error,

    // News Actions
    fetchNews,
    createNews,
    updateNews,
    deleteNews,

    // Category Actions
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
})
