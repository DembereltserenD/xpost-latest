import { defineStore } from 'pinia';
import { createClient } from '@supabase/supabase-js';
import { useRuntimeConfig } from '#imports';

interface Category {
  id: string;
  name: string;
  slug: string;
  name_mn: string;
  is_active: boolean;
}

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    activeCategories: (state) => state.categories.filter(cat => cat.is_active),
    getCategoryBySlug: (state) => (slug: string) => 
      state.categories.find(cat => cat.slug === slug),
  },

  actions: {
    async fetchCategories() {
      const config = useRuntimeConfig();
      const supabase = createClient(
        config.public.supabaseUrl,
        config.public.supabaseKey
      );
      this.loading = true;
      this.error = null;

      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('created_at');

        if (error) throw error;
        this.categories = data;
      } catch (err: any) {
        this.error = err.message;
        console.error('Error fetching categories:', err);
      } finally {
        this.loading = false;
      }
    },

    async addCategory(category: Omit<Category, 'id'>) {
      const config = useRuntimeConfig();
      const supabase = createClient(
        config.public.supabaseUrl,
        config.public.supabaseKey
      );
      this.loading = true;
      this.error = null;

      try {
        const { data, error } = await supabase
          .from('categories')
          .insert([category])
          .select()
          .single();

        if (error) throw error;
        this.categories.push(data);
      } catch (err: any) {
        this.error = err.message;
        console.error('Error adding category:', err);
      } finally {
        this.loading = false;
      }
    },

    async updateCategory(id: string, updates: Partial<Category>) {
      const config = useRuntimeConfig();
      const supabase = createClient(
        config.public.supabaseUrl,
        config.public.supabaseKey
      );
      this.loading = true;
      this.error = null;

      try {
        const { data, error } = await supabase
          .from('categories')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        const index = this.categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
          this.categories[index] = data;
        }
      } catch (err: any) {
        this.error = err.message;
        console.error('Error updating category:', err);
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory(id: string) {
      const config = useRuntimeConfig();
      const supabase = createClient(
        config.public.supabaseUrl,
        config.public.supabaseKey
      );
      this.loading = true;
      this.error = null;

      try {
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', id);

        if (error) throw error;
        this.categories = this.categories.filter(cat => cat.id !== id);
      } catch (err: any) {
        this.error = err.message;
        console.error('Error deleting category:', err);
      } finally {
        this.loading = false;
      }
    },

    async toggleCategoryStatus(id: string) {
      const category = this.categories.find(cat => cat.id === id);
      if (category) {
        await this.updateCategory(id, { is_active: !category.is_active });
      }
    }
  }
});
