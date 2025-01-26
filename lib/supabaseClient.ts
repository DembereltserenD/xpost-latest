import { useSupabaseClient } from '#imports'

// Categories helper functions
export const getCategories = async () => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from('categories')
    .select('id, name, slug')
    .order('name')
  
  if (error) {
    console.error('Error fetching categories:', error)
    throw new Error(`Failed to fetch categories: ${error.message}`)
  }
  return data
}

// News helper functions
export const getNewsArticles = async () => {
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
        created_at
      `)
      .order('created_at', { ascending: false })

    if (newsError) throw newsError

    // Then get categories for the news items
    const { data: categories, error: catError } = await client
      .from('categories')
      .select('id, name')

    if (catError) throw catError

    // Combine the data
    return newsData.map(news => ({
      ...news,
      category: categories.find(cat => cat.id === news.category_id)
    }))
  } catch (error) {
    console.error('Error fetching news:', error)
    throw new Error(`Failed to fetch news: ${error.message}`)
  }
}

export const getNewsArticleById = async (id: string) => {
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

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching news article:', error)
    throw new Error(`Failed to fetch news article: ${error.message}`)
  }
}

export const createNewsArticle = async (newsData: any) => {
  const client = useSupabaseClient()
  try {
    const { data, error } = await client
      .from('news')
      .insert({
        title: newsData.title,
        slug: newsData.slug,
        content: newsData.content,
        excerpt: newsData.excerpt,
        category_id: newsData.category_id,
        status: newsData.status || 'draft'
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating news:', error)
    throw new Error(`Failed to create news: ${error.message}`)
  }
}

export const updateNewsArticle = async (id: string, newsData: any) => {
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

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating news:', error)
    throw new Error(`Failed to update news: ${error.message}`)
  }
}

export const deleteNewsArticle = async (id: string) => {
  const client = useSupabaseClient()
  try {
    const { error } = await client
      .from('news')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting news:', error)
    throw new Error(`Failed to delete news: ${error.message}`)
  }
}
