/*
 * @Date: 2023-11-02 12:04:03
 * @LastEditors: @yujie
 * @LastEditTime: 2024-01-16 11:09:03
 * @Description: 
 */
import { defineComponent, h } from "vue"
export default () => {
  return defineComponent({
    props: {
      vNode: Object,
      show: {
        type: Boolean,
        default: true
      }
    },
    render(props, ctx) {
      return props.show ? props.vNode : ''
    }
  })
}