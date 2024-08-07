<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'

const buttonRef = ref(null)

onMounted(() => {
  console.log(buttonRef.value)
})
</script>

<template>
  <div>
    <Button ref="buttonRef" type="success">Test</Button>
    <Button plain type="danger">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button>
  </div>

  <div>
    <Collapse>
      <CollapseItem name="a">
        <template #title>
          <h1>nice price</h1>
        </template>
        <p>Content 1</p>
      </CollapseItem>
      <CollapseItem name="b" title="nice title name b">
        <p>Content 2</p>
      </CollapseItem>
      <CollapseItem name="c" title="nice ccc" disabled>
        <p>Content 3</p>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<style scoped></style>
