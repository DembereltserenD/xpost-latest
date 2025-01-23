<template>
  <div class="container-custom py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Шинэ мэдээ</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Гарчиг
        </label>
        <input
          v-model="form.title"
          type="text"
          required
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Мэдээний гарчиг..."
        >
      </div>

      <!-- Slug -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Slug
        </label>
        <input
          v-model="form.slug"
          type="text"
          required
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          placeholder="medee-garchig"
        >
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Ангилал
        </label>
        <select
          v-model="form.category_id"
          required
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Ангилал сонгох</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Summary -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Хураангуй
        </label>
        <textarea
          v-model="form.summary"
          rows="3"
          required
          class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Мэдээний товч агуулга..."
        ></textarea>
      </div>

      <!-- Featured Image -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Зураг
        </label>
        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
          <div class="space-y-1 text-center">
            <!-- Image Preview with Watermark -->
            <div v-if="imagePreview" class="mb-4">
              <div class="relative inline-block">
                <img 
                  :src="imagePreview" 
                  alt="Preview" 
                  class="mx-auto h-48 object-cover rounded"
                >
                <div 
                  v-if="form.use_watermark"
                  class="absolute text-white text-xl font-bold bg-black bg-opacity-50 px-3 py-1"
                  :class="{
                    'top-2 right-2': form.watermark_position === 'top-right',
                    'top-2 left-2': form.watermark_position === 'top-left',
                    'bottom-2 right-2': form.watermark_position === 'bottom-right',
                    'bottom-2 left-2': form.watermark_position === 'bottom-left'
                  }"
                >
                  Xpost
                </div>
              </div>
            </div>
            <div class="flex text-sm text-gray-600 dark:text-gray-400">
              <label class="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Зураг оруулах</span>
                <input 
                  type="file" 
                  class="sr-only" 
                  accept="image/*"
                  @change="handleImageChange"
                  required
                >
              </label>
              <p class="pl-1">эсвэл чирж оруулах</p>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF дээд хэмжээ 10MB
            </p>
          </div>
        </div>

        <!-- Watermark Options -->
        <div class="mt-4 space-y-4">
          <div class="flex items-center">
            <input
              v-model="form.use_watermark"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Усан тэмдэг нэмэх
            </label>
          </div>

          <!-- Watermark Position -->
          <div v-if="form.use_watermark" class="pl-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Усан тэмдгийн байрлал
            </label>
            <div class="space-y-2">
              <div class="flex items-center">
                <input
                  v-model="form.watermark_position"
                  type="radio"
                  value="top-right"
                  class="h-4 w-4 text-blue-600 border-gray-300"
                >
                <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Дээд баруун
                </label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="form.watermark_position"
                  type="radio"
                  value="top-left"
                  class="h-4 w-4 text-blue-600 border-gray-300"
                >
                <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Дээд зүүн
                </label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="form.watermark_position"
                  type="radio"
                  value="bottom-right"
                  class="h-4 w-4 text-blue-600 border-gray-300"
                >
                <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Доод баруун
                </label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="form.watermark_position"
                  type="radio"
                  value="bottom-left"
                  class="h-4 w-4 text-blue-600 border-gray-300"
                >
                <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Доод зүүн
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Агуулга
        </label>
        <client-only>
          <Editor
            v-model="form.content"
            :api-key="config.public.tinymceApiKey"
            :init="{
              height: 500,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }'
            }"
          />
        </client-only>
      </div>

      <!-- Status and Featured -->
      <div class="flex space-x-4">
        <div class="flex items-center">
          <input
            v-model="form.is_published"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          >
          <label class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            Нийтлэх
          </label>
        </div>
        <div class="flex items-center">
          <input
            v-model="form.is_featured"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          >
          <label class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            Онцлох
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Хадгалж байна...</span>
          <span v-else>Хадгалах</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import Editor from '@tinymce/tinymce-vue'
import { useRouter } from 'vue-router'

const config = useRuntimeConfig()
const router = useRouter()
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

const categories = ref([])
const imagePreview = ref('')
const isSubmitting = ref(false)

const form = ref({
  title: '',
  slug: '',
  summary: '',
  content: '',
  category_id: '',
  featured_image: null as File | null,
  is_published: false,
  is_featured: false,
  use_watermark: false,
  watermark_position: 'top-right'
})

// Fetch categories on mount
const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      console.warn('No categories found')
    }
    
    categories.value = data || []
  } catch (err) {
    console.error('Error fetching categories:', err)
    alert(`Ангилал ачаалахад алдаа гарлаа: ${err.message}`)
  }
}

// Handle image selection
const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('Зургийн хэмжээ 10MB-с хэтрэхгүй байх ёстой')
      return
    }

    form.value.featured_image = file
    const reader = new FileReader()
    reader.onload = e => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Generate slug from title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Watch title changes to auto-generate slug
watch(() => form.value.title, (newTitle) => {
  if (!form.value.slug) {
    form.value.slug = generateSlug(newTitle)
  }
})

// Handle form submission
const handleSubmit = async () => {
  try {
    isSubmitting.value = true

    // First upload the image
    let featured_image_url = null
    if (form.value.featured_image) {
      const fileExt = form.value.featured_image.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `news/${fileName}`
      
      // If watermark is enabled, add it to the image
      if (form.value.use_watermark) {
        const canvas = document.createElement('canvas')
        const img = new Image()
        
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = imagePreview.value
        })

        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        
        // Draw the original image
        ctx.drawImage(img, 0, 0)
        
        // Add watermark
        ctx.font = 'bold 36px Arial'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.lineWidth = 2
        
        const watermarkText = 'Xpost'
        const metrics = ctx.measureText(watermarkText)
        const padding = 20
        
        let x, y
        if (form.value.watermark_position === 'top-right') {
          x = canvas.width - metrics.width - padding
          y = padding + 36 // font size
        } else if (form.value.watermark_position === 'top-left') {
          x = padding
          y = padding + 36
        } else if (form.value.watermark_position === 'bottom-right') {
          x = canvas.width - metrics.width - padding
          y = canvas.height - padding
        } else {
          x = padding
          y = canvas.height - padding
        }
        
        ctx.strokeText(watermarkText, x, y)
        ctx.fillText(watermarkText, x, y)
        
        // Convert canvas to blob
        const blob = await new Promise<Blob>(resolve => {
          canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.95)
        })
        
        // Upload the watermarked image
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, blob)

        if (uploadError) {
          console.error('Image upload error:', uploadError)
          throw new Error(`Image upload failed: ${uploadError.message}`)
        }
      } else {
        // Upload original image
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, form.value.featured_image)

        if (uploadError) {
          console.error('Image upload error:', uploadError)
          throw new Error(`Image upload failed: ${uploadError.message}`)
        }
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      featured_image_url = publicUrl
    }

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) {
      console.error('User fetch error:', userError)
      throw new Error(`Failed to get user: ${userError.message}`)
    }
    if (!user) throw new Error('User not found')

    // Then create the news entry
    const newsData = {
      title: form.value.title,
      slug: form.value.slug,
      summary: form.value.summary,
      content: form.value.content,
      category_id: form.value.category_id,
      featured_image: featured_image_url,
      is_published: form.value.is_published,
      is_featured: form.value.is_featured,
      author_id: user.id
    }
    
    console.log('Inserting news with data:', newsData)
    
    const { error: insertError } = await supabase
      .from('news')
      .insert(newsData)

    if (insertError) {
      console.error('News insert error:', insertError)
      throw new Error(`Failed to create news: ${insertError.message}`)
    }

    // Redirect to news list
    router.push('/admin/news')
  } catch (err) {
    console.error('Error creating news:', err)
    alert(`Алдаа гарлаа: ${err.message}`)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchCategories()
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin']
})
</script>