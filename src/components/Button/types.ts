export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'small' | 'large'
export type Nativetype = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  /**
   * 按钮类型
   */
  type?: ButtonType

  /**
   * 按钮大小
   */
  size?: ButtonSize

  /**
   * 是朴素按钮
   */
  plain?: boolean

  /**
   * 按钮是否有圆角
   */
  round?: boolean

  /**
   * 是否圆形按钮
   */
  circle?: boolean

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 原生type
   */
  nativeType?: Nativetype

  /**
   * 是否自动聚焦
   */
  autofocus?: boolean

  /**
   * 点击事件
   */
  onClick?: () => void
}
