import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRuntimeConfig } from '#imports'

export interface Article {
  id: string
  title: string
  slug: string
  short_id?: string
  content: string
  excerpt: string
  featured_image: string | null
  category_id: string
  created_at: string
  published_at: string
  updated_at: string
  likes: number
  comments: number
  liked: boolean
  category?: {
    id: string
    name: string
    slug: string
  }
  featured_position?: number
}

export const useNewsStore = defineStore('news', {
  state: () => {
    const config = useRuntimeConfig()
    const supabase = useSupabaseClient()

    return {
      latestArticles: [] as Article[],
      featuredArticles: [] as Article[],
      loading: false,
      error: null as string | null,
      currentPage: 1,
      itemsPerPage: 9,
      loadMoreCount: 6,
      hasMore: true,
      initialized: false,
      supabase,
      config
    }
  },

  actions: {
    async init() {
      if (this.initialized) return
      if (process.client) {
        this.initialized = true
        await this.fetchLatestArticles()
        await this.fetchFeaturedArticles()
      }
    },

    async fetchLatestArticles() {
      if (this.loading) return
      this.loading = true
      try {
        const startIndex = this.currentPage === 1 ? 0 : 9 + ((this.currentPage - 2) * this.loadMoreCount)
        const endIndex = this.currentPage === 1 ? 8 : startIndex + this.loadMoreCount - 1

        const { data, error } = await this.supabase
          .from('news')
          .select('*, category:categories(*)')
          .eq('is_featured', false)
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .range(startIndex, endIndex)

        if (error) throw error
        
        const processedArticles = data.map((article: any) => ({
          id: article.id,
          title: article.title,
          slug: article.slug,
          short_id: article.short_id,
          content: article.content,
          excerpt: article.excerpt || '',
          category_id: article.category_id,
          created_at: article.created_at,
          published_at: article.published_at,
          updated_at: article.updated_at,
          likes: 0,
          comments: 0,
          liked: false,
          category: article.category,
          featured_image: article.featured_image?.startsWith('data:') ? 
            article.featured_image : 
            article.featured_image ? 
              `${this.config.public.supabaseUrl}/storage/v1/object/public/xpost-files/${article.featured_image}` : 
              '/placeholder-image.svg'
        }))

        if (this.currentPage === 1) {
          this.latestArticles = processedArticles
        } else {
          this.latestArticles.push(...processedArticles)
        }

        this.hasMore = data.length === (this.currentPage === 1 ? 9 : this.loadMoreCount)
      } catch (error) {
        console.error('Шинэ мэдээ татахад алдаа гарлаа:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchFeaturedArticles() {
      try {
        const { data, error } = await this.supabase
          .from('news')
          .select('*, category:categories(*)')
          .eq('is_featured', true)
          .eq('is_published', true)
          .order('featured_position', { ascending: true })
          .limit(4)

        if (error) throw error

        // Sort articles by featured_position (main article first, then small articles)
        const sortedData = data.sort((a, b) => {
          // If either position is null, put it at the end
          if (a.featured_position === null) return 1
          if (b.featured_position === null) return -1
          return (a.featured_position ?? 99) - (b.featured_position ?? 99)
        })

        this.featuredArticles = sortedData.map((article: any) => ({
          id: article.id,
          title: article.title,
          slug: article.slug,
          short_id: article.short_id,
          content: article.content,
          excerpt: article.excerpt || '',
          category_id: article.category_id,
          created_at: article.created_at,
          published_at: article.published_at,
          updated_at: article.updated_at,
          likes: 0,
          comments: 0,
          liked: false,
          category: article.category,
          featured_position: article.featured_position,
          featured_image: article.featured_image?.startsWith('data:') ? 
            article.featured_image : 
            article.featured_image ? 
              `${this.config.public.supabaseUrl}/storage/v1/object/public/xpost-files/${article.featured_image}` : 
              '/placeholder-image.svg'
        }))
      } catch (error) {
        console.error('Error fetching featured articles:', error)
        this.error = 'Failed to fetch featured articles'
      }
    },

    async getArticleBySlug(slug: string) {
      try {
        const { data, error } = await this.supabase
          .from('news')
          .select('*, category:categories(*)')
          .or(`slug.eq.${slug},short_id.eq.${slug}`)
          .single()

        if (error) throw error

        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          short_id: data.short_id,
          content: data.content,
          excerpt: data.excerpt || '',
          category_id: data.category_id,
          created_at: data.created_at,
          published_at: data.published_at,
          updated_at: data.updated_at,
          category: data.category,
          featured_image: data.featured_image?.startsWith('data:') ? 
            data.featured_image : 
            data.featured_image ? 
              `${this.config.public.supabaseUrl}/storage/v1/object/public/xpost-files/${data.featured_image}` : 
              '/placeholder-image.svg',
          likes: 0,
          comments: 0,
          liked: false
        }
      } catch (error) {
        console.error('Мэдээ татахад алдаа гарлаа:', error)
        return null
      }
    },

    async incrementViews(articleId: string) {
      try {
        const { error } = await this.supabase.rpc('increment_views', { article_id: articleId })
        if (error) throw error
      } catch (error) {
        console.error('Харсан тоо оруулахад алдаа гарлаа:', error)
      }
    },

    async loadMore() {
      this.currentPage++
      await this.fetchLatestArticles()
    },

    async toggleLike(article: Article) {
      article.liked = !article.liked
      article.likes = (article.likes || 0) + (article.liked ? 1 : -1)
      // TODO: Implement API call to update like status
    },

    getTimeAgo(dateString: string): string {
      const date = new Date(dateString)
      const now = new Date('2025-01-10T17:32:24+08:00')
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
      
      let interval = Math.floor(seconds / 31536000)
      if (interval >= 1) {
        return `${interval} жилийн өмнө`
      }
      
      interval = Math.floor(seconds / 2592000)
      if (interval >= 1) {
        return `${interval} сарын өмнө`
      }
      
      interval = Math.floor(seconds / 86400)
      if (interval >= 1) {
        return `${interval} өдрийн өмнө`
      }
      
      interval = Math.floor(seconds / 3600)
      if (interval >= 1) {
        return `${interval} цагийн өмнө`
      }
      
      interval = Math.floor(seconds / 60)
      if (interval >= 1) {
        return `${interval} минутын өмнө`
      }
      
      return 'Саяхан'
    }
  }
})