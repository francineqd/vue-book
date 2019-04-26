<template>
  <div class="list">
    <MHeader :back="true">列表</MHeader>
    <div class="main-content" @scroll="loadMore" ref="scroll">
      <ul>
        <router-link v-for="book in books" :to="{name:'detail',params:{bid:book.bookId}}" :key="book.bookId" tag="li">
          <img :src="book.bookCover" alt="">
          <div>
            <h4>{{ book.bookName }}</h4>
            <p>{{ book.bookDesc }}</p>
            <b>{{ book.bookPrice }}</b>
            <div><button @click.stop="remove(book.bookId)">删除</button></div>
          </div>
        </router-link>
      </ul>
      <div class="more" @click="getMore">{{ loadMoreText }}</div>
    </div>
  </div>                                                                                                                     
</template>

<script>
import MHeader from '@/base/MHeader'
import { /*getAllBooks,*/pagination,removeBook } from '@/api/index.js'

let distance = 0;
export default {
  name: 'List',
  components: {
    MHeader
  },
  data() {
    return {
      // allBooks: [],
      books: [],
      index: 0,
      hasMore: true,
      isLoading:false,
      loadMoreText: "加载更多"
    }
  },
  created() {
    // 获取所有图书
    // this.getAll();  
    this.getBooks();
  },
  mounted() {
    // // 移动端下拉列表
    // let scroll = this.$refs.scroll;
    
    // scroll.addEventListener('touchstart',(e) => {
    //   let top = scroll.offsetTop;
    //   let start = e.touches[0].pageY;
    //   // 触摸移动
    //   let move = (e) => {
    //     let current = e.touches[0].pageY;
    //     distance = current - start;
    //     scroll.style.top = top + distance + 'px'; 
    //   };
    //   // 触摸结束
    //   let end = (e) => {
        
    //   };
    //   scroll.addEventListener('touchmove',move);
    //   scroll.addEventListener('touchend',end); 
    // })
  },
  methods: {
    // 获取所有图书
    // async getAll() {
    //   this.allBooks = await getAllBooks();    
    // },
    getMore() {
      this.getBooks();
    },
    loadMore(evnet) {
      // 用延时器实现函数节流
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        let {scrollHeight,scrollTop,clientHeight} = this.$refs.scroll;
        if(scrollTop + clientHeight + 20 >= scrollHeight) {
          this.getMore();
        }
      },30);
    },
    async getBooks() { // 0~4 5~9 10~15
      // 有更多数据才进行数据获取
      if(this.hasMore && !this.isLoading) {
        this.loading = true;
        let {hasMore,books} = await pagination(this.index);
        this.books = [...this.books,...books];  
        this.hasMore = hasMore;  
        this.isLoading = false;
        this.index = this.books.length;
      } else {
        this.loadMoreText = "没有更多了";
      }
    },
    async remove(id) {
      await removeBook(id);
      // 删除前台数据
      this.allBooks = this.allBooks.filter(item=>item.bookId !== id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-content ul {
    display: flex;
    flex-wrap: wrap;
  }  
  .main-content ul li {
    display: flex;
    width: 300px;
  }  
  .main-content ul h4{
    line-height: 30px;
  }  
  .main-content ul b {
    font-size: 20px;
    color: orange;
  }  
  .main-content ul li div {
    padding: 10px 0;
  }  
  .main-content ul li p {
    margin: 10px 0;
  }  
  .main-content button {
    outline: none;
    border: none;
    width: 80px;
    height: 30px;
    border-radius: 8px;
    background: #afd9ee;
    font-size: 18px;  
  }  
  .main-content .more {
    margin: 0 10px;
    height: 30px;
    line-height: 30px;
    background: #afd9ee;
    font-size: 20px;
    text-align: center;
  }
</style>