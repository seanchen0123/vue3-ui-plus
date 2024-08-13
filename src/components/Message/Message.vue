<template>
  <Transition
    :name="transitionName"
    @after-leave="destroyComponent"
    @enter="updateHeight"
  >
    <div
      v-show="visible"
      class="vk-message"
      :class="{ [`vk-message--${type}`]: type, 'is-close': showClose }"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="vk-message__content">
        <slot>
          {{ height }}-{{ lastOffset }}-{{ topOffset }}-{{ bottomOffset }}
          <RenderVNode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="vk-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { MessageProps } from './types'
import RenderVNode from '../Common/RenderVNode'
import Icon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './method'
import useEventLister from '../../hooks/useEventListener'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  zIndex: 2000,
  transitionName: 'fade-up'
})

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const height = ref(0)
// 上一个实例底部距离顶部的高度
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 当前实例距离顶部的高度
const topOffset = computed(() => props.offset + lastOffset.value)
// 为下一个元素预留的高度
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: props.zIndex
}))
let timer: any

const startTimer = () => {
  if (props.duration === 0) {
    return
  }
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
const clearTimer = () => {
  clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true
  // 初始组件高度赋值操作也放到transition动画钩子中处理
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
  startTimer()
})

useEventLister(document, 'keydown', function (e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
})

// 直接用动画钩子函数处理组件的销毁逻辑
// watch(visible, newVal => {
//   if (!newVal) {
//     props.onDestroy()
//   }
// })
const destroyComponent = () => {
  props.onDestroy()
}
const updateHeight = () => {
  height.value = messageRef.value!.getBoundingClientRect().height
}

defineExpose({
  visible,
  bottomOffset
})
</script>
