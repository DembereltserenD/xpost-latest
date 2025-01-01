<template>
  <div class="sticky-social" :class="{ 'collapsed': isCollapsed }">
    <button @click="toggleCollapse" class="toggle-btn" aria-label="Toggle social bar">
      <ChevronLeft v-if="!isCollapsed" />
      <ChevronRight v-else />
    </button>
    <div class="social-icons-container" :style="socialIconStyles">
      <TransitionGroup name="social-fade">
        <div v-for="icon in socialIcons" :key="icon.name" class="social-icon-wrapper">
          <a 
            :href="icon.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-icon"
            :style="socialIconStyles"
            :title="icon.tooltip"
          >
            <component :is="icon.component" />
          </a>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Facebook, Twitter, Linkedin, Link2, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useColorMode } from '#imports'

const isCollapsed = ref(false)
const socialIcons = ref([
  { name: 'Facebook', component: Facebook, link: '#', tooltip: 'Share on Facebook' },
  { name: 'Twitter', component: Twitter, link: '#', tooltip: 'Share on Twitter' },
  { name: 'LinkedIn', component: Linkedin, link: '#', tooltip: 'Share on LinkedIn' },
  { name: 'Copy Link', component: Link2, link: '#', tooltip: 'Copy article link' },
])

const colorMode = useColorMode()

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const socialIconStyles = computed(() => {
  return {
    backgroundColor: colorMode.value === 'light' ? '#ffffff' : '#2c3e50',
    color: colorMode.value === 'light' ? '#000000' : '#ffffff',
    border: colorMode.value === 'light' ? '1px solid #cccccc' : 'none',
    boxShadow: colorMode.value === 'light' ? '0 0 5px rgba(0, 0, 0, 0.1)' : 'none'
  }
})

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const threshold = 200
  isCollapsed.value = scrollPosition < threshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.sticky-social {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.social-icons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px 0 0 30px;
  padding: 10px;
  backdrop-filter: blur(8px);
}

.social-icon-wrapper {
  margin: 10px 0;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.1);
}

.toggle-btn {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #2c3e50;
  border: none;
  color: white;
  padding: 8px;
  border-radius: 50% 0 0 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background-color: #34495e;
}

.collapsed {
  right: -60px;
}

.collapsed .toggle-btn {
  left: 0;
  border-radius: 50% 0 0 50%;
}

.social-fade-enter-active,
.social-fade-leave-active {
  transition: all 0.5s ease;
}

.social-fade-enter-from,
.social-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media (max-width: 768px) {
  .sticky-social {
    bottom: 20px;
    top: auto;
    right: 20px;
    transform: none;
  }

  .social-icons-container {
    flex-direction: row;
    border-radius: 30px;
  }

  .social-icon-wrapper {
    margin: 0 5px;
  }

  .toggle-btn {
    display: none;
  }

  .collapsed {
    right: 20px;
    bottom: -60px;
  }
}
</style>