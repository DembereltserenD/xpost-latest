<template>
  <nav class="nav-links" :class="{ 'nav-active': isMenuOpen }">
    <NuxtLink 
      v-for="(link, index) in navLinks" 
      :key="index" 
      :to="link.to"
      :class="{ active: isActive(link.to) }"
      @click="closeMenu"
    >
      {{ link.text }}
    </NuxtLink>
    <div class="dropdown">
        <button class="dropbtn flex items-center gap-2">
            <span>Мэдээ</span>
            <ChevronDown class="w-4 h-4" />
        </button>
        <div class="dropdown-content">
            <a href="#" @click.prevent="sortNews('Технологи')" class="dropdown-item">
                <Laptop class="w-4 h-4" />
                <span>Технологи</span>
            </a>
            <a href="#" @click.prevent="sortNews('Улс төр')" class="dropdown-item">
                <Building2 class="w-4 h-4" />
                <span>Улс төр</span>
            </a>
            <a href="#" @click.prevent="sortNews('Эрүүл мэнд')" class="dropdown-item">
                <Heart class="w-4 h-4" />
                <span>Эрүүл мэнд</span>
            </a>
            <a href="#" @click.prevent="sortNews('Эдийн засаг')" class="dropdown-item">
                <TrendingUp class="w-4 h-4" />
                <span>Эдийн засаг</span>
            </a>
            <a href="#" @click.prevent="sortNews('Спорт')" class="dropdown-item">
                <Trophy class="w-4 h-4" />
                <span>Спорт</span>
            </a>
            <a href="#" @click.prevent="sortNews('Бизнес')" class="dropdown-item">
                <Briefcase class="w-4 h-4" />
                <span>Бизнес</span>
            </a>
        </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCategoryStore } from '~/stores/categoryStore'
import { useNewsStore } from '~/stores/news.ts'
import { 
    ChevronDown, 
    Laptop, 
    Building2, 
    Heart, 
    TrendingUp, 
    Trophy, 
    Briefcase 
} from 'lucide-vue-next'

const props = defineProps<{
  isMenuOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const categoryStore = useCategoryStore()
const newsStore = useNewsStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

const navLinks = computed(() => {
  return categoryStore.categories
    .filter(category => category.name !== 'News') // Exclude the general "News" category
    .map(category => ({
      text: category.name_mn,
      to: `/category/${category.slug}`
    }))
})

function closeMenu() {
  emit('close')
}

function isActive(path: string) {
  return window.location.pathname === path
}

function sortNews(category: string) {
  newsStore.setActiveCategory(category);
  closeMenu();
}
</script>

<style scoped>
.nav-links {
  @apply hidden lg:flex items-center space-x-1;
}

.nav-links a {
  @apply px-4 py-2 text-sm font-medium rounded-md text-foreground/80 hover:text-foreground;
  @apply hover:bg-accent transition-colors duration-200;
}

.nav-links a.active {
  @apply text-foreground bg-accent/80;
}

.dropdown {
  @apply relative inline-block;
}

.dropbtn {
  @apply px-4 py-2 text-sm font-medium rounded-md text-foreground/80;
  @apply hover:text-foreground hover:bg-accent transition-all duration-200;
  @apply flex items-center gap-2;
}

.dropdown-content {
  @apply absolute right-0 mt-2 w-48 rounded-md shadow-lg;
  @apply bg-background border border-border;
  @apply invisible opacity-0 translate-y-2;
  @apply transition-all duration-200 ease-out;
  z-index: 50;
}

.dropdown:hover .dropdown-content {
  @apply visible opacity-100 translate-y-0;
}

.dropdown-item {
  @apply flex items-center gap-3 px-4 py-3 text-sm text-foreground/80;
  @apply hover:bg-accent hover:text-foreground transition-colors duration-150;
  @apply first:rounded-t-md last:rounded-b-md;
}

@media (max-width: 1023px) {
  .nav-links {
    @apply fixed inset-0 top-[var(--header-height)+var(--ticker-height)] bg-background;
    @apply flex-col items-start space-x-0 space-y-2 p-4;
    @apply transform -translate-x-full transition-transform duration-200;
    z-index: 55;
  }

  .nav-links.nav-active {
    @apply translate-x-0;
  }

  .nav-links a {
    @apply w-full text-base;
  }

  .dropdown-content {
    @apply static w-full mt-0 shadow-none border-none bg-transparent;
    @apply visible opacity-100 translate-y-0;
  }

  .dropdown-item {
    @apply px-6 py-3;
  }
}
</style>
