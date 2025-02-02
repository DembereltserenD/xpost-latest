<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex items-center space-x-4">
        <div v-if="author" class="flex-1">
          <h1 class="text-2xl font-bold">{{ author.full_name || author.username }}</h1>
          <p class="text-gray-600">{{ author.email }}</p>
          <div class="mt-4 prose max-w-none" v-if="author.bio">
            {{ author.bio }}
          </div>
        </div>
      </div>
      
      <div class="mt-8" v-if="posts && posts.length">
        <h2 class="text-xl font-semibold mb-4">Нийтлэлүүд</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow">
            <NuxtLink :to="`/news/${post.slug}`" class="block">
              <img v-if="post.cover_image" :src="post.cover_image" :alt="post.title" class="w-full h-48 object-cover rounded-t-lg">
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">{{ post.title }}</h3>
                <p class="text-gray-600 text-sm">{{ post.excerpt }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div v-else-if="author" class="mt-8 text-center text-gray-600">
        Одоогоор нийтлэл байхгүй байна.
      </div>
      
      <div v-else class="mt-8 text-center text-gray-600">
        Зохиогч олдсонгүй.
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()

const author = ref(null)
const posts = ref([])

// Fetch author and their posts
onMounted(async () => {
  try {
    // Get author details
    const { data: authorData, error: authorError } = await supabase
      .from('users')
      .select('*')
      .eq('username', route.params.username)
      .single()
    
    if (authorError) throw authorError
    author.value = authorData
    
    if (author.value) {
      // Get author's posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', author.value.id)
        .order('created_at', { ascending: false })
      
      if (postsError) throw postsError
      posts.value = postsData
    }
  } catch (error) {
    console.error('Error fetching author data:', error)
  }
})
</script>
