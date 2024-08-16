export interface inputProps {
  modelValue: string

  /**
   * 输入框类型
   */
  type: string

  /**
   * 输入框尺寸
   */
  size?: 'small' | 'large'

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 是否可清空
   */
  clearable?: boolean

  /**
   * 是否需要显示密码的功能
   */
  showPassword?: boolean

  /**
   * 占位字符
   */
  placeholder?: string

  /**
   * 是否只读
   */
  readonly?: boolean

  /**
   * 是否自动获取焦点
   */
  autofocus?: boolean
  
  /**
   * 原生属性：表单自动填充特性提示
   */
  autocomplete?: string

  /**
   * 一个字符串，指定该输入与之相关的表单元素
   */
  form?: string
}

export interface inputEmits {
  (e: 'update:modelValue', value: string): void
  // input 的 input事件指的是值有变化就算
  (e: 'input', value: string): void
  // input 的 change事件指的是修改了值，并且失去了 focus
  (e: 'change', value: string): void
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'clear'): void
}
