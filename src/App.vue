<template>
  <div>
    <Button ref="buttonRef" type="success">Test</Button>
    <Button plain type="danger">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button>
    <Button loading size="large">Loading Button</Button>
  </div>

  <div style="width: 500px">
    <Collapse v-model="openValue" :accordion="false">
      <CollapseItem name="a" title="Title 1">
        <p>Content 1</p>
      </CollapseItem>
      <CollapseItem name="b" title="Title 2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
          consequuntur quo voluptate itaque minus enim tenetur. Et, soluta nisi
          totam voluptatem nulla voluptates distinctio perspiciatis ipsum
          officia, atque necessitatibus neque.
        </p>
      </CollapseItem>
      <CollapseItem name="c" title="nice ccc" disabled>
        <p>Content 3</p>
      </CollapseItem>
    </Collapse>
  </div>
  <Icon icon="fa-solid fa-arrow-up" type="primary" color="pink" />
  <Icon icon="fa-solid fa-arrow-down" type="danger" />
  <Tooltip content="hello tooltip" placement="top" ref="tooltipRef" :popper-options="options">
    <Button type="warning" plain >tooltip</Button>
  </Tooltip>
  <br />
  <Button type="success" @click="tooltipOpen" >manual tooltip open</Button>
  <Button type="danger" @click="tooltipClose" >manual tooltip close</Button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import { TooltipInstance } from './components/Tooltip/types'
import { Options } from '@popperjs/core'

const buttonRef = ref(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openValue = ref(['a'])
const options: Partial<Options> = { placement: 'right-end'} 

const tooltipOpen = () => {
  tooltipRef.value?.show()
}

const tooltipClose = () => {
  tooltipRef.value?.hide()
}

onMounted(() => {
  // console.log(buttonRef.value)
})
</script>

<style scoped></style>
