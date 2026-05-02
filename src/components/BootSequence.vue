<template>
  <Transition name="boot-fade">
    <div
      v-if="visible"
      class="boot-overlay"
      :style="{ background: 'radial-gradient(ellipse at center, #0a0f0d 0%, #000000 70%)' }"
    >
      <div class="relative z-10 max-w-2xl w-full">
        <!-- Logo area -->
        <div class="mb-8 flex items-center gap-4">
          <div class="w-12 h-12 relative">
            <img
              :src="siteConfig.icon"
              alt="logo"
              class="w-full h-full object-contain"
              :style="{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(5)' }"
            />
          </div>
          <div>
            <div class="text-lg font-bold neon-text">{{ siteConfig.name }}</div>
            <div class="text-xs opacity-40">{{ siteConfig.version }}</div>
          </div>
        </div>

        <!-- Boot text lines -->
        <div class="space-y-1 text-sm">
          <div
            v-for="(line, i) in visibleLines"
            :key="i"
            class="boot-text font-mono"
            :style="{
              animationDelay: `${i * 0.05}s`,
              color: line.startsWith('[NET]')
                ? 'var(--color-cyan)'
                : line.startsWith('[SYS]')
                ? 'var(--color-amber)'
                : line.includes(siteConfig.name)
                ? 'var(--color-neon)'
                : 'rgba(0, 255, 65, 0.6)',
            }"
          >
            {{ line }}
          </div>
          <span v-if="currentIndex < bootLines.length" class="typing-cursor text-sm" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import siteConfig from '@/config/site'
import { useLang } from '@/composables/useLang'

const emit = defineEmits<{
  complete: []
}>()

const { t } = useLang()
const visible = ref(true)
const visibleLines = ref<string[]>([])
const currentIndex = ref(0)
const fadeOut = ref(false)

const bootLines = computed(() => [
  `[INIT] ${t('boot.welcome')} ${siteConfig.name}...`,
  `[SYS] Loading modules...`,
  `[NET] Network established... OK`,
  `[UI] Rendering interface...`,
  `[SYS] ${t('boot.allSystems')}`,
  ``,
  `${siteConfig.name} — ${siteConfig.subtitle}`,
])

let timers: ReturnType<typeof setTimeout>[] = []

function advanceLine() {
  if (currentIndex.value < bootLines.value.length) {
    visibleLines.value.push(bootLines.value[currentIndex.value])
    currentIndex.value++
    const delay = currentIndex.value === 1 ? 200 : 80 + Math.random() * 80
    const tid = setTimeout(advanceLine, delay)
    timers.push(tid)
  } else {
    const tid = setTimeout(() => {
      fadeOut.value = true
      setTimeout(() => {
        visible.value = false
        emit('complete')
      }, 800)
    }, 500)
    timers.push(tid)
  }
}

onMounted(() => {
  const tid = setTimeout(advanceLine, 200)
  timers.push(tid)
})

onUnmounted(() => {
  timers.forEach(clearTimeout)
})
</script>

<style scoped>
.boot-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  font-family: 'Geist Mono', 'SF Mono', 'Fira Code', monospace;
  color: var(--color-neon);
}

.boot-text {
  opacity: 0;
  animation: boot-appear 0.4s forwards;
}

@keyframes boot-appear {
  0% {
    opacity: 0;
    transform: translateY(3px);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.boot-fade-leave-active {
  transition: opacity 0.8s ease-out;
}

.boot-fade-leave-to {
  opacity: 0;
}
</style>
