<template>
  <div :class="cursorConfig.enabled ? 'cursor-enabled' : ''">
    <!-- Boot sequence -->
    <BootSequence v-if="!booted" @complete="booted = true" />

    <!-- Background -->
    <WallpaperSlideshow />

    <!-- Subtle scanlines overlay -->
    <ScanLines />

    <!-- Custom cursor -->
    <CustomCursor v-if="cursorConfig.enabled" />

    <!-- Main content -->
    <template v-if="booted">
      <div class="relative z-10 min-h-screen flex flex-col">
        <div class="flex-1">
          <TerminalHome />
        </div>

        <!-- Music player - left side -->
        <MusicPlayer />

        <!-- User info - bottom right -->
        <UserInfo />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import cursorConfig from '@/config/cursor'
import { provideLang } from '@/composables/useLang'
import BootSequence from '@/components/BootSequence.vue'
import TerminalHome from '@/components/TerminalHome.vue'
import WallpaperSlideshow from '@/components/WallpaperSlideshow.vue'
import ScanLines from '@/components/ScanLines.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import MusicPlayer from '@/components/MusicPlayer.vue'
import UserInfo from '@/components/UserInfo.vue'

// Provide i18n context at root component level
provideLang()

const booted = ref(false)
</script>
