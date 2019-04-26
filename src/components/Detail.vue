<template>
  <div class="detail">
    <MHeader :back = "true">详情</MHeader>
   
    <div class="detail-content">
      <ul>
        <li>
          <label for="bookName">
            书名
          </label>
          <input type="text" id="bookName" v-model="book.bookName"/>
        </li>
        <li>
          <label for="bookDesc">
             内容简介
          </label>
          <input id="bookDesc" v-model="book.bookDesc">
        </li>
        <li>
           <label for="bookPrice">
              价格
          </label>
          <input type="text" id="bookPrice" v-model="book.bookPrice"/> 
        </li> 
        <li>
          <button @click="save(book.bookId)">保存</button>
        </li>
      </ul>    
    </div>
  </div>
</template>

<script>
import MHeader from '@/base/MHeader'
import { getOneBook,updateBook } from "@/api/index.js";

export default {
  name: 'detail',
  components: {
    MHeader
  },
  data() {
    return {
      book: {}
    }
  },
  computed: {
    bid() {
      return this.$route.params.bid;
    }
  },
  created() {
    this.getOne();
  },
  methods: {
    async getOne() {
      this.book = await getOneBook(this.bid);
      //假如数据为空对象，跳转列表页
      if(!this.book.bookId) {
        this.$router.push('/list');
      }
    },
    async save(id) {
      await updateBook(id,this.book);
      this.$router.push('/list');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail-content {
    position:absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 999;
  }
  .detail ul {
    margin: 0 20px 0;
  }
  .detail label {
    font-size: 25px;
    display: block;
  }
  .detail input {
    height: 25px;
    width: 100%;
    font-size: 20px;
  }
  .detail button {
    margin-top: 10px;
    outline: none;
    border: none;
    width: 80px;
    height: 30px;
    border-radius: 8px;
    background: #afd9ee;
    font-size: 18px;
  }
</style>