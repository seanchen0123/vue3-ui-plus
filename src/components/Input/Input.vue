<template>
  <div
    class="vk-input"
    :class="{
      [`vk-input--${type}`]: type,
      [`vk-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="vk-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="vk-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="vk-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          v-model="innerValue"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          class="vk-input__inner"
          v-bind="attrs"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :form="form"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          ref="inputRef"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="vk-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix" />
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="vk-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="vk-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="vk-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="vk-input__append">
        <slot name="append" />
      </div>
    </template>
    <template v-else>
      <textarea
        v-model="innerValue"
        class="vk-textarea__wrapper"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        ref="inputRef"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, useAttrs, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { inputProps, inputEmits } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'VkInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<inputProps>(), {
  type: 'text',
  autocomplete: 'off'
})
const emits = defineEmits<inputEmits>()
const attrs = useAttrs()

const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
const inputRef = ref() as Ref<HTMLInputElement>

const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!innerValue.value && isFocus.value
)
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
)

const NOOP = () => {
  // 当点击清除按钮时，会先触发到input外的blur事件，导致无法将数据清空，用空函数阻止默认行为
}
const keepFocus = async () => {
  await nextTick()
  inputRef.value.focus()
}
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}
const handleChange = () => {
  emits('change', innerValue.value)
}
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false
  emits('blur', event)
}
const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

watch(
  () => props.modelValue,
  newValue => {
    innerValue.value = newValue
  }
)

defineExpose({
  ref: inputRef
})
</script>
