/*
 * @Date: 2023-11-20 16:22:55
 * @LastEditors: @yujie
 * @LastEditTime: 2023-11-22 13:34:09
 * @Description: 
 */
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}