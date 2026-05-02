<template>
  <div
    class="glass-card glass-card-glow-top p-0 overflow-hidden"
    :style="{ animationDelay: `${delay}s` }"
  >
    <div class="flex items-center gap-2 px-5 py-3 border-b border-[var(--color-glass-border)]">
      <span class="font-mono text-[10px] tracking-widest text-[var(--color-neon)]/50 uppercase">
        {{ title }}
      </span>
    </div>
    <div class="p-5">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  delay?: number
}>(), {
  delay: 0,
})
</script>
