<script lang="ts">
import { h } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useStore } from 'vuex'

const DynamicHeading = (props: any) => {
  const { icon, title } = props
  const vnodes = []
  const store = useStore()
  if (icon) {
    const svgNode: any = h(SvgIcon, { 'icon-class': icon }, '')
    vnodes.push(svgNode)
  }
  const hide = store.state.app.menu.opened ? 'hide-title' : ''
  if (title) {
    const spanNode: any = h(
      'span',
      {
        class: hide
      },
      title
    )
    vnodes.push(spanNode)
  }
  return h('div', { class: `item-router ${hide ? 'hide-arrow' : ''}` }, vnodes)
}
DynamicHeading.props = {
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 2
  }
}
export default DynamicHeading
</script>
