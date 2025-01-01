&lt;template&gt;
  &lt;div class=&quot;mobile-menu fixed inset-0 z-50 bg-white dark:bg-gray-900&quot; v-if=&quot;isOpen&quot;&gt;
    &lt;!-- Header --&gt;
    &lt;div class=&quot;bg-blue-600 dark:bg-blue-800 px-4 py-3 flex items-center justify-between&quot;&gt;
      &lt;NuxtLink to=&quot;/&quot; class=&quot;flex-shrink-0&quot; @click=&quot;$emit('close')&quot;&gt;
        &lt;img src=&quot;/images/logo.svg&quot; alt=&quot;Logo&quot; class=&quot;h-8&quot; /&gt;
      &lt;/NuxtLink&gt;
      &lt;button @click=&quot;$emit('close')&quot; class=&quot;text-white p-2&quot;&gt;
        &lt;XIcon class=&quot;w-6 h-6&quot; /&gt;
      &lt;/button&gt;
    &lt;/div&gt;

    &lt;!-- Search Bar --&gt;
    &lt;div class=&quot;px-4 py-3 border-b dark:border-gray-700&quot;&gt;
      &lt;div class=&quot;relative&quot;&gt;
        &lt;input 
          type=&quot;search&quot; 
          placeholder=&quot;Хайх&quot;
          class=&quot;w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500&quot;
        &gt;
        &lt;SearchIcon class=&quot;absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400&quot; /&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- Menu Items --&gt;
    &lt;div class=&quot;overflow-y-auto h-[calc(100vh-180px)]&quot;&gt;
      &lt;!-- Weather Info --&gt;
      &lt;div class=&quot;px-4 py-3 border-b dark:border-gray-700&quot;&gt;
        &lt;NuxtLink to=&quot;/weather&quot; class=&quot;flex items-center space-x-3&quot; @click=&quot;$emit('close')&quot;&gt;
          &lt;CloudIcon class=&quot;w-6 h-6 text-yellow-500&quot; /&gt;
          &lt;div&gt;
            &lt;div class=&quot;text-lg font-medium&quot;&gt;{{ weatherTemp }}°C&lt;/div&gt;
            &lt;div class=&quot;text-sm text-gray-500 dark:text-gray-400&quot;&gt;Цаг агаар&lt;/div&gt;
          &lt;/div&gt;
        &lt;/NuxtLink&gt;
      &lt;/div&gt;

      &lt;!-- Main Menu Items --&gt;
      &lt;nav class=&quot;py-2&quot;&gt;
        &lt;NuxtLink 
          v-for=&quot;(item, index) in menuItems&quot; 
          :key=&quot;index&quot;
          :to=&quot;item.to&quot;
          class=&quot;flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800&quot;
          @click=&quot;$emit('close')&quot;
        &gt;
          &lt;component :is=&quot;item.icon&quot; class=&quot;w-6 h-6 mr-3 text-gray-500&quot; /&gt;
          &lt;span&gt;{{ item.text }}&lt;/span&gt;
        &lt;/NuxtLink&gt;
      &lt;/nav&gt;

      &lt;!-- Social Links --&gt;
      &lt;div class=&quot;px-4 py-4 border-t dark:border-gray-700 mt-auto&quot;&gt;
        &lt;div class=&quot;flex justify-center space-x-6&quot;&gt;
          &lt;a href=&quot;#&quot; class=&quot;text-gray-600 hover:text-blue-600 dark:text-gray-400&quot;&gt;
            &lt;FacebookIcon class=&quot;w-6 h-6&quot; /&gt;
          &lt;/a&gt;
          &lt;a href=&quot;#&quot; class=&quot;text-gray-600 hover:text-blue-400 dark:text-gray-400&quot;&gt;
            &lt;TwitterIcon class=&quot;w-6 h-6&quot; /&gt;
          &lt;/a&gt;
          &lt;a href=&quot;#&quot; class=&quot;text-gray-600 hover:text-red-600 dark:text-gray-400&quot;&gt;
            &lt;YoutubeIcon class=&quot;w-6 h-6&quot; /&gt;
          &lt;/a&gt;
          &lt;a href=&quot;#&quot; class=&quot;text-gray-600 hover:text-pink-600 dark:text-gray-400&quot;&gt;
            &lt;InstagramIcon class=&quot;w-6 h-6&quot; /&gt;
          &lt;/a&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { XIcon, SearchIcon, CloudIcon, NewspaperIcon, TrendingUpIcon, StarIcon, FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from '@heroicons/vue/outline'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  weatherTemp: {
    type: [Number, String],
    default: '-11'
  }
})

defineEmits(['close'])

const menuItems = [
  { text: 'Мэдээ', to: '/news', icon: NewspaperIcon },
  { text: 'Хандалт', to: '/trending', icon: TrendingUpIcon },
  { text: 'Зурхай', to: '/horoscope', icon: StarIcon },
]
&lt;/script&gt;
