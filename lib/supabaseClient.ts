import { useSupabaseClient } from '#imports'
import { SupabaseClient, PostgrestError } from '@supabase/supabase-js'

// Define types for our news article
interface NewsArticle {
  id: string
  title: string
  category_id?: string
  author_id?: string
  is_featured: boolean
  featured_position?: number
}

interface FeaturedArticle {
  id: string
  featured_position: number | null
}

interface DatabaseError {
  message: string
  details: string
  hint: string
  code: string
}

// Helper function to handle Supabase errors
const handleSupabaseError = (error: unknown): never => {
  console.error('Supabase error:', error)
  if (error instanceof Error) {
    throw error
  }
  if ((error as PostgrestError)?.message) {
    throw new Error((error as PostgrestError).message)
  }
  throw new Error('An unknown error occurred')
}

// Categories helper functions
export const getCategories = async (): Promise<any[]> => {
  const client = useSupabaseClient()
  try {
    const { data, error } = await client
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      handleSupabaseError(error)
    }

    return data ?? []
  } catch (error) {
    console.error('Error fetching categories:', error)
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    throw new Error(`Failed to fetch categories: ${message}`)
  }
}

// News helper functions
export const getNewsArticles = async (): Promise<any[]> => {
  const client = useSupabaseClient()
  try {
    // First, get the basic news data
    const { data: newsData, error: newsError } = await client
      .from('news')
      .select(`
        id,
        title,
        slug,
        excerpt,
        category_id,
        status,
        created_at,
        is_featured,
        featured_position
      `)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (newsError) {
      handleSupabaseError(newsError)
    }

    // Then get categories for the news items
    const { data: categoriesData, error: catError } = await client
      .from('categories')
      .select('id, name')

    if (catError) {
      handleSupabaseError(catError)
    }

    const newsDataArray = newsData ?? []
    const categoriesArray = categoriesData ?? []

    // Combine the data
    return newsDataArray.map(news => ({
      ...news,
      category: categoriesArray.find(cat => cat.id === news.category_id)
    }))
  } catch (error) {
    console.error('Error fetching news:', error)
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    throw new Error(`Failed to fetch news: ${message}`)
  }
}

export const getNewsArticleById = async (id: string): Promise<any> => {
  const client = useSupabaseClient()
  try {
    const { data, error } = await client
      .from('news')
      .select(`
        id,
        title,
        slug,
        content,
        excerpt,
        featured_image,
        category_id,
        status,
        created_at,
        categories (
          id,
          name
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      handleSupabaseError(error)
    }

    return data
  } catch (error) {
    console.error('Error fetching news article:', error)
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    throw new Error(`Failed to fetch news article: ${message}`)
  }
}

export const createNewsArticle = async (newsData: any): Promise<any> => {
  const client = useSupabaseClient()
  try {
    // Validate required fields
    if (!newsData.title) throw new Error('Title is required')
    if (!newsData.content) throw new Error('Content is required')
    if (!newsData.category_id) throw new Error('Category is required')

    // Get current user session
    const { data: { session }, error: sessionError } = await client.auth.getSession()
    if (sessionError) throw sessionError
    if (!session) throw new Error('Authentication required')

    const { data, error } = await client
      .from('news')
      .insert({
        title: newsData.title,
        slug: newsData.slug,
        content: newsData.content,
        excerpt: newsData.excerpt || null,
        featured_image: newsData.featured_image || null,
        category_id: newsData.category_id,
        status: newsData.status || 'draft',
        is_featured: newsData.is_featured || false,
        featured_position: newsData.featured_position || null,
        is_published: newsData.is_published || false,
        published_at: newsData.published_at || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23503') {
        throw new Error('Invalid category selected')
      }
      if (error.code === '42501') {
        throw new Error('You do not have permission to create news articles')
      }
      handleSupabaseError(error)
    }

    return data
  } catch (error) {
    console.error('Error creating news:', error)
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    throw new Error(`Failed to create news: ${message}`)
  }
}

export const updateNewsArticle = async (id: string, newsData: any): Promise<any> => {
  const client = useSupabaseClient()
  try {
    const { data, error } = await client
      .from('news')
      .update({
        title: newsData.title,
        slug: newsData.slug,
        content: newsData.content,
        excerpt: newsData.excerpt,
        category_id: newsData.category_id,
        status: newsData.status
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      handleSupabaseError(error)
    }

    return data
  } catch (error) {
    console.error('Error updating news:', error)
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    throw new Error(`Failed to update news: ${message}`)
  }
}

export const deleteNewsArticle = async (supabase: SupabaseClient, id: string): Promise<any> => {
  try {
    console.log('Starting delete process for news:', id)

    // First check if the article exists and get its relationships
    const { data: article, error: fetchError } = await supabase
      .from('news')
      .select(`
        id,
        title,
        category_id,
        author_id,
        is_featured,
        featured_position
      `)
      .eq('id', id)
      .single()

    if (fetchError) {
      handleSupabaseError(fetchError)
    }

    if (!article) {
      throw new Error('Мэдээ олдсонгүй')
    }

    const newsArticle = article as NewsArticle
    console.log('Found article:', newsArticle)

    // If article is featured, we need to reorganize featured positions
    if (newsArticle.is_featured) {
      console.log('Article is featured, reorganizing positions...')
      const { data: featuredArticles, error: featuredError } = await supabase
        .from('news')
        .select('id, featured_position')
        .eq('is_featured', true)
        .neq('id', id)
        .order('featured_position', { ascending: true })

      if (featuredError) {
        handleSupabaseError(featuredError)
      }

      if (featuredArticles) {
        // Reorganize featured positions
        for (let i = 0; i < featuredArticles.length; i++) {
          const { error: updateError } = await supabase
            .from('news')
            .update({ featured_position: i })
            .eq('id', featuredArticles[i].id)

          if (updateError) {
            handleSupabaseError(updateError)
          }
        }
      }
    }

    // Now delete the article
    const { error: deleteError } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (deleteError) {
      handleSupabaseError(deleteError)
    }

    console.log('Successfully deleted article:', newsArticle.title)
    return { success: true }
  } catch (error) {
    console.error('Error in deleteNewsArticle:', error)
    const message = error instanceof Error ? error.message : 'Мэдээг устгах үед алдаа гарлаа'
    return { 
      success: false, 
      error: message
    }
  }
}

export const setNewsAsFeatured = async (supabase: SupabaseClient, newsId: string, position: number): Promise<any> => {
  try {
    console.log('Setting news as featured:', { newsId, position })
    
    // Get current featured articles
    const { data: currentFeatured, error: fetchError } = await supabase
      .from('news')
      .select('id, featured_position')
      .eq('is_featured', true)
      .order('featured_position', { ascending: true })

    if (fetchError) {
      handleSupabaseError(fetchError)
    }

    const featuredArticles = currentFeatured as FeaturedArticle[]
    console.log('Current featured articles:', featuredArticles)

    // If setting as main featured (position 0), handle current main
    if (position === 0) {
      const currentMain = featuredArticles?.find((n: FeaturedArticle) => n.featured_position === 0)
      if (currentMain) {
        console.log('Found current main:', currentMain)
        
        // Find next available small position
        const usedPositions = new Set(
          featuredArticles
            .filter((n: FeaturedArticle) => n.featured_position && n.featured_position > 0)
            .map((n: FeaturedArticle) => n.featured_position)
        )
        let nextPosition = 1
        while (usedPositions.has(nextPosition) && nextPosition <= 3) {
          nextPosition++
        }

        console.log('Moving current main to position:', nextPosition)
        if (nextPosition <= 3) {
          const { error: updateError } = await supabase
            .from('news')
            .update({ featured_position: nextPosition })
            .eq('id', currentMain.id)

          if (updateError) {
            handleSupabaseError(updateError)
          }
        }
      }
    }

    console.log('Updating target article')
    const { error: updateError } = await supabase
      .from('news')
      .update({
        is_featured: true,
        featured_position: position
      })
      .eq('id', newsId)

    if (updateError) {
      handleSupabaseError(updateError)
    }

    console.log('Successfully updated featured status')
    return { success: true }
  } catch (error) {
    console.error('Error setting featured position:', error)
    const message = error instanceof Error ? error.message : 'Онцлох мэдээ тохируулахад алдаа гарлаа'
    return { success: false, error: message }
  }
}

export const removeNewsFromFeatured = async (supabase: SupabaseClient, newsId: string): Promise<any> => {
  try {
    console.log('Removing featured status:', newsId)
    
    // Get the article we're removing
    const { data: article, error: fetchError } = await supabase
      .from('news')
      .select('featured_position')
      .eq('id', newsId)
      .single()

    if (fetchError) {
      handleSupabaseError(fetchError)
    }
    console.log('Article to remove:', article)

    const wasMain = article?.featured_position === 0

    // Remove featured status
    const { error: removeError } = await supabase
      .from('news')
      .update({
        is_featured: false,
        featured_position: null
      })
      .eq('id', newsId)

    if (removeError) {
      handleSupabaseError(removeError)
    }

    if (wasMain) {
      console.log('Removed article was main, reorganizing...')
      // Get remaining featured articles
      const { data: remaining, error: remainingError } = await supabase
        .from('news')
        .select('*')
        .eq('is_featured', true)
        .order('featured_position')

      if (remainingError) {
        handleSupabaseError(remainingError)
      }
      console.log('Remaining featured articles:', remaining)

      const remainingArticles = remaining ?? []
      if (remainingArticles.length > 0) {
        // Promote first small article to main
        const firstSmall = remainingArticles.find(n => n.featured_position > 0)
        if (firstSmall) {
          console.log('Promoting to main:', firstSmall)
          const { error: promoteError } = await supabase
            .from('news')
            .update({ featured_position: 0 })
            .eq('id', firstSmall.id)

          if (promoteError) {
            handleSupabaseError(promoteError)
          }

          // Shift other articles up
          const others = remainingArticles.filter(n => 
            n.id !== firstSmall.id && n.featured_position > 0
          )
          console.log('Shifting others:', others)
          
          for (let i = 0; i < others.length; i++) {
            const { error: shiftError } = await supabase
              .from('news')
              .update({ featured_position: i + 1 })
              .eq('id', others[i].id)

            if (shiftError) {
              handleSupabaseError(shiftError)
            }
          }
        }
      }
    }

    console.log('Successfully removed featured status')
    return { success: true }
  } catch (error) {
    console.error('Error removing featured status:', error)
    return { success: false, error }
  }
}

export const getFeaturedNews = async (supabase: SupabaseClient): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*, category:categories(*)')
      .eq('is_featured', true)
      .order('featured_position', { ascending: true })

    if (error) {
      handleSupabaseError(error)
    }

    return {
      success: true,
      data: {
        main: data?.find(n => n.featured_position === 0),
        small: data?.filter(n => n.featured_position > 0)
          .sort((a, b) => a.featured_position - b.featured_position)
      }
    }
  } catch (error) {
    console.error('Error fetching featured news:', error)
    return { success: false, error }
  }
}
