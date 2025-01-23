<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <AdminHeader />
    
    <main class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Welcome Section -->
        <div class="md:flex md:items-center md:justify-between mb-8">
          <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
              Хянах самбар
            </h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Сайн байна уу, {{ userEmail }}, Энэ өдрийн мэдээ, статистик.
            </p>
          </div>
          <div class="mt-4 flex md:mt-0 md:ml-4">
            <NuxtLink to="/admin/posts/create" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              + Шинэ мэдээ
            </NuxtLink>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="mt-8">
          <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div class="absolute bg-blue-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Нийт үзэлт</p>
              </dt>
              <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ totalViews }}
                </p>
              </dd>
            </div>

            <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div class="absolute bg-green-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Нийт мэдээ</p>
              </dt>
              <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ totalPosts }}
                </p>
              </dd>
            </div>

            <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div class="absolute bg-red-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Өнөөдрийн мэдээ</p>
              </dt>
              <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                  {{ todayPosts }}
                </p>
              </dd>
            </div>
          </dl>
        </div>

        <!-- Recent Posts Section -->
        <div class="mt-8">
          <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Сүүлийн мэдээнүүд
              </h3>
              <select
                v-model="sortBy"
                class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">Шинэ нь эхэндээ</option>
                <option value="oldest">Хуучин нь эхэндээ</option>
                <option value="featured">Онцлох эхэндээ</option>
              </select>
            </div>

            <div class="border-t border-gray-200 dark:border-gray-700">
              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                <li v-for="post in sortedPosts" :key="post.id" class="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                        {{ post.title }}
                      </p>
                      <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {{ post.content }}
                      </p>
                      <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <div class="flex items-center">
                          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {{ new Date(post.created_at).toLocaleDateString('mn-MN') }}
                        </div>
                        <div class="flex items-center">
                          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {{ post.category }}
                        </div>
                        <div class="flex items-center">
                          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {{ post.views }} үзсэн
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button
                        @click="toggleFeatured(post.id, !post.is_featured)"
                        class="px-3 py-1 text-sm rounded-full"
                        :class="post.is_featured ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                      >
                        {{ post.is_featured ? 'Онцлох' : 'Энгийн' }}
                      </button>
                      <NuxtLink
                        :to="`/admin/posts/${post.id}/edit`"
                        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        Засах
                      </NuxtLink>
                      <button
                        @click="deletePost(post.id)"
                        class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        Устгах
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  views: number;
  created_at: string;
}

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const userEmail = computed(() => user.value?.email || 'Admin')
const posts = ref<Post[]>([])
const sortBy = ref('newest')
const totalPosts = ref(0)
const todayPosts = ref(0)
const totalViews = ref(0)

// Fetch stats
const fetchStats = async () => {
  try {
    console.log('Fetching stats...')
    
    // Get total published posts count
    const { count: postsCount, error: postsError } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)
    
    if (postsError) {
      console.error('Error fetching total posts:', postsError)
      return
    }
    
    // Get today's news count
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { count: todayCount, error: todayError } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)
      .gte('published_at', today.toISOString())
    
    if (todayError) {
      console.error('Error fetching today\'s news:', todayError)
      return
    }
    
    // Get total views count
    const { data: viewsData, error: viewsError } = await supabase
      .from('news')
      .select('views')
      .eq('is_published', true)
    
    if (viewsError) {
      console.error('Error fetching views:', viewsError)
      return
    }

    totalPosts.value = postsCount || 0
    todayPosts.value = todayCount || 0
    totalViews.value = viewsData?.reduce((sum, post) => sum + (Number(post.views) || 0), 0) || 0

    console.log('Stats fetched successfully:', {
      totalPosts: totalPosts.value,
      todayPosts: todayPosts.value,
      totalViews: totalViews.value
    })

  } catch (err) {
    console.error('Error fetching stats:', err)
  }
}

// Fetch recent posts
const fetchPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw error
    posts.value = data || []
  } catch (err) {
    console.error('Error fetching posts:', err)
  }
}

// Sort posts based on selected option
const sortedPosts = computed(() => {
  const sorted = [...posts.value]
  switch (sortBy.value) {
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    case 'featured':
      return sorted.filter(post => post.is_featured)
    default: // newest
      return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }
})

// Toggle featured news status
const toggleFeatured = async (id: number, isFeatured: boolean) => {
  try {
    const { error } = await supabase
      .from('news')
      .update({ is_featured: isFeatured })
      .eq('id', id)

    if (error) throw error
    await Promise.all([fetchPosts(), fetchStats()])
  } catch (err) {
    console.error('Error updating post:', err)
  }
}

// Delete post
const deletePost = async (id: number) => {
  if (!confirm('Энэ мэдээг устгахдаа итгэлтэй байна уу?')) return

  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) throw error
    await Promise.all([fetchPosts(), fetchStats()])
  } catch (err) {
    console.error('Error deleting post:', err)
  }
}

onMounted(() => {
  fetchPosts()
  fetchStats()
})

definePageMeta({
  middleware: ['admin'],
  layout: 'admin'
})
</script>
