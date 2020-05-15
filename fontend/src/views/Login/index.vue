<template>
  <article>
    <swiper />
    <login />
  </article>
</template>

<script>
import Swiper from './swiper.vue'
import Login from './login.vue'
export default {
  components: {
    Swiper,
    Login,
  },
}
</script>

<style lang="scss" scoped>
article {
  display: flex;
  height: 572px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 5px rgba(234, 234, 234, 0.1);
  > * {
    width: 500px;
  }
}
</style>
