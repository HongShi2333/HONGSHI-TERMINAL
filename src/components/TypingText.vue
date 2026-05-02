<template>
  <span :class="className">
    {{ displayedText }}
    <span v-if="showCursor && !isComplete && hasStarted" class="typing-cursor" />
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  speed?: number
  delay?: number
  className?: string
  showCursor?: boolean
}>(), {
  speed: 50,
  delay: 0,
  className: '',
  showCursor: true,
})

const emit = defineEmits<{
  complete: []
}>()

const displayedText = ref('')
const isComplete = ref(false)
const hasStarted = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null
let delayTimerId: ReturnType<typeof setTimeout> | null = null

function startTyping() {
  hasStarted.value = true
  let i = 0
  intervalId = setInterval(() => {
    if (i < props.text.length) {
      displayedText.value = props.text.slice(0, i + 1)
      i++
    } else {
      if (intervalId) clearInterval(intervalId)
      isComplete.value = true
      emit('complete')
    }
  }, props.speed)
}

onMounted(() => {
  delayTimerId = setTimeout(() => {
    startTyping()
  }, props.delay)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  if (delayTimerId) clearTimeout(delayTimerId)
})

watch(() => props.text, () => {
  displayedText.value = ''
  isComplete.value = false
  hasStarted.value = false
  if (intervalId) clearInterval(intervalId)
  if (delayTimerId) clearTimeout(delayTimerId)
  delayTimerId = setTimeout(() => startTyping(), props.delay)
})
</script>
