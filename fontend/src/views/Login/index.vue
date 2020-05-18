<template>
  <main>
    <transition name="fade">
      <article v-if="render" class="login">
        <swiper />
        <login />
      </article>
    </transition>
  </main>
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

<style lang="scss" coped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(http://wxalbum-10001658.image.myqcloud.com/wxalbum/88983/20200516233224/dba2b72196c111aaf9f292b3d61231de.jpg);
  background-repeat: no-repeat;
  background-size: cover;
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
}
</style>
