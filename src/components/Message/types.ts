import { VNode, ComponentInternalInstance } from "vue";

export interface MessageProps {
  /**
   * 内容
   */
  message?: string | VNode;
  /**
   * 消息提示类型
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 多长时间关闭
   */
  duration?: number;
  
  /**
   * 是否显示关闭按钮,点击按钮可以提前关闭消息提示
   */
  showClose?: boolean;

  /**
   * 组件卸载函数
   */
  onDestroy: () => void

  /**
   * 距离窗口顶部距离
   */
  offset?: number
  
  /**
   * 实例id
   */
  id: string

  /**
   * z-index
   */
  zIndex: number

  transitionName?: string
}

export interface MessageContext {
  id: string
  vNode: VNode
  vm: ComponentInternalInstance
  props: MessageProps,
  destroy: () => void
}

export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>