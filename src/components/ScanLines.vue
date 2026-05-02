<template>
  <div class="scanlines" />
</template>

<style scoped>
.scanlines {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.015) 0px,
    rgba(0, 0, 0, 0.015) 1px,
    transparent 1px,
    transparent 5px
  );
}
</style>
