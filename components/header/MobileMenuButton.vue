<template>
  <button 
    class="menu-button" 
    @click="$emit('click')" 
    :class="{ 'is-active': isActive }"
    aria-label="Toggle menu"
  >
    <div class="hamburger-lines">
      <span class="line line1"></span>
      <span class="line line2"></span>
      <span class="line line3"></span>
    </div>
  </button>
  <InfoLinks v-if="isActive" @close="$emit('close')" />
</template>

<script setup lang="ts">
import InfoLinks from './InfoLinks.vue'

defineProps<{
  isActive: boolean
}>()
</script>

<style scoped>
.menu-button {
  @apply lg:hidden flex items-center justify-center;
  @apply absolute right-4 top-1/2 -translate-y-1/2;
  @apply hover:bg-accent/10 rounded-md;
  width: 40px;
  height: 40px;
  z-index: 60;
}

.hamburger-lines {
  width: 18px;
  height: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  display: block;
  height: 1.5px;
  width: 100%;
  @apply bg-black dark:bg-white;
  transition: all 0.25s ease;
  transform-origin: 0% 50%;
}

.menu-button.is-active {
  .line1 {
    transform: rotate(45deg);
    width: 19px;
  }
  
  .line2 {
    transform: scaleX(0);
    opacity: 0;
  }
  
  .line3 {
    transform: rotate(-45deg);
    width: 19px;
  }
}
</style>
