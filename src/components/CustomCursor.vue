<template>
  <Teleport to="body">
    <!-- Dot cursor -->
    <div
      ref="cursorDotRef"
      class="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      :style="{
        width: config.dotSize + 'px',
        height: config.dotSize + 'px',
        background: config.color,
        boxShadow: `0 0 8px ${config.color}, 0 0 16px ${config.color}50`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.15s',
      }"
    />

    <!-- Snap frame - four corners with rounded ends -->
    <div
      ref="snapFrameRef"
      class="fixed top-0 left-0 pointer-events-none z-[9998]"
      :style="{
        opacity: 0,
        transition: `all ${config.snapTransitionDuration}ms cubic-bezier(0.23, 1, 0.32, 1)`,
        borderRadius: `${config.cornerRadius}px`,
      }"
    >
      <!-- Top-left corner -->
      <div class="absolute" :style="{ top: 0, left: 0, width: cornerLen + radius + 'px', height: cornerLen + radius + 'px' }">
        <div :style="{ position: 'absolute', top: 0, left: radius + 'px', width: cornerLen - radius + 2 + 'px', height: cornerW + 'px', background: color, borderRadius: '1px' }" />
        <div :style="{ position: 'absolute', top: radius + 'px', left: 0, width: cornerW + 'px', height: cornerLen - radius + 2 + 'px', background: color, borderRadius: '1px' }" />
        <div :style="{ position: 'absolute', top: '-1px', left: '-1px', width: radius * 2 + 2 + 'px', height: radius * 2 + 2 + 'px', borderTop: cornerW + 'px solid ' + color, borderLeft: cornerW + 'px solid ' + color, borderRadius: radius + 'px 0 0 0' }" />
      </div>
      <!-- Top-right corner -->
      <div class="absolute" :style="{ top: 0, right: 0, width: cornerLen + radius + 'px', height: cornerLen + radius + 'px' }">
        <div :style="{ position: 'absolute', top: 0, right: radius + 'px', width: cornerLen - radius + 2 + 'px', height: cornerW + 'px', background: color, borderRadius: '1px' }" />
        <div :style="{ position: 'absolute', top: radius + 'px', right: 0, width: cornerW + 'px', height: cornerLen - radius + 2 + 'px', background: color, borderRadius: '1px' }" />
        <div :style="{ position: 'absolute', top: '-1px', right: '-1px', width: radius * 2 + 2 + 'px', height: radius * 2 + 2 + 'px', borderTop: cornerW + 'px solid ' + color, borderRight: cornerW + 'px solid ' + color, borderRadius: '0 ' + radius + 'px 0 0' }" />
      </div>
      <!-- Bottom-left corner -->
      <div class="absolute" :style="{ bottom: 0, left: 0, width: cornerLen + radius + 'px', height: cornerLen + radius + 'px' }">
        <div :style="{ position: 'absolute', bottom: 0, left: radius + 'px', width: cornerLen - radius + 2 + 'px', height: cornerW + 'px', background: color, borderRadius: '1px' }" />
        <div :style="{ position: 'absolute', bottom: radius + 'px', left: 0, width: cornerW + 'px', height: cornerLen - radius + 2 + 'px', background: color, borderRadius: '1px' }" />
        <div :style="{ position: 'absolute', bottom: '-1px', left: '-1px', width: radius * 2 + 2 + 'px', height: radius * 2 + 2 + 'px', borderBottom: cornerW + 'px solid ' + color, borderLeft: cornerW + 'px solid ' + color, borderRadius: '0 0 0 ' + radius + 'px' }" />
      </div>
      <!-- Bottom-right corner -->
      <div class="absolute" :style="{ bottom: 0, right: 0, width: cornerLen + radius + 'px', height: cornerLen + radius + 'px' }">
        <div :style="{ position: 'absolute', bottom: 0, right: radius + 'px', width: cornerLen - radius + 2 + 'px', height: cornerW + 'px', background: color, borderRadius: '1px' }" />
        <div :style="{ position: 'absolute', bottom: radius + 'px', right: 0, width: cornerW + 'px', height: cornerLen - radius + 2 + 'px', background: color, borderRadius: '1px' }" />
        <div :style="{ position: 'absolute', bottom: '-1px', right: '-1px', width: radius * 2 + 2 + 'px', height: radius * 2 + 2 + 'px', borderBottom: cornerW + 'px solid ' + color, borderRight: cornerW + 'px solid ' + color, borderRadius: '0 0 ' + radius + 'px 0' }" />
      </div>

      <!-- Subtle inner glow -->
      <div
        class="absolute inset-0"
        :style="{ borderRadius: radius + 'px', boxShadow: `0 0 12px ${color}20, inset 0 0 12px ${color}06` }"
      />
    </div>

    <!-- Trail -->
    <template v-if="config.trailEnabled">
      <div
        v-for="i in config.trailLength"
        :key="i"
        :ref="(el) => { if (el) trailRefs[i - 1] = el as HTMLElement }"
        class="fixed top-0 left-0 pointer-events-none z-[9997] w-[4px] h-[4px] rounded-full"
        :style="{ background: color, opacity: 0 }"
      />
    </template>

    <!-- Ripple container -->
    <div ref="rippleContainerRef" class="fixed inset-0 pointer-events-none z-[9996]" />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import cursorConfig from '@/config/cursor'

if (!cursorConfig.enabled) {
  // Component won't render anything meaningful if disabled
}

const config = cursorConfig
const cornerLen = config.cornerLength
const cornerW = config.cornerWidth
const color = config.color
const radius = config.cornerRadius

const cursorDotRef = ref<HTMLElement | null>(null)
const snapFrameRef = ref<HTMLElement | null>(null)
const rippleContainerRef = ref<HTMLElement | null>(null)
const trailRefs = ref<HTMLElement[]>([])

const isVisible = ref(false)

// Mutable state for animation loop
const mousePos = { x: -100, y: -100 }
const dotPos = { x: -100, y: -100 }
const trailPositions: { x: number; y: number }[] = Array(cursorConfig.trailLength).fill({ x: -100, y: -100 })
let currentSnapEl: Element | null = null
let rafId = 0

function createRipple(x: number, y: number) {
  if (!cursorConfig.rippleEnabled || !rippleContainerRef.value) return
  const ripple = document.createElement('div')
  ripple.className = 'cursor-ripple'
  ripple.style.left = `${x - 30}px`
  ripple.style.top = `${y - 30}px`
  ripple.style.borderColor = cursorConfig.rippleColor
  rippleContainerRef.value.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)
}

function findSnapElement(mx: number, my: number): Element | null {
  const elements = document.querySelectorAll(
    'a, button, [role="button"], input, textarea, select, [data-snap="true"], .snap-target'
  )
  let nearest: Element | null = null
  let minDist = cursorConfig.snapRange

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dist = Math.hypot(mx - cx, my - cy)
    const isOver = mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom
    if (isOver || dist < minDist) {
      minDist = dist
      nearest = el
    }
  })

  return nearest
}

function applySnapFrame(el: Element | null) {
  if (!snapFrameRef.value) return
  if (!el) {
    snapFrameRef.value.style.opacity = '0'
    currentSnapEl = null
    return
  }
  const rect = el.getBoundingClientRect()
  const p = cursorConfig.snapPadding
  currentSnapEl = el

  snapFrameRef.value.style.opacity = '1'
  snapFrameRef.value.style.left = `${rect.left - p}px`
  snapFrameRef.value.style.top = `${rect.top - p}px`
  snapFrameRef.value.style.width = `${rect.width + p * 2}px`
  snapFrameRef.value.style.height = `${rect.height + p * 2}px`
}

function animate() {
  const mx = mousePos.x
  const my = mousePos.y

  dotPos.x += (mx - dotPos.x) * (1 - cursorConfig.followDelay)
  dotPos.y += (my - dotPos.y) * (1 - cursorConfig.followDelay)

  const prevPositions = [...trailPositions]
  trailPositions[0] = { x: dotPos.x, y: dotPos.y }
  for (let i = 1; i < cursorConfig.trailLength; i++) {
    trailPositions[i] = prevPositions[i - 1]
  }

  if (cursorDotRef.value) {
    const half = cursorConfig.dotSize / 2
    cursorDotRef.value.style.transform = `translate(${dotPos.x - half}px, ${dotPos.y - half}px)`
  }

  const snapEl = findSnapElement(mx, my)
  applySnapFrame(snapEl)

  trailRefs.value.forEach((ref, i) => {
    if (ref) {
      const pos = trailPositions[i]
      const opacity = 1 - (i + 1) / cursorConfig.trailLength
      const scale = 1 - (i / cursorConfig.trailLength) * 0.4
      ref.style.transform = `translate(${pos.x - 2}px, ${pos.y - 2}px) scale(${scale})`
      ref.style.opacity = `${opacity * 0.3}`
    }
  })

  rafId = requestAnimationFrame(animate)
}

function handleMouseMove(e: MouseEvent) {
  mousePos.x = e.clientX
  mousePos.y = e.clientY
  if (!isVisible.value) isVisible.value = true
}

function handleMouseDown(e: MouseEvent) {
  createRipple(e.clientX, e.clientY)
}

function handleMouseEnter() { isVisible.value = true }
function handleMouseLeave() { isVisible.value = false }

function updateSnapFrame() {
  if (currentSnapEl) {
    applySnapFrame(currentSnapEl)
  }
}

onMounted(() => {
  if (!cursorConfig.enabled) return

  document.body.classList.add('custom-cursor-active')
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('scroll', updateSnapFrame, true)
  window.addEventListener('resize', updateSnapFrame)

  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  document.body.classList.remove('custom-cursor-active')
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('scroll', updateSnapFrame, true)
  window.removeEventListener('resize', updateSnapFrame)
  cancelAnimationFrame(rafId)
})
</script>

<style>
body.custom-cursor-active,
body.custom-cursor-active * {
  cursor: none !important;
}
</style>
