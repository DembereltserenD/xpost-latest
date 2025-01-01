<template>
  <footer class="footer">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="footer-brand">
          <NuxtLink to="/" class="inline-block">
            <PlaceholderImage :width="150" :height="50" alt="xpost.mn logo" />
          </NuxtLink>
          <p class="mt-4 text-sm">
            xpost.mn нь Монголын мэдээллийн тэргүүлэх портал сайт бөгөөд өдөр тутмын мэдээ, мэдээлэл, нийтлэл, подкаст, видео контентоор үйлчилж байна.
          </p>
        </div>
        <nav class="footer-links">
          <h3 class="text-lg font-semibold mb-4">Цэс</h3>
          <ul class="space-y-2">
            <li v-for="(link, index) in menuLinks" :key="index">
              <NuxtLink :to="link.to" class="hover:text-white transition-colors duration-300">
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <nav class="footer-links">
          <h3 class="text-lg font-semibold mb-4">Бусад</h3>
          <ul class="space-y-2">
            <li v-for="(link, index) in otherLinks" :key="index">
              <NuxtLink :to="link.to" class="hover:text-white transition-colors duration-300">
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="footer-social">
          <h3 class="text-lg font-semibold mb-4">Биднийг дагаарай</h3>
          <div class="flex space-x-4">
            <a 
              v-for="(social, index) in socialLinks" 
              :key="index" 
              :href="social.link" 
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <component :is="social.icon" class="w-6 h-6" />
            </a>
          </div>
          <div class="mt-6">
            <h4 class="text-sm font-semibold mb-2">Имэйл мэдээ авах</h4>
            <form @submit.prevent="subscribeNewsletter" class="flex">
              <input 
                type="email" 
                v-model="emailSubscribe" 
                placeholder="Имэйл хаяг" 
                class="bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                required
              >
              <button 
                type="submit" 
                class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-300"
              >
                Бүртгүүлэх
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
        <p>Xpost.mn - Бүх эрх хуулиар хамгаалагдсан © {{ new Date().getFullYear() }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaceholderImage from './PlaceholderImage.vue'

const menuLinks = ref([
  { text: 'Нүүр', to: '/' },
  { text: 'Улс төр', to: '/politics' },
  { text: 'Эдийн засаг', to: '/economy' },
  { text: 'Нийгэм', to: '/society' },
  { text: 'Спорт', to: '/sports' },
])

const otherLinks = ref([
  { text: 'Бидний тухай', to: '/about' },
  { text: 'Үйлчилгээний нөхцөл', to: '/terms' },
  { text: 'Нууцлалын бодлого', to: '/privacy' },
  { text: 'Холбоо барих', to: '/contact' },
  { text: 'Сурталчилгаа байршуулах', to: '/advertise' },
])

const socialLinks = ref([
  {
    label: 'Facebook',
    link: '#',
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`
    })
  },
  {
    label: 'Twitter',
    link: '#',
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`
    })
  },
  {
    label: 'Instagram',
    link: '#',
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`
    })
  },
  {
    label: 'YouTube',
    link: '#',
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`
    })
  }
])

const emailSubscribe = ref('')

const subscribeNewsletter = () => {
  console.log('Subscribing email:', emailSubscribe.value)
  emailSubscribe.value = ''
}
</script>

<style scoped>
.footer {
  @apply bg-card text-card-foreground py-8 border-t border-border/10;
}

.footer-brand {
  @apply col-span-full lg:col-span-1;
}

.footer-brand p {
  @apply text-muted-foreground;
}

.footer-links h3 {
  @apply text-lg font-semibold mb-4 text-foreground;
}

.footer-links a {
  @apply text-muted-foreground hover:text-foreground transition-colors duration-300;
}

.footer-social h3 {
  @apply text-lg font-semibold mb-4 text-foreground;
}

.footer-social a {
  @apply text-muted-foreground hover:text-foreground;
}

@media (min-width: 768px) {
  .footer-grid {
    @apply grid-cols-2;
  }

  .footer-brand {
    @apply col-span-2;
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    @apply grid-cols-4;
  }

  .footer-brand {
    @apply col-span-1;
  }
}
</style>