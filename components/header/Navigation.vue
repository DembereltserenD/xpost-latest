<template>
  <nav class="nav-links" :class="{ 'nav-active': isMenuOpen }">
    <div class="dropdown group" v-click-outside="closeDropdown">
        <button class="dropbtn" @click="toggleDropdown" :class="{ 'active': isDropdownOpen }">
            <span>{{ selectedCategory || 'Мэдээ' }}</span>
            <ChevronDown class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" />
        </button>
        <div class="dropdown-content" v-show="isDropdownOpen">
            <a 
              v-for="(item, index) in categories" 
              :key="index"
              href="#" 
              @click.prevent="selectCategory(item.name)"
              class="dropdown-item"
              :class="{ 'active': currentRoute === item.route }"
            >
                <component :is="item.icon" class="w-4 h-4 transition-transform duration-200" />
                <span>{{ item.name }}</span>
            </a>
        </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '~/stores/news'
import { 
  ChevronDown, 
  Laptop, 
  Newspaper, 
  Phone, 
  Settings2, 
  Trophy, 
  Briefcase 
} from 'lucide-vue-next'

const props = defineProps<{
  isMenuOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()
const currentRoute = computed(() => route.path)

const newsStore = useNewsStore()
const isDropdownOpen = ref(false)
const selectedCategory = ref('')

const categories = [
  { name: 'Технологи', icon: Laptop, route: '/technology' },
  { name: 'Улс төр', icon: Newspaper, route: '/politics' },
  { name: 'Эрүүл мэнд', icon: Phone, route: '/health' },
  { name: 'Эдийн засаг', icon: Settings2, route: '/economy' },
  { name: 'Спорт', icon: Trophy, route: '/sports' },
  { name: 'Бизнес', icon: Briefcase, route: '/business' }
]

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown() {
  isDropdownOpen.value = false
}

function selectCategory(category: string) {
  selectedCategory.value = category
  newsStore.fetchLatestArticles(category)
  closeDropdown()
  closeMenu()
}

function closeMenu() {
  emit('close')
}

const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.nav-links {
  @apply flex items-center;
  height: 100%;
}

.dropdown {
  @apply relative inline-block;
}

.dropbtn {
  @apply flex items-center gap-2 px-3 py-2 rounded-md;
  @apply text-foreground/80 hover:text-foreground;
  @apply transition-all duration-200;
  @apply hover:bg-accent/50;
  @apply text-sm font-medium;
}

.dropbtn.active {
  @apply bg-accent/30 text-foreground;
}

.dropdown-content {
  @apply absolute left-0 mt-1;
  @apply bg-background border border-border;
  @apply rounded-lg shadow-lg;
  @apply min-w-[200px] max-w-[250px];
  @apply z-[100];
  @apply py-1;
  max-height: calc(90vh - var(--header-height) - var(--ticker-height));
  overflow-y: auto;
}

.dropdown-item {
  @apply flex items-center gap-2 px-3 py-2;
  @apply text-sm text-foreground/80 hover:text-foreground;
  @apply transition-all duration-200;
  @apply hover:bg-accent/50;
  @apply w-full truncate;
}

.dropdown-item.active {
  @apply bg-accent/30 text-foreground;
}

/* Mobile styles */
@media (max-width: 1023px) {
  .dropdown-content {
    @apply relative w-full max-w-full mt-0;
    @apply border-0 shadow-none bg-transparent;
    max-height: none;
    overflow-y: visible;
  }
  
  .dropdown-item {
    @apply px-4;
  }
}
</style>