<template>
  <Teleport to="body">
    <!-- Music icon button - left side -->
    <button
      class="snap-target fixed left-5 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
      :style="{
        background: isOpen ? 'var(--color-glass-bg)' : 'rgba(0, 255, 65, 0.06)',
        border: `1px solid ${isOpen ? 'var(--color-glass-border)' : 'rgba(0, 255, 65, 0.15)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: isOpen
          ? '0 0 20px rgba(0, 255, 65, 0.1)'
          : isPlaying
          ? '0 0 15px rgba(0, 255, 65, 0.15)'
          : 'none',
      }"
      @click="isOpen = !isOpen"
    >
      <svg
        class="w-5 h-5 transition-colors"
        :style="{ color: isOpen || isPlaying ? 'var(--color-neon)' : 'var(--color-neon-dim)' }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" fill="currentColor" />
        <circle cx="18" cy="16" r="3" fill="currentColor" />
      </svg>

      <!-- Playing indicator -->
      <span
        v-if="isPlaying && !isOpen"
        class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--color-neon)] animate-pulse"
      />
    </button>

    <!-- Current track label -->
    <Transition name="track-label">
      <div
        v-if="currentTitle && !isOpen"
        class="fixed left-[4.5rem] top-1/2 -translate-y-1/2 z-50 max-w-[160px] truncate font-mono text-[10px] text-[var(--color-neon)]/50"
      >
        {{ currentTitle }} {{ currentArtist ? `- ${currentArtist}` : '' }}
      </div>
    </Transition>

    <!-- Music panel -->
    <Transition name="music-panel">
      <div
        v-if="isOpen"
        class="music-panel fixed left-16 top-1/2 -translate-y-1/2 z-50 w-[340px] max-h-[75vh] overflow-hidden flex flex-col"
      >
        <!-- Panel header -->
        <div class="flex items-center justify-between px-4 pt-4 pb-2">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[var(--color-neon)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="currentColor" />
              <circle cx="18" cy="16" r="3" fill="currentColor" />
            </svg>
            <span class="font-mono text-xs text-[var(--color-neon)] font-medium">{{ t('music.title') }}</span>
          </div>
          <div class="flex items-center gap-1">
            <!-- Lyrics toggle -->
            <button
              v-if="currentLrc"
              class="snap-target w-6 h-6 rounded-full flex items-center justify-center transition-all"
              :class="showLrc ? 'text-[var(--color-neon)] bg-[var(--color-neon)]/10' : 'text-[var(--color-neon)]/30 hover:text-[var(--color-neon)]/60'"
              @click="showLrc = !showLrc"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 6h16M4 12h10M4 18h14" />
              </svg>
            </button>
            <button
              class="snap-target w-6 h-6 rounded-full flex items-center justify-center text-[var(--color-neon)]/40 hover:text-[var(--color-neon)] hover:bg-[var(--color-neon)]/10 transition-all"
              @click="isOpen = false"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Now playing - cover + info -->
        <div v-if="currentTitle" class="px-4 pb-3 flex items-center gap-3">
          <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-[var(--color-glass-border)] bg-black/30">
            <img v-if="currentCover" :src="currentCover" alt="cover" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-5 h-5 text-[var(--color-neon)]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" fill="currentColor" />
                <circle cx="18" cy="16" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-mono text-xs text-[var(--color-neon)] truncate">{{ currentTitle }}</div>
            <div v-if="currentArtist" class="font-mono text-[10px] text-[var(--color-neon)]/40 truncate">{{ currentArtist }}</div>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="w-1 h-1 rounded-full bg-[var(--color-neon)] animate-pulse" />
              <span class="font-mono text-[9px] text-[var(--color-neon)]/40">{{ t('music.nowPlaying') }}</span>
            </div>
          </div>
        </div>

        <!-- Lyrics panel -->
        <Transition name="lyrics">
          <div v-if="showLrc && currentLrc" class="overflow-hidden">
            <div class="px-4 pb-3 max-h-[120px] overflow-y-auto">
              <div class="text-[10px] font-mono text-[var(--color-neon)]/30 mb-1 tracking-widest">{{ t('music.lyrics') }}</div>
              <div v-for="(line, i) in parsedLrcLines" :key="i" class="font-mono text-[11px] text-[var(--color-neon)]/50 leading-relaxed">
                {{ line }}
              </div>
            </div>
          </div>
        </Transition>

        <!-- Tabs -->
        <div class="flex px-4 gap-1 mb-3">
          <button
            class="snap-target flex-1 py-1.5 text-xs font-mono rounded-lg transition-all"
            :class="activeTab === 'online'
              ? 'text-[var(--color-neon)] bg-[var(--color-neon)]/10 border border-[var(--color-neon)]/20'
              : 'text-[var(--color-neon)]/40 hover:text-[var(--color-neon)]/60 border border-transparent'"
            @click="activeTab = 'online'"
          >
            {{ t('music.online') }}
          </button>
          <button
            class="snap-target flex-1 py-1.5 text-xs font-mono rounded-lg transition-all relative"
            :class="activeTab === 'local'
              ? 'text-[var(--color-neon)] bg-[var(--color-neon)]/10 border border-[var(--color-neon)]/20'
              : 'text-[var(--color-neon)]/40 hover:text-[var(--color-neon)]/60 border border-transparent'"
            @click="activeTab = 'local'"
          >
            {{ t('music.local') }}
            <span v-if="localTracks.length > 0" class="ml-1 text-[9px] px-1 py-0 rounded-full bg-[var(--color-neon)]/15 text-[var(--color-neon)]">
              {{ localTracks.length }}
            </span>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto px-4 pb-4">
          <!-- Online music (Meting) -->
          <div v-if="activeTab === 'online' && metingConfig.enabled">
            <div ref="metingContainerRef" />
          </div>

          <div v-if="activeTab === 'online' && !metingConfig.enabled" class="text-center py-8 font-mono text-xs text-[var(--color-neon)]/30">
            {{ t('music.noOnline') }}
          </div>

          <!-- Local music -->
          <div v-if="activeTab === 'local'" class="space-y-1">
            <div
              v-for="(track, i) in localTracks"
              :key="track.url + i"
              class="snap-target flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--color-neon)]/5 transition-all group cursor-pointer"
              @click="playLocalTrack(track)"
            >
              <div class="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 border border-[var(--color-glass-border)] bg-black/30">
                <img v-if="track.cover" :src="track.cover" alt="" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-[var(--color-neon)]/20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-mono text-[11px] text-[var(--color-neon)]/60 truncate group-hover:text-[var(--color-neon)] transition-colors">{{ track.name }}</div>
                <div v-if="track.artist" class="font-mono text-[9px] text-[var(--color-neon)]/25 truncate">{{ track.artist }}</div>
              </div>
              <div class="flex items-center gap-1">
                <span v-if="track.lrc" class="text-[8px] font-mono text-[var(--color-neon)]/15">LRC</span>
                <svg class="w-3 h-3 text-[var(--color-neon)]/15 group-hover:text-[var(--color-neon)]/40 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>

            <div v-if="localTracks.length === 0" class="text-center py-8 font-mono text-[10px] text-[var(--color-neon)]/20">
              {{ t('music.noLocal') }}
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Click outside to close -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="isOpen = false"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import metingConfig from '@/config/meting'
import musicConfig, { type LocalTrack } from '@/config/music'
import { useLang } from '@/composables/useLang'

const { t, lang } = useLang()

const isOpen = ref(false)
const isPlaying = ref(false)
const currentTitle = ref('')
const currentArtist = ref('')
const currentCover = ref('')
const activeTab = ref<'online' | 'local'>('online')
const localTracks = ref<LocalTrack[]>([...musicConfig.localTracks])
const currentLrc = ref('')
const showLrc = ref(false)
const metingContainerRef = ref<HTMLElement | null>(null)

let localAudio: HTMLAudioElement | null = null
let metingLoaded = false
let aplayerCheckInterval: ReturnType<typeof setInterval> | null = null

// Parse LRC lines for display
const parsedLrcLines = computed(() => {
  if (!currentLrc.value) return []
  const lines = currentLrc.value.split('\n').filter(l => l.trim())
  return lines
    .map(line => {
      const match = line.match(/\[\d+:\d+\.\d+\](.*)/)
      return match ? match[1].trim() : line.replace(/^\[.*?\]/, '').trim()
    })
    .filter(l => l.length > 0)
})

// Load Meting scripts
function loadMetingScripts() {
  if (!metingConfig.enabled || metingLoaded) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
  document.head.appendChild(link)

  const aplayerScript = document.createElement('script')
  aplayerScript.src = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
  aplayerScript.async = true

  aplayerScript.onload = () => {
    const metingScript = document.createElement('script')
    metingScript.src = 'https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js'
    metingScript.async = true
    document.head.appendChild(metingScript)
  }

  document.head.appendChild(aplayerScript)
  metingLoaded = true
}

// Load local track lyrics
async function loadLrc(lrcPath: string) {
  if (!lrcPath) {
    currentLrc.value = ''
    return
  }
  try {
    const res = await fetch(lrcPath)
    if (res.ok) {
      currentLrc.value = await res.text()
    } else {
      currentLrc.value = ''
    }
  } catch {
    currentLrc.value = ''
  }
}

// Play local track
function playLocalTrack(track: LocalTrack) {
  if (!localAudio) {
    localAudio = new Audio()
  }

  // Pause APlayer if playing
  try {
    const aplayerEl = document.querySelector('.aplayer') as any
    if (aplayerEl?.__aplayer) {
      aplayerEl.__aplayer.pause()
    }
  } catch {}

  localAudio.src = track.url
  localAudio.play()
  isPlaying.value = true
  currentTitle.value = track.name
  currentArtist.value = track.artist
  currentCover.value = track.cover || ''
  activeTab.value = 'local'
  loadLrc(track.lrc || '')
}

// Check APlayer state periodically
function startAplayerCheck() {
  aplayerCheckInterval = setInterval(() => {
    const aplayerEl = document.querySelector('.aplayer') as HTMLElement
    if (aplayerEl) {
      const pauseBtn = aplayerEl.querySelector('.aplayer-pause')
      const playBtn = aplayerEl.querySelector('.aplayer-play')
      if (pauseBtn && getComputedStyle(pauseBtn).display !== 'none') {
        isPlaying.value = true
        const titleEl = aplayerEl.querySelector('.aplayer-title')
        const authorEl = aplayerEl.querySelector('.aplayer-author')
        if (titleEl?.textContent) currentTitle.value = titleEl.textContent
        if (authorEl?.textContent) currentArtist.value = authorEl.textContent.replace('-', '').trim()
        const picEl = aplayerEl.querySelector('.aplayer-pic') as HTMLElement
        if (picEl) {
          const bg = picEl.style.backgroundImage
          if (bg) currentCover.value = bg.replace(/url\(["']?/, '').replace(/["']?\)/, '')
        }
      } else if (playBtn && getComputedStyle(playBtn).display !== 'none') {
        if (activeTab.value === 'online') isPlaying.value = false
      }
    }
  }, 500)
}

// Render Meting element when online tab is active
watch([activeTab, isOpen], () => {
  if (activeTab.value === 'online' && isOpen.value && metingConfig.enabled && metingContainerRef.value) {
    metingContainerRef.value.innerHTML = ''
    const metingEl = document.createElement('meting-js')
    metingEl.setAttribute('server', metingConfig.server)
    metingEl.setAttribute('type', metingConfig.type)
    metingEl.setAttribute('id', metingConfig.id)
    if (metingConfig.autoplay) metingEl.setAttribute('auto', '')
    metingEl.setAttribute('theme', metingConfig.theme)
    metingEl.setAttribute('mode', metingConfig.mode)
    metingEl.setAttribute('volume', String(metingConfig.volume))
    metingContainerRef.value.appendChild(metingEl)
  }
})

onMounted(() => {
  loadMetingScripts()
  startAplayerCheck()
})

onUnmounted(() => {
  if (aplayerCheckInterval) clearInterval(aplayerCheckInterval)
  if (localAudio) {
    localAudio.pause()
    localAudio = null
  }
})
</script>

<style scoped>
.music-panel-enter-active {
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.music-panel-leave-active {
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.music-panel-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}
.music-panel-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}

.track-label-enter-active {
  transition: all 0.2s ease;
}
.track-label-leave-active {
  transition: all 0.2s ease;
}
.track-label-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.track-label-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.lyrics-enter-active {
  transition: all 0.2s ease;
}
.lyrics-leave-active {
  transition: all 0.2s ease;
}
.lyrics-enter-from,
.lyrics-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
