<template>
  <div
    class="vk-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div class="vk-collapse-item__header" :id="`item-header-${name}`">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="vk-collapse-item__content" :id="`item-content-${name}`">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CollapseItemProps } from './types'
import { defineProps } from 'vue'

defineOptions({
  name: 'VkCollapseItem'
})

defineProps<CollapseItemProps>()
</script>
