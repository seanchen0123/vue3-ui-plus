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
  <Tooltip
    content="hello tooltip"
    placement="top"
    ref="tooltipRef"
    :popper-options="options"
  >
    <Button type="warning" plain>tooltip</Button>
  </Tooltip>
  <br />
  <Button type="success" @click="tooltipOpen">manual tooltip open</Button>
  <Button type="danger" @click="tooltipClose">manual tooltip close</Button>
  <br />
  <Dropdown
    :menu-options="menuOptions"
    placement="bottom"
    trigger="click"
    @visible-change="e => inlineConsole('visible-chage', e)"
    @select="e => inlineConsole('select', e)"
    manual
    ref="tooltipRef"
  >
    <Button type="primary">Dropdown</Button>
  </Dropdown>
  <!-- <Message :message="h('div', 'hello message')" showClose /> -->
  <Switch v-model="switchValue" />
  <Switch v-model="switchValueStr" activeValue="right" inactiveValue="wrong" activeText="ON" inactiveText="OFF" />
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import { TooltipInstance } from './components/Tooltip/types'
import { Options } from '@popperjs/core'
import Dropdown from './components/Dropdown/Dropdown.vue'
import { MenuOption } from './components/Dropdown/types'
// import Message from './components/Message/Message.vue'
import { createMessage } from './components/Message/method'
import Switch from './components/Switch/Switch.vue'

const buttonRef = ref(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openValue = ref(['a'])
const options: Partial<Options> = { placement: 'right-end' }
const menuOptions: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

const tooltipOpen = () => {
  tooltipRef.value?.show()
}

const tooltipClose = () => {
  tooltipRef.value?.hide()
}

const inlineConsole = (...args: any) => {
  console.log(...args)
}

const switchValue = ref(false)
const switchValueStr = ref('wrong')

onMounted(() => {
  // console.log(buttonRef.value)
  createMessage({
    message: 'hello message',
    duration: 3000,
    showClose: true
  })
  createMessage({
    message: 'hello message again',
    duration: 4000,
    showClose: true,
    type: 'success'
  })
  createMessage({
    message: 'hello message three',
    duration: 5000,
    type: 'warning'
  })
})
</script>

<style scoped></style>
