<template>
  <button
    class="mobile-menu-button flex lg:hidden items-center justify-center p-2 hover:bg-accent/10 rounded-md"
    :class="{ 'is-active': isActive }"
    @click="$emit('click')"
  >
    <div class="hamburger-lines">
      <span class="hamburger-line line1"></span>
      <span class="hamburger-line line2"></span>
      <span class="hamburger-line line3"></span>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  isActive: boolean
}>()

defineEmits(['click'])
</script>

<style scoped>
.mobile-menu-button {
  position: relative;
  width: 48px;
  height: 48px;
  z-index: 60;
}

.hamburger-lines {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-line {
  display: block;
  height: 2.5px;
  width: 100%;
  background-color: currentColor;
  transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
  transform-origin: 0% 50%;
}

.mobile-menu-button.is-active .line1 {
  transform: rotate(45deg) translate(1px, -1px);
  width: 26px;
}

.mobile-menu-button.is-active .line2 {
  transform: scaleX(0);
  opacity: 0;
}

.mobile-menu-button.is-active .line3 {
  transform: rotate(-45deg) translate(1px, 1px);
  width: 26px;
}
</style>
