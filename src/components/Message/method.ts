import { h, render, shallowReactive } from 'vue'
import { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
import  useZIndex from '../../hooks/useZIndex'

let seed = 1
const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const container = document.createElement('div')

  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const destroy = () => {
    // 从instances中找到对应的实例，然后将其从数组中删除
    const idx = instances.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }

  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy
  }

  // 根据Message组件创建vNode
  const vNode = h(MessageConstructor, newProps)
  // 将vNode渲染到container上
  render(vNode, container)
  // 使用firstElementChild来获取vNode的根节点，然后将其添加到body中
  document.body.appendChild(container.firstElementChild!)
  // 获取组件内部实例
  const vm = vNode.component!

  const instance = {
    id,
    container,
    vNode,
    vm,
    props: newProps,
    destroy: manualDestroy
  }
  instances.push(instance)

  return instance
}

export const getLastInstance = () => {
  return instances[instances.length - 1]
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) return 0
  const prev = instances[idx - 1]
  return prev.vm.exposed!.bottomOffset.value
}