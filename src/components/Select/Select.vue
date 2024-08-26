<template>
  <div
    class="vk-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
  >
    <Tooltip ref="tooltipRef" placement="bottom-start" manual>
      <Input
        v-model="innerValue"
        :disabled="disabled"
        :placeholder="placeholder"
      />
      <template #content>
        <ul class="vk-select__menu">
          <template v-for="item in options" :key="index">
            <li
              class="vk-select__menu-item"
              :class="{ 'is-disabled': disabled }"
              :id="`select-item-${item.value}`"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { SelectProps, SelectEmits } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue'

defineOptions({
  name: 'VkSelect'
})

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '请选择',
  disabled: false
})
const emits = defineEmits<SelectEmits>()

const tooltipRef = ref() as Ref<TooltipInstance>
const innerValue = ref('')
const isDropdownShow = ref(false)

const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}

const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
</script>
