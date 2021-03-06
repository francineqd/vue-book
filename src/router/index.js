import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home"
import List from "@/components/List"
import Collect from "@/components/Collect"
import Add from "@/components/Add"
import Detail from "@/components/Detail"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/list',
      component: List
    },
    {
        path: "/detail/:bid",
        component: Detail,
        name: "detail"
      },
    {
      path: '/collect',
      component: Collect
    },
    {
      path: '/add',
      component: Add
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
