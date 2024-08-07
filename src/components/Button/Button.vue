<template>
  <button
    ref="_ref"
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span><slot /></span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineOptions, ref } from 'vue'
import type { ButtonProps } from './types'

defineOptions({
  name: 'VkButton'
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>();

// 暴露组件实例的一些属性
defineExpose({
  ref: _ref
})
</script>


<style>
.vk-button {
  background-color: var(--main-bg-color);
}
</style>