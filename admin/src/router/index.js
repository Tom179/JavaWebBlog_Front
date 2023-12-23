import Vue from 'vue' 
import VueRouter from 'vue-router'
import login from '../views/LoginComponent.vue'
import regist from '../views/RegistComponent.vue'
import admin from '../views/AdminComponent.vue'//
import Index from '../components/admin/Index.vue'
import AddArt from '../components/article/AddArt.vue'
import ArtList from '../components/article/ArtList.vue'
import UserList from '../components/user/UserList.vue'
import Article from '../components/article/Article.vue'
import PersonalCenter from '../components/article/PersonalCenter.vue'
Vue.use(VueRouter)

const routes = [
  {//配置路由,引入组件
    path: '/login',
    name: 'LoginComponent',
    component: login
  },
  {
    path: '/regist',
    name: 'RegistComponent',
    component: regist
  },
  {
    path: '/admin',
    name: 'AdminComponent',//组件名
    component:admin,
    children:[//路由组，子路由不加斜杠
      {path:'index',component:Index},
      {path:'addart',component:AddArt},
      {path:'artlist',component:ArtList},
      {path:'userList',component:UserList},
      {path:'Art/:id',component:Article},//article/:id
      {path:'PersonalCenter',component:PersonalCenter}
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  const token=window.sessionStorage.getItem('token')
  console.log(token);
  if(to.path=='/login') return next()
  if(!token&&to.path=='/admin'){
    next('login')
  }else {
    next()
  }
})

export default router
