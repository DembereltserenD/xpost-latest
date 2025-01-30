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
        <p>Xpost.mn - Бүх эрх хуулиар хамгаалагдсан &copy; {{ new Date().getFullYear() }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { markRaw } from 'vue'
import PlaceholderImage from './PlaceholderImage.vue'
import FacebookIcon from './icons/FacebookIcon.vue'
import TwitterIcon from './icons/TwitterIcon.vue'
import InstagramIcon from './icons/InstagramIcon.vue'
import YoutubeIcon from './icons/YoutubeIcon.vue'

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
    icon: markRaw(FacebookIcon)
  },
  {
    label: 'Twitter',
    link: '#',
    icon: markRaw(TwitterIcon)
  },
  {
    label: 'Instagram',
    link: '#',
    icon: markRaw(InstagramIcon)
  },
  {
    label: 'Youtube',
    link: '#',
    icon: markRaw(YoutubeIcon)
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