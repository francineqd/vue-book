import axios from 'axios';
//  http://localhost:4000/sliders
// 增加默认请求路径
axios.defaults.baseURL = 'http://localhost:4000';

// 设置拦截器 处理好响应数据后给前台
axios.interceptors.response.use((res)=>{
  return res.data;
});

// 获取轮播图数据
export let getSliders = ()=>{
  // 返回一个promsie对象 
  return axios.get('/sliders');
}

// 获取热门图书数据
export let getHotBooks = ()=>{
  // 返回一个promsie对象 
  return axios.get('/hot');
}

// // 获取所有图书数据
// export let getAllBooks = ()=>{
//   return axios.get('/getAllBooks');
// }

// 将所有图书信息进行分类
export let pagination = (index)=>{
  // 返回一个promsie对象 
  return axios.get(`/page?index=${index}`);
}

// 删除指定的图书
export let removeBook = (id)=>{
  return axios.delete(`/book?id=${id}`);
}

// 获取指定的图书信息
export let getOneBook = (id)=>{
  return axios.get(`/book?id=${id}`);
}

// 修改指定图书信息
export let updateBook = (id,data)=>{
  return axios.put(`/book?id=${id}`,data);
}