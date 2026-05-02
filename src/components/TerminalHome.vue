<template>
  <div class="relative z-10 min-h-screen flex flex-col">
    <!-- Top navigation -->
    <nav class="sticky top-0 z-50 border-b border-[var(--color-glass-border)] bg-black/50 backdrop-blur-xl">
      <div class="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-3 snap-target">
          <div class="w-7 h-7">
            <img
              :src="siteConfig.icon"
              alt="logo"
              class="w-full h-full object-contain"
              :style="{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(5)' }"
            />
          </div>
          <span
            class="font-mono text-sm font-bold text-[var(--color-neon)] hidden sm:block"
            :style="{ textShadow: '0 0 8px rgba(0,255,65,0.3)' }"
          >
            {{ siteConfig.name }}
          </span>
        </div>

        <!-- Nav -->
        <div class="flex items-center gap-1">
          <button
            v-for="item in navConfig.items"
            :key="item.label"
            class="snap-target px-3 md:px-4 py-1.5 font-mono text-xs transition-all duration-200 rounded-lg"
            :class="activeSection === item.label.toLowerCase()
              ? 'text-[var(--color-neon)] bg-[var(--color-neon)]/8 border border-[var(--color-neon)]/15'
              : 'text-[var(--color-neon)]/40 hover:text-[var(--color-neon)]/70 hover:bg-[var(--color-neon)]/4'"
            @click="activeSection = item.label.toLowerCase()"
          >
            {{ t(`nav.${item.label.toLowerCase()}`) }}
          </button>
        </div>

        <!-- Right side: clock + language toggle -->
        <div class="flex items-center gap-3">
          <div class="font-mono text-xs text-[var(--color-neon)]/40 hidden md:flex items-center gap-2">
            <span>{{ currentTime }}</span>
            <span class="text-[var(--color-neon)]/15">|</span>
            <span class="text-[var(--color-neon)]/25">{{ formattedUptime }}</span>
          </div>
          <!-- Language toggle -->
          <button
            class="snap-target px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all border border-[var(--color-glass-border)] hover:border-[var(--color-neon)]/25 text-[var(--color-neon)]/40 hover:text-[var(--color-neon)]/70"
            @click="toggleLang"
          >
            {{ langLabel }}
          </button>
        </div>
      </div>

      <div class="h-[1px] data-line" />
    </nav>

    <!-- Main content -->
    <main class="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
      <!-- Home section -->
      <Transition name="section" mode="out-in">
        <div v-if="activeSection === 'home'" key="home" class="space-y-8">
          <!-- Hero -->
          <div class="text-center space-y-4 py-8">
            <div
              class="text-4xl md:text-6xl lg:text-7xl font-bold font-mono text-[var(--color-neon)]"
              :style="{ textShadow: '0 0 12px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.15)' }"
            >
              <TypingText :text="siteConfig.name" :speed="80" :show-cursor="false" />
            </div>
            <div
              class="text-base md:text-lg font-mono text-[var(--color-amber)]/80"
              :style="{ textShadow: '0 0 8px rgba(255,176,0,0.3)' }"
            >
              {{ siteConfig.subtitle }}
            </div>
            <div class="text-xs font-mono text-[var(--color-neon)]/25 flex items-center justify-center gap-3">
              <span>{{ siteConfig.version }}</span>
              <span class="w-1 h-1 rounded-full bg-[var(--color-neon)]/20" />
              <span>{{ t('home.uptime') }} {{ formattedUptime }}</span>
              <span class="w-1 h-1 rounded-full bg-[var(--color-neon)]/20" />
              <span>{{ currentTime }}</span>
            </div>
          </div>

          <!-- Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Profile card -->
            <GlassCard :title="t('home.profile')" :delay="1.8">
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 rounded-xl border border-[var(--color-neon)]/20 overflow-hidden pulse-neon flex-shrink-0">
                    <img
                      :src="siteConfig.icon"
                      alt="avatar"
                      class="w-full h-full object-cover"
                      :style="{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(5)' }"
                    />
                  </div>
                  <div>
                    <div class="text-[var(--color-neon)] font-bold font-mono text-sm">{{ siteConfig.author }}</div>
                    <div class="text-[var(--color-neon)]/30 text-[10px] font-mono mt-0.5">{{ siteConfig.version }}</div>
                  </div>
                </div>
                <p class="text-[var(--color-neon)]/50 text-xs leading-relaxed font-mono">{{ siteConfig.bio }}</p>
              </div>
            </GlassCard>

            <!-- User info card -->
            <GlassCard :title="t('home.userinfo')" :delay="2.0">
              <div class="space-y-3 font-mono text-xs">
                <template v-if="visitorLoading">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-[var(--color-neon)] animate-pulse" />
                      <span class="text-[var(--color-neon)]/30">{{ t('userinfo.loading') }}</span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="flex justify-between items-center">
                    <span class="text-[var(--color-neon)]/35">{{ t('userinfo.ip') }}</span>
                    <span class="text-[var(--color-neon)]">{{ visitorInfo?.ip || '--' }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[var(--color-neon)]/35">{{ t('userinfo.location') }}</span>
                    <span class="text-[var(--color-amber)]/80 truncate ml-3 max-w-[140px] text-right">{{ visitorInfo?.locationDisplay || '--' }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[var(--color-neon)]/35">{{ t('userinfo.isp') }}</span>
                    <span class="text-[var(--color-cyan)]/70 truncate ml-3 max-w-[140px] text-right">{{ visitorInfo?.ispDisplay || '--' }}</span>
                  </div>
                  <div class="h-[1px] bg-[var(--color-glass-border)]" />
                  <div class="flex justify-between items-center">
                    <span class="text-[var(--color-neon)]/35">{{ t('userinfo.addr') }}</span>
                    <span class="text-[var(--color-neon)]/50 truncate ml-3 max-w-[140px] text-right font-mono">{{ visitorInfo?.addr || '--' }}</span>
                  </div>
                  <div v-if="visitorInfo?.coordinatesDisplay" class="flex justify-between items-center">
                    <span class="text-[var(--color-neon)]/35">{{ t('userinfo.coordinates') }}</span>
                    <span class="text-[var(--color-neon)]/50 truncate ml-3 max-w-[140px] text-right font-mono">{{ visitorInfo.coordinatesDisplay }}</span>
                  </div>
                  <div v-if="visitorInfo?.asDisplay" class="flex justify-between items-center">
                    <span class="text-[var(--color-neon)]/35">{{ t('userinfo.asn') }}</span>
                    <span class="text-[var(--color-cyan)]/60 truncate ml-3 max-w-[140px] text-right">{{ visitorInfo.asDisplay }}</span>
                  </div>
                  <div class="h-[1px] bg-[var(--color-glass-border)]" />
                  <div class="flex justify-between items-center">
                    <span class="text-[var(--color-neon)]/35">{{ t('userinfo.device') }}</span>
                    <span class="text-[var(--color-cyan)]/50 font-mono truncate max-w-[140px]">{{ deviceInfo || '--' }}</span>
                  </div>
                </template>
              </div>
            </GlassCard>

            <!-- Quick links card -->
            <GlassCard :title="t('home.links')" :delay="2.2">
              <div class="space-y-2">
                <a
                  v-for="link in socialConfig.links.slice(0, 4)"
                  :key="link.name"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="snap-target flex items-center gap-2.5 font-mono text-xs text-[var(--color-neon)]/40 hover:text-[var(--color-neon)] transition-colors group py-1"
                >
                  <component :is="getIcon(link.icon)" class="w-3.5 h-3.5 group-hover:drop-shadow-[0_0_4px_var(--color-neon)]" />
                  <span>{{ link.name.toUpperCase() }}</span>
                  <span class="ml-auto text-[var(--color-neon)]/10 group-hover:text-[var(--color-neon)]/40 transition-colors text-[10px]">&rarr;</span>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>

        <!-- About section -->
        <div v-else-if="activeSection === 'about'" key="about" class="space-y-6">
          <GlassCard :title="t('about.title')" :delay="0.1">
            <div class="space-y-6">
              <div class="flex flex-col md:flex-row items-start gap-6">
                <div class="w-20 h-20 rounded-xl border border-[var(--color-neon)]/20 overflow-hidden pulse-neon flex-shrink-0">
                  <img
                    :src="siteConfig.icon"
                    alt="avatar"
                    class="w-full h-full object-cover"
                    :style="{ filter: 'brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(5)' }"
                  />
                </div>
                <div class="space-y-3">
                  <h2
                    class="text-xl font-bold font-mono text-[var(--color-neon)]"
                    :style="{ textShadow: '0 0 8px rgba(0,255,65,0.3)' }"
                  >
                    {{ siteConfig.author }}
                  </h2>
                  <p class="font-mono text-sm text-[var(--color-neon)]/55 leading-relaxed">{{ siteConfig.bio }}</p>
                  <div class="flex items-center gap-2 text-xs font-mono text-[var(--color-neon)]/30">
                    <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-neon)] animate-pulse" />
                    {{ t('home.online') }}
                    <span class="mx-1 text-[var(--color-neon)]/15">|</span>
                    {{ siteConfig.version }}
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <div class="text-[10px] font-mono text-[var(--color-amber)]/60 tracking-widest uppercase mb-3">
                  {{ t('about.skills') }}
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div
                    v-for="skill in skills"
                    :key="skill"
                    class="snap-target px-3 py-2 border border-[var(--color-glass-border)] rounded-lg text-xs font-mono text-[var(--color-neon)]/50 hover:text-[var(--color-neon)] hover:border-[var(--color-neon)]/30 transition-all"
                  >
                    {{ skill }}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <!-- Projects section -->
        <div v-else-if="activeSection === 'projects'" key="projects" class="space-y-6">
          <GlassCard :title="t('projects.title')" :delay="0.1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                v-for="project in projectsConfig.items"
                :key="project.name"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="project-card snap-target rounded-xl p-4 bg-[var(--color-glass-surface)] block"
              >
                <div class="flex items-start justify-between mb-2">
                  <h3 class="font-mono font-bold text-sm text-[var(--color-neon)]">{{ project.name }}</h3>
                  <span
                    class="text-[10px] font-mono px-2 py-0.5 border rounded-md"
                    :class="statusColors[project.status] || ''"
                  >
                    {{ project.status }}
                  </span>
                </div>
                <p class="text-xs font-mono text-[var(--color-neon)]/40 mb-3">{{ project.description }}</p>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--color-neon)]/4 text-[var(--color-neon)]/30 border border-[var(--color-neon)]/8"
                  >
                    {{ tech }}
                  </span>
                </div>
              </a>
            </div>
          </GlassCard>
        </div>

        <!-- Links section -->
        <div v-else-if="activeSection === 'links'" key="links" class="space-y-6">
          <GlassCard :title="t('links.title')" :delay="0.1">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                v-for="link in socialConfig.links"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="snap-target flex items-center gap-3 p-3 rounded-xl border border-[var(--color-glass-border)] hover:border-[var(--color-neon)]/25 hover:bg-[var(--color-neon)]/3 transition-all group"
              >
                <component :is="getIcon(link.icon)" class="w-5 h-5 text-[var(--color-neon)]/40 group-hover:text-[var(--color-neon)] transition-colors" />
                <div>
                  <div class="font-mono text-sm text-[var(--color-neon)]/70 group-hover:text-[var(--color-neon)] transition-colors">{{ link.name }}</div>
                  <div class="font-mono text-[10px] text-[var(--color-neon)]/20">{{ link.url.replace(/^https?:\/\//, '') }}</div>
                </div>
                <span class="ml-auto text-[var(--color-neon)]/10 group-hover:text-[var(--color-neon)]/40 transition-colors font-mono text-sm">&rarr;</span>
              </a>
            </div>
          </GlassCard>
        </div>
      </Transition>
    </main>

    <!-- Footer -->
    <footer class="border-t border-[var(--color-glass-border)] bg-black/30 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div class="font-mono text-[10px] text-[var(--color-neon)]/20">
          &copy; {{ new Date().getFullYear() }} {{ siteConfig.author }} &middot; {{ siteConfig.name }} {{ siteConfig.version }}
        </div>
        <div class="flex items-center gap-3">
          <a
            v-for="link in socialConfig.links"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon snap-target"
          >
            <component :is="getIcon(link.icon)" class="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, h } from 'vue'
import siteConfig from '@/config/site'
import navConfig from '@/config/nav'
import socialConfig from '@/config/social'
import projectsConfig from '@/config/projects'
import { useLang } from '@/composables/useLang'
import { useGeo } from '@/composables/useGeo'
import GlassCard from '@/components/GlassCard.vue'
import TypingText from '@/components/TypingText.vue'

const { t, lang, toggleLang, langLabel } = useLang()
const { info: visitorInfo, loading: visitorLoading, deviceInfo } = useGeo()

const activeSection = ref('home')
const currentTime = ref('')
const uptime = ref(0)

const skills = ['TypeScript', 'Vue', 'Vite', 'Node.js', 'Rust', 'Python', 'Go', 'DevOps']

const statusColors: Record<string, string> = {
  ACTIVE: 'text-[var(--color-neon)] border-[var(--color-neon)]/40',
  BETA: 'text-[var(--color-amber)] border-[var(--color-amber)]/40',
  ARCHIVED: 'text-[var(--color-cyan)] border-[var(--color-cyan)]/40',
  WIP: 'text-[var(--color-magenta)] border-[var(--color-magenta)]/40',
}

const formattedUptime = computed(() => {
  const h = Math.floor(uptime.value / 3600)
  const m = Math.floor((uptime.value % 3600) / 60)
  const s = uptime.value % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

// Icon factory - returns a functional component for SVG icons
function getIcon(name: string) {
  const icons: Record<string, () => ReturnType<typeof h>> = {
    terminal: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('polyline', { points: '4 17 10 11 4 5' }),
      h('line', { x1: '12', y1: '19', x2: '20', y2: '19' }),
    ]),
    user: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '12', cy: '7', r: '4' }),
    ]),
    folder: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' }),
    ]),
    link: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }),
      h('path', { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' }),
    ]),
    github: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' }),
    ]),
    twitter: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' }),
    ]),
    mail: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
      h('polyline', { points: '22,6 12,13 2,6' }),
    ]),
    'book-open': () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' }),
      h('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' }),
    ]),
  }

  return () => icons[name]?.() || null
}

let timeInterval: ReturnType<typeof setInterval> | null = null
let uptimeInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString(lang.value === 'zh' ? 'zh-CN' : 'en-US', { hour12: false })
  }
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  uptimeInterval = setInterval(() => uptime.value++, 1000)
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
  if (uptimeInterval) clearInterval(uptimeInterval)
})
</script>

<style scoped>
.section-enter-active {
  transition: opacity 0.3s ease;
}
.section-leave-active {
  transition: opacity 0.3s ease;
}
.section-enter-from {
  opacity: 0;
}
.section-leave-to {
  opacity: 0;
}
</style>
