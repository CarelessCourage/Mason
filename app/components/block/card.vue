<script setup lang="ts">
import { fragments } from "~/mason/store"
import { useSlots } from "~/mason/useSlots.js"

const data = useSlots('BlockCard')

</script>

<template>
  <div id="card" class="u-panel">
    <BlockZone :data="data" fragment="banner"/>
    <div class="wrapper select">
      <BlockZone :data="data" fragment="subject"/>
      <BlockZone :data="data" fragment="section"/>
    </div>
  </div>
</template>

<style lang="scss">
  #card  {
    padding: 0px;
    overflow: hidden;
  }

  .banner {
    background: red;
    height: 150px;
    overflow: hidden;
  }

  #card .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-familiar);

    padding: var(--space-seperate);
    padding-bottom: var(--space-divorced);
  }

  .drop.drag-hit {
    opacity: 0.2;
  }

  .drop.land-hit {
    opacity: 0.5;
    //transform: scale(0.2);
  }
</style>