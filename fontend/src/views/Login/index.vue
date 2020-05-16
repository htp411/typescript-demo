<template>
  <transition name="fade">
    <article v-if="render" class="login">
      <swiper />
      <login />
    </article>
  </transition>
</template>

<script>
import Swiper from './swiper.vue'
import Login from './login.vue'
export default {
  components: {
    Swiper,
    Login
  },
  mounted() {
    this.render = true
  },
  data() {
    return {
      render: false
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}
article.login {
  display: flex;
  height: 572px;
  background-color: #fff;
  border-radius: 5px;
  user-select: none;
  box-shadow: 2px 2px 5px 5px rgba(234, 234, 234, 0.1);
  > * {
    width: 500px;
  }
  .swiper-pagination-bullet {
    background: #efefef !important;
    &.swiper-pagination-bullet-active {
      background: #efefef !important;
    }
  }
}
</style>
