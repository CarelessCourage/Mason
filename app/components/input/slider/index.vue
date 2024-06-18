<script setup lang="ts">
  import Steps from "./steps.vue"

  interface Props {
    min?: number, 
    max?: number, 
    steps?: number, 
    onChange?: Function,
    initial?: number, 
    unit?: string | null,
  }

  const props = withDefaults(defineProps<Props>(), {
    min: 0, 
    max: 4, 
    steps: 4, 
    initial: 0, 
    unit: null, 
    callback: () => {}
  })

  const range = ref(props.initial)

  let computedMax = computed(() => props.steps === 0 ? props.max : props.steps)
  
  function computedValue(vv: number) {
    return props.steps === 0 ? vv : vv * (props.max / props.steps)
  }
  
  function onChange(event: any) {
    const newV = Number(event.target.value)
    props.onChange(computedValue(newV))
  }
</script>

<template>
  <div class="slider">
    <p v-if="unit"><slot></slot> {{computedValue(range)}}{{unit}}</p>
    <div class="wrapper">
      <Steps :steps="steps" :range="range" />
      <input
        type='range'
        :min="min"
        :max="computedMax"
        v-model="range"
        @input="onChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  min-width: 100px;
}

.wrapper {
  --size: calc(var(--brick, 2rem) / 2);
  --padding: 10px;
  position: relative;
  height: var(--brick);
  display: flex;
  align-items: center;
  background-color: var(--shade);
  border: var(--border, 1px solid var(--shade));
  padding: var(--padding, 10px);
  border-radius: var(--radius, 25px);
  //box-sizing: content-box;
}

input[type="range"] {
  display: block;
  -webkit-appearance: none;
  background-color: var(--background);
  width: 100%;
  height: 2px;
  margin: 0px;
  border-radius: var(--radius, 25px);
  z-index: 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: var(--foreground);
  width: var(--size);
  height: var(--size);
  border-radius: var(--radius, 25px);
  cursor: pointer;
  transition: .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background-color: var(--brand);
}

input[type="range"]:active::-webkit-slider-thumb {
  border-radius: var(--radius, 25px);
  //width: calc(1.5 * var(--size));
}
</style>