<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      class="notification"
      :style="style"
      :class="type"
      v-show="visiable"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">{{ content }}</span>
      <a class="btn" @click="handleClose">{{ btn }}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      require: true
    },
    btn: {
      type: String,
      default: '关闭'
    },
    type: {
      type: String,
      default: 'success'
    },
    autoClose: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      visiable: true
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    afterEnter() {
      //
    },
    afterLeave() {
      this.$emit('closed')
    },
    clearTimer() {
      //
    },
    createTimer() {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  display: inline-flex;
  color: #fff;
  font-size: 1.25rem;
  align-items: center;
  padding: 10px 20px;
  min-width: 200px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.05),
    0px 6px 10px 0px rgba(0, 0, 0, 0.05), 0px 1px 18px 0px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
  transition: all 0.3s;
  border-radius: 3px;
}
.success {
  background-color: #bee7e9;
}
.info {
  background-color: #19caad;
}
.warning {
  background-color: #ecad9e;
}
.danger {
  background-color: #f4606c;
}
.content {
  padding: 0;
}

.btn {
  color: #fff;
  font-weight: 400;
  padding-left: 24px;
  margin-left: auto;
  cursor: pointer;
}
</style>
