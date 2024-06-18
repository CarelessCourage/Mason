<script setup lang="ts">
import { type Component } from "vue"

export interface PropsType {
  fragment: string,
  data: {
    name: string,
    slots: {[key: string]: Component},
  }
}

const props = withDefaults(defineProps<PropsType>(), {
  fragment: "",
  data: null,
})

const fragmentKey = ref<string>("unset")
onMounted(() => {
  fragmentKey.value = props.data.name + '-' + props.fragment
})

</script>

<template>
  <div :class="`drop ${fragment}`" :data-dropzone="fragmentKey">
    <component v-if="true" :is="data.slots[fragment]"/>
  </div>
</template>

<style lang="scss" scoped>
.drop {
  transition: .2s;
}

.drop.land-hit {
  //opacity: 0;
  transition: 0s;
}

.drop.returning {
  //opacity: 0;
  transition: 0s;
}
</style>