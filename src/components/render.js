import { defineComponent, h } from "vue"
export default () => {
  return defineComponent({
    props: ['vNode'],
    render(props, ctx) {
      return props.vNode
    }
  })
}