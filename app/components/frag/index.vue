<script setup lang="ts">
import { type Component } from 'vue'
import { mason, fragments } from "~/mason/store"

export interface PropsType {
  is: Component,
  name: string,
}

const props = withDefaults(defineProps<PropsType>(), {
  is: null,
  name: "",
})

const fragment = ref(null)
const drag = ref(null)
onClient(() => {
  useDrag(fragment.value, {
    classTarget: drag.value,
    onRelease: {hit: (zone) =>  landHit(zone)}
  })
})

function landHit(zone) {
  const value = zone.element.attributes['data-dropzone'].value
  const nameAndID = value.split("-");
  
  const zoneGroup = nameAndID[0]
  const zoneName = nameAndID[1]

  console.log("mason change target: ", mason[zoneGroup][zoneName])
  console.log("new value: ", fragments[props.name])

  mason[zoneGroup][zoneName] = fragments[props.name]
}
</script>

<template>
<div ref="fragment">
  <div class="frag transition" ref="drag">
    <component :is="fragments[name]"/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.frag {
  background-color: var(--background);
  transition: .4s;
  opacity: 1;
}

.frag.landed {
  //opacity: 0;
}

.frag.returning {
  //opacity: 0;
  opacity: 0;
  transition: 0s;
}
</style>