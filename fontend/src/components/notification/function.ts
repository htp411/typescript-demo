import Vue from 'vue'
import Component from './func-notificatin'

class NotificatinConstructor extends Vue.extend(Component) {
  id: any
  vm: any
}
const instances: NotificatinConstructor[] = []
let seed = 1

const removeInstance = (instance: NotificatinConstructor) => {
  if (!instance) return
  const index = instances.findIndex(index => instance.id === index.id)
  instances.splice(index, 1)
  const len = instances.length
  if (len < 1) return
  const removeHeight = instance.vm.height

  for (let i = index; i < len; i++) {
    instances[i].verticalOffset - removeHeight - 16
  }
}

const notify = (option: any) => {
  if (Vue.prototype.$isServer) return
  const instance = new NotificatinConstructor({
    propsData: {
      ...option
    }
  })
  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visiable = true

  let verticalOffset = 0
  instances.forEach(
    item => (verticalOffset += (item.$el as any).offsetHeight + 16)
  )
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visiable = false
  })
  return instance.vm
}
export default notify
