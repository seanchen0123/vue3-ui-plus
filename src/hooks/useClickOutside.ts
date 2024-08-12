import { onMounted, onUnmounted, Ref } from 'vue'

export const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside

