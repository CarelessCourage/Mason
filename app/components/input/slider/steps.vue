<script setup lang="ts">
  interface Props {
    range: number | string, 
    steps: number,
  }

  const props = withDefaults(defineProps<Props>(), {
    range: 0, 
    steps: 4,
  })

  function isStep(index: number) {
    return Number(props.range) === index
  }
</script>

<template>
  <div class="steps">
    <div
      v-for="(item, index) in (steps + 1)"
      :key="index"
      class="step"
      :class="{ active: isStep(index) }"
    >
    </div>
  </div>
</template>

<style lang="scss">
.steps {
  position: absolute;
  z-index: 0;
  width: calc(100% - 2 * var(--padding, 10px));
  height: var(--size);
  display: flex;
  justify-content: space-between;
}

.step {
  width: var(--size);
  height: var(--size);
  aspect-ratio: 1 / 1;
  background: var(--background);
  border-radius: var(--radius, 25px);
  pointer-events: none;
  transform: scale(1);
  transform-origin: center center;
  transform: translateZ(40px);
  transition: transform .2s ease-in-out;
  &.active {
    transform: scale(1.5);
  }
}
</style>