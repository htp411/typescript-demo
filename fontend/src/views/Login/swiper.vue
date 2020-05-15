<template>
  <swiper ref="swiper" :options="swiperOptions">
    <swiper-slide v-for="banner of banners" :key="banner">
      <div class="banner">
        <img :src="banner" class="banner-img" />
        <div class="img-hover">
          <h1>HELLO</h1>
          <h4>have a nice time !</h4>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'swiperCarrousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      banners: [
        'http://wxalbum-10001658.image.myqcloud.com//wxalbum/88983/20200515231440/5aea4add530c3770417a7a1d94652960.jpg',
        'http://wxalbum-10001658.image.myqcloud.com//wxalbum/88983/20200515231432/91c7af111b30595d01ef1c4c2fe1c46d.jpg',
        'http://wxalbum-10001658.image.myqcloud.com//wxalbum/88983/20200515231436/a739c65048768c993c01aa41d0edf9b1.jpg',
      ],
      swiperOptions: {
        speed: 1000,
        grabCursor: true,
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
        },
        // Some Swiper option/callback...
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper
    },
  },
  moubted() {
    this.swiper.slideTo(3, 1000, false)
  },
}
</script>
<style lang="scss" scoped>
.banner {
  height: 572px;
  position: relative;
  img {
    height: 100%;
  }
  .img-hover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    letter-spacing: 3px;
    h1 {
      font-size: 3.6rem;
    }
    h4 {
      font-weight: 500;
      font-size: 1.5rem;
    }
  }
}
</style>
