import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import Details from '../views/Details.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Search,
    props: true,
    meta: {
      title: 'REST API Countries App - Homepage'
    }
  },
  {
    path: '/:country',
    name: 'country-detail',
    component: Details,
    props: true,
    meta: {
      title: 'REST API Countries App'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router