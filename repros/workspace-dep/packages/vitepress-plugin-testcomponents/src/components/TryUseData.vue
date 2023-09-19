<script setup lang="ts">
// import { useData } from 'vitepress/dist/client/index.js'
import { useData } from 'vitepress'
// import ClientOnly from './ClientOnly.vue'

const { lang } = useData()
</script>

<template>
  <div>
    <!-- <ClientOnly> -->
    <h1>TryUseData</h1>
    <p>lang: {{ lang }}</p>
    <!-- </ClientOnly> -->
  </div>
</template>
