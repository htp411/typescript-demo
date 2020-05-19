import Notification from './notification.vue'
interface Style {
  [key: string]: string
}
export default {
  extends: Notification,
  data() {
    return {
      verticalOffset: 0,
      height: 0,
      visiable: false
    }
  },
  mounted() {
    ;(this as any).createTimer()
  },
  computed: {
    style(): Style {
      return {
        position: 'fixed',
        right: '20px',
        top: `${(this as any).verticalOffset}px`
      }
    }
  },
  methods: {
    createTimer() {
      if ((this as any).autoClose) {
        ;(this as any).timer = setTimeout(() => {
          ;(this as any).visiable = false
        }, (this as any).autoClose)
      }
    },
    clearTimer() {
      if ((this as any).timer) clearTimeout((this as any).timer)
    },
    afterEnter() {
      ;(this as any).height = (this as any).$el.offsetHeight
    },
    beforeDestory() {
      this.clearTimer()
    }
  }
}
