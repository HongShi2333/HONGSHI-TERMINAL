<template>
  <div class="fixed right-4 bottom-4 z-50 font-mono">
    <button
      class="snap-target flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-[10px] text-[var(--color-neon)]/30 hover:text-[var(--color-neon)]/50"
      :style="{
        background: 'var(--color-glass-bg)',
        border: '1px solid var(--color-glass-border)',
        backdropFilter: 'blur(8px)',
      }"
      @click="isExpanded = !isExpanded"
    >
      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span>{{ loading ? t('userinfo.loading') : info?.ip || '--' }}</span>
    </button>

    <Transition name="user-info-panel">
      <div
        v-if="isExpanded && info"
        class="absolute right-0 bottom-full mb-2 w-72 p-3 rounded-xl space-y-2"
        :style="{
          background: 'var(--color-glass-bg)',
          border: '1px solid var(--color-glass-border)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }"
      >
        <div class="flex items-center justify-between">
          <span class="text-[9px] text-[var(--color-neon)]/25 tracking-widest uppercase">{{ t('userinfo.ip') }}</span>
          <span class="text-[10px] text-[var(--color-neon)]/80">{{ info.ip }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[9px] text-[var(--color-neon)]/25 tracking-widest uppercase">{{ t('userinfo.location') }}</span>
          <span class="text-[10px] text-[var(--color-amber)]/60 truncate ml-2 max-w-[170px] text-right">{{ info.locationDisplay }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[9px] text-[var(--color-neon)]/25 tracking-widest uppercase">{{ t('userinfo.isp') }}</span>
          <span class="text-[10px] text-[var(--color-cyan)]/60 truncate ml-2 max-w-[170px] text-right">{{ info.ispDisplay }}</span>
        </div>
        <div class="h-[1px] bg-[var(--color-glass-border)]" />
        <div v-if="info.addr" class="flex items-center justify-between">
          <span class="text-[9px] text-[var(--color-neon)]/25 tracking-widest uppercase">{{ t('userinfo.addr') }}</span>
          <span class="text-[10px] text-[var(--color-neon)]/45 truncate ml-2 max-w-[170px] text-right font-mono">{{ info.addr }}</span>
        </div>
        <div v-if="info.coordinatesDisplay" class="flex items-center justify-between">
          <span class="text-[9px] text-[var(--color-neon)]/25 tracking-widest uppercase">{{ t('userinfo.coordinates') }}</span>
          <span class="text-[10px] text-[var(--color-neon)]/45 truncate ml-2 max-w-[170px] text-right font-mono">{{ info.coordinatesDisplay }}</span>
        </div>
        <div v-if="info.asDisplay" class="flex items-center justify-between">
          <span class="text-[9px] text-[var(--color-neon)]/25 tracking-widest uppercase">{{ t('userinfo.asn') }}</span>
          <span class="text-[10px] text-[var(--color-cyan)]/50 truncate ml-2 max-w-[170px] text-right">{{ info.asDisplay }}</span>
        </div>
        <div class="h-[1px] bg-[var(--color-glass-border)]" />
        <div class="flex items-center justify-between">
          <span class="text-[9px] text-[var(--color-neon)]/25 tracking-widest uppercase">{{ t('userinfo.device') }}</span>
          <span class="text-[10px] text-[var(--color-cyan)]/50 truncate ml-2 max-w-[170px] text-right">{{ deviceInfo || '--' }}</span>
        </div>
        <div class="h-[1px] bg-[var(--color-glass-border)]" />
        <div class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-[var(--color-neon)] animate-pulse" />
          <span class="text-[9px] text-[var(--color-neon)]/25">SECURE</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLang } from '@/composables/useLang'
import { useGeo } from '@/composables/useGeo'

const { t } = useLang()
const { info, loading, deviceInfo } = useGeo()
const isExpanded = ref(false)
</script>

<style scoped>
.user-info-panel-enter-active {
  transition: all 0.2s ease;
}
.user-info-panel-leave-active {
  transition: all 0.2s ease;
}
.user-info-panel-enter-from {
  opacity: 0;
  transform: translateY(5px) scale(0.95);
}
.user-info-panel-leave-to {
  opacity: 0;
  transform: translateY(5px) scale(0.95);
}
</style>
