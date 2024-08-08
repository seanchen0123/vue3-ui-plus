<template>
  <i
    class="vk-icon"
    :class="{
      [`vk-icon--${type}`]: type
    }"
    :style="customStyles"
  >
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IconProps } from './types'

defineOptions({
  name: 'VkIcon',
  // 将props属性直接绑定到组件上，而不用层层传递
  inheritAttrs: false
})

const props = defineProps<IconProps>()
// 过滤掉自定义的props，自定义的props不用传给fontAwesomeIcon
const filteredProps = computed(() => omit(props, ['type', 'color']))

const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
