import { VNode } from 'vue'
import { TooltipProps } from '../Tooltip/types'

export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[]
    /**
   * 是否在点击选项后关闭弹出层
   */
    hideAfterClick?: boolean
}

export interface MenuOption {
  /**
   * 展示的文本
   */
  label: string | VNode

  /**
   * 唯一标识
   */
  key: string | number

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 是否分添加分隔符
   */
  divided?: boolean
}

export interface DropdownEmits {
  (e: 'visible-change', value: boolean): void
  (e: 'select', value: MenuOption): void
}

export interface DropdownInstance {
  show: () => void
  hide: () => void
}
