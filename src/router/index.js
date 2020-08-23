import Vue from 'vue'
import VueRouter from 'vue-router'
import newsdetail from '../components/Detail.vue'
import home from '../components/NewsApp.vue'
import newscategory from '../components/NewsCategory.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/newsdetail',
        name: 'newsdetail',
        component: newsdetail
    },
    {
        path: '/newscategory',
        name: 'newscategory',
        component: newscategory
    },
]
const router = new VueRouter({
    routes
})
export default router
router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/home', '/newsdetail','/newscategory'];
    const authRequired = !publicPages.includes(to.path);
  
    if (authRequired) {
      return next('/home');
    }
  
    next();
  })
  
