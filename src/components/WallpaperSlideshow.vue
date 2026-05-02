<template>
  <div class="fixed inset-0 z-0 overflow-hidden">
    <!-- Current wallpaper -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity"
      :style="{
        backgroundImage: `url(${wallpapers[currentIndex]})`,
        filter: `blur(${config.blur}px) brightness(${config.brightness})`,
        opacity: isTransitioning ? 0 : 1,
        transitionDuration: `${config.transitionDuration}ms`,
      }"
    />

    <!-- Next wallpaper (for transition) -->
    <div
      v-if="nextIndex !== null"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity"
      :style="{
        backgroundImage: `url(${wallpapers[nextIndex]})`,
        filter: `blur(${config.blur}px) brightness(${config.brightness})`,
        opacity: isTransitioning ? 1 : 0,
        transitionDuration: `${config.transitionDuration}ms`,
      }"
    />

    <!-- Dark overlay gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

    <!-- Vignette effect -->
    <div
      class="absolute inset-0"
      :style="{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }"
    />

    <!-- Subtle grid pattern -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      :style="{
        backgroundImage: 'linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import wallpaperConfig from '@/config/wallpaper'

const config = wallpaperConfig
const wallpapers = wallpaperConfig.wallpapers

const currentIndex = ref(0)
const nextIndex = ref<number | null>(null)
const isTransitioning = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

function getNextIndex(current: number): number {
  if (wallpaperConfig.random) {
    let next = current
    while (next === current && wallpapers.length > 1) {
      next = Math.floor(Math.random() * wallpapers.length)
    }
    return next
  }
  return (current + 1) % wallpapers.length
}

function transition() {
  if (wallpapers.length <= 1) return
  const next = getNextIndex(currentIndex.value)
  nextIndex.value = next
  isTransitioning.value = true

  setTimeout(() => {
    currentIndex.value = next
    nextIndex.value = null
    isTransitioning.value = false
  }, wallpaperConfig.transitionDuration)
}

onMounted(() => {
  if (wallpapers.length > 1) {
    intervalId = setInterval(transition, wallpaperConfig.interval)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
