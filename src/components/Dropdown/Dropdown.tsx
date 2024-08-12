import { computed, defineComponent, Fragment, ref } from 'vue'
import type { PropType } from 'vue'
import { Placement, Options } from '@popperjs/core'
import { MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import { TooltipInstance } from '../Tooltip/types'

export default defineComponent({
  name: 'VkDropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object as PropType<Options>
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    hideAfterClick: {
      type: Boolean,
      default: true
    },
    manual: {
      type: Boolean
    }
  },
  emits: ['visible-change', 'select'],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null)

    const visibleChange = (value: boolean) => {
      emit('visible-change', value)
    }
    const itemClick = (_e: MouseEvent, value: MenuOption) => {
      if (value.disabled) {
        return
      }
      emit('select', value)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }

    const options = computed(() => {
      return props.menuOptions.map(item => {
        return (
          <Fragment key={item.key}>
            {item.divided ? (
              <li role="separator" class="divided-placeholder" />
            ) : (
              ''
            )}
            <li
              class={{
                'vk-dropdown__item': true,
                'is-disabled': item.disabled,
                'is-devided': item.divided
              }}
              id="`dropdown-item-${item.key}`"
              onClick={e => itemClick(e, item)}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide()
    })

    return () => (
      <div class="vk-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          ref={tooltipRef}
          onVisible-change={visibleChange}
        >
          {{
            default: () => slots.default?.(),
            content: () => <ul class="vk-dropdown__menu">{options.value}</ul>
          }}
        </Tooltip>
      </div>
    )
  }
})
