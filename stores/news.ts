import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export interface Article {
  id: number
  title: string
  content: string
  excerpt?: string | null
  category: string
  created_at: string
  image?: string | null
  is_featured: boolean
  shares: number
  comments: number
  likes: number
  liked?: boolean
  watermark?: {
    enabled: boolean
    position: 'top-right' | 'bottom-left'
  } | null
  description?: string;
  slug: string;
}

export const useNewsStore = defineStore('news', () => {
  const config = useRuntimeConfig()
  console.log('Supabase URL:', config.public.supabaseUrl)
  console.log('Supabase Key exists:', !!config.public.supabaseKey)
  
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  const articles = ref<Article[]>([])
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const activeCategory = ref('all')
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const totalArticles = ref(0)

  const hasMoreArticles = computed(() => {
    return articles.value.length < totalArticles.value
  })

  const featuredArticles = computed(() => {
    return articles.value.filter(article => article.is_featured)
  })

  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredArticles.value.slice(start, end)
  })

  const fetchArticles = async (page: number = 1, limit: number = 10) => {
    console.log('Starting fetchArticles, page:', page, 'limit:', limit)
    isLoading.value = true
    error.value = null
    
    try {
      console.log('Fetching articles from Supabase...')
      const { data, error: fetchError, count } = await supabase
        .from('news')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1)

      if (fetchError) {
        console.error('Supabase error:', fetchError)
        throw fetchError
      }

      console.log('Fetched articles count:', data?.length)
      console.log('Total count:', count)

      if (page === 1) {
        articles.value = data || []
      } else {
        articles.value = [...articles.value, ...(data || [])]
      }

      if (count !== null) {
        totalArticles.value = count
      }
    } catch (err) {
      console.error('Error in fetchArticles:', err)
      error.value = 'Failed to fetch articles'
    } finally {
      isLoading.value = false
      console.log('Fetch complete, isLoading:', isLoading.value)
    }
  }

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const setActiveCategory = (category: string) => {
    activeCategory.value = category
    currentPage.value = 1
  }

  const filteredArticles = computed(() => {
    if (activeCategory.value === 'all') {
      return articles.value
    }
    return articles.value.filter(article => article.category === activeCategory.value)
  })

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const past = new Date(date)
    const diffTime = Math.abs(now.getTime() - past.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Өчигдөр'
    if (diffDays < 7) return `${diffDays} өдрийн өмнө`
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} 7 хоногийн өмнө`
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} сарын өмнө`
    }
    const years = Math.floor(diffDays / 365)
    return `${years} жилийн өмнө`
  }

  const toggleLike = async (article: Article) => {
    try {
      const newLikeStatus = !article.liked
      const newLikesCount = article.likes + (newLikeStatus ? 1 : -1)

      const { error: updateError } = await supabase
        .from('news')
        .update({ 
          likes: newLikesCount,
          liked: newLikeStatus 
        })
        .eq('id', article.id)

      if (updateError) throw updateError

      // Update local state
      article.liked = newLikeStatus
      article.likes = newLikesCount
    } catch (err) {
      console.error('Error toggling like:', err)
      throw err
    }
  }

  const loadMoreArticles = async () => {
    const nextPage = currentPage.value + 1
    await fetchArticles(nextPage)
    currentPage.value = nextPage
  }

  const getArticleBySlug = async (slug: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .single()

      if (fetchError) throw fetchError

      return data
    } catch (err) {
      console.error('Error fetching article:', err)
      error.value = 'Failed to fetch article'
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    articles,
    currentPage,
    itemsPerPage,
    isLoading,
    error,
    activeCategory,
    totalArticles,
    hasMoreArticles,
    featuredArticles,
    paginatedArticles,
    fetchArticles,
    setCurrentPage,
    setActiveCategory,
    getTimeAgo,
    toggleLike,
    loadMoreArticles,
    getArticleBySlug,
    filteredArticles
  }
})