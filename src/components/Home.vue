<template>
  <div class="home">
    <MHeader>首页</MHeader>
    <div class="main-content">
      <Swiper :swiperSlides="swiperSlides"></Swiper>
      <div class="hot-books">
        <h3>热门图书</h3>
        <ul>
          <li v-for="book in hotBooks" :key="book.bookId">
            <img :src="book.bookCover" :title="book.bookDesc" :alt="book.bookDesc">
            <p>{{book.bookName}}</p>
          </li>
        </ul>
      </div>
    </div> 
  </div>
</template>

<script>
import MHeader from '@/base/MHeader'
import Swiper from '@/base/Swiper';
import {getSliders,getHotBooks} from '@/api/index.js'
export default {
  name: 'Home',
  data() {
    return {
      swiperSlides: [],
      hotBooks: []
      }
  },
  created() {
    this.getSlider();
    this.getHot();
  },
  components: {
    MHeader,
    Swiper
  },
  methods: {
    async getSlider() {
      this.swiperSlides = await getSliders();
    },
    async getHot() {
      this.hotBooks = await getHotBooks(); 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hot-books li {
    float: left;
    width: 50%;
    margin: 5px 0;
    text-align: center;
  }
</style>
