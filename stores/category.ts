import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
  updated_at: string
}

export const useCategoryStore = defineStore('category', {
  state: () => {
    const config = useRuntimeConfig()
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey
    )

    return {
      categories: [] as Category[],
      loading: false,
      error: null as string | null,
      currentCategory: null as Category | null,
      supabase
    }
  },

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const { data, error } = await this.supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true })

        if (error) throw error
        
        this.categories = data
      } catch (e) {
        console.error('Error fetching categories:', e)
        this.error = e instanceof Error ? e.message : 'Failed to fetch categories'
      } finally {
        this.loading = false
      }
    },

    async getCategoryBySlug(slug: string) {
      try {
        const { data, error } = await this.supabase
          .from('categories')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error) throw error
        
        this.currentCategory = data
        return data
      } catch (e) {
        console.error('Error fetching category:', e)
        this.error = e instanceof Error ? e.message : 'Failed to fetch category'
        return null
      }
    },

    async createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) {
      try {
        const { data, error } = await this.supabase
          .from('categories')
          .insert([category])
          .select()
          .single()

        if (error) throw error
        
        this.categories.push(data)
        return data
      } catch (e) {
        console.error('Error creating category:', e)
        this.error = e instanceof Error ? e.message : 'Failed to create category'
        return null
      }
    },

    async updateCategory(id: string, updates: Partial<Category>) {
      try {
        const { data, error } = await this.supabase
          .from('categories')
          .update(updates)
          .eq('id', id)
          .select()
          .single()

        if (error) throw error
        
        const index = this.categories.findIndex(cat => cat.id === id)
        if (index !== -1) {
          this.categories[index] = data
        }
        return data
      } catch (e) {
        console.error('Error updating category:', e)
        this.error = e instanceof Error ? e.message : 'Failed to update category'
        return null
      }
    },

    async deleteCategory(id: string) {
      try {
        const { error } = await this.supabase
          .from('categories')
          .delete()
          .eq('id', id)

        if (error) throw error
        
        this.categories = this.categories.filter(cat => cat.id !== id)
        return true
      } catch (e) {
        console.error('Error deleting category:', e)
        this.error = e instanceof Error ? e.message : 'Failed to delete category'
        return false
      }
    }
  },

  getters: {
    getCategoryById: (state) => {
      return (id: string) => state.categories.find(cat => cat.id === id)
    },
    getCategoryBySlugSync: (state) => {
      return (slug: string) => state.categories.find(cat => cat.slug === slug)
    }
  }
})
