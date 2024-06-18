<script setup lang="ts">
import { fragments } from '~/libraries/mason/store'
</script>

<template>
  <Type/>
  <div class="test">
    <InputButton>
      click me
    </InputButton>
    <InputSlider>
      title:
    </InputSlider>
    <InputCheckbox>
      condition
    </InputCheckbox>
  </div>

  <div class="fragments u-panel">
    <Frag 
      v-if="fragments" v-for="(frag, name) in fragments"
      :key="name" :is="frag" :name="name"
    />
  </div>

  <BlockCard/>
  <BlockCard/>
  <BlockCard/>
  <BlockCard/>
</template>

<style lang="scss">
.fragments {
  display: flex;
  gap: var(--space-familiar);
  flex-direction: column;

  background-color: var(--shade);
  padding: var(--space-familiar);
  margin-bottom: var(--space-seperate);
  img {
    max-height: 200px;
  }
}

.test {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  background-color: red;
  min-height: 10em;


  gap: var(--space-familiar);
  padding: var(--space-seperate) 0px;

  flex-direction: row;
}
</style>