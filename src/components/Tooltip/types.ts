import type { Placement, Options } from '@popperjs/core'

export interface TooltipProps {
  /**
   * 展示内容
   */
  content?: string
  /**
   * 触发方式
   */
  trigger?: 'hover' | 'click'
  /**
   * 内容方位
   */
  placement?: Placement
  /**
   * 是否手动控制显示
   */
  manual?: boolean
  /**
   * popper.js 配置
   */
  popperOptions?: Partial<Options>
  /**
   * 过渡动画
   */
  transition?: string
  /**
   * 显示延迟
   */
  openDelay?: number
  /**
   * 隐藏延迟
   */
  closeDelay?: number
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
