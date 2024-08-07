<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from './components/Button/Button.vue'

const buttonRef = ref(null)

onMounted(() => {
  console.log(buttonRef.value)
})
</script>

<template>
  <Button ref="buttonRef" type="success">Test</Button>
  <Button plain type="danger">Plain Button</Button>
  <Button round>Round Button</Button>
  <Button circle>VK</Button>
  <Button disabled>Disabled Button</Button>
</template>

<style scoped></style>
