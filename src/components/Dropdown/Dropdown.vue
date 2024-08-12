<template>
  <div class="vk-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      ref="tooltipRef"
      @visible-change="visibleChange"
    >
      <slot />
      <template #content>
        <ul class="vk-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="devided-placeholder"
            />
            <li
              class="vk-dropdown__item"
              :class="{
                'is-disabled': item.disabled,
                'is-devided': item.divided
              }"
              :id="`dropdown-item-${item.key}`"
              @click="$event => itemClick($event, item)"
            >
              <RenderVNode :vNode="item.label" />
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
import {
  DropdownProps,
  DropdownEmits,
  MenuOption,
  DropdownInstance
} from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import RenderVNode from '../Common/RenderVNode'
import { TooltipInstance } from '../Tooltip/types'

defineOptions({
  name: 'VkDropdown'
})
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>

const visibleChange = (value: boolean) => {
  emits('visible-change', value)
}
const itemClick = (_e: MouseEvent, value: MenuOption) => {
  if (value.disabled) {
    return
  }
  emits('select', value)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

defineExpose<DropdownInstance>({
  show: tooltipRef?.value?.show,
  hide: tooltipRef?.value?.hide
})
</script>
