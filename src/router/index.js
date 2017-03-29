import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/home.vue'
import Life from '@/view/life.vue'
import Work from '@/view/work.vue'
import About from '@/view/about.vue'

import TabText from '@/components/tab_text.vue'
import TabAnimate from '@/components/tab_animate.vue'
import TabMusic from '@/components/tab_music.vue'
import TabDemo from '@/components/tab_demo.vue'


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component:Home
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/life',
    component: Life,
    children: [
      {path: '/',component: TabText},
      {path: 'text',component: TabText},
      {path: 'animate',component: TabAnimate},
      {path: 'music',component: TabMusic},
      {path: 'demo',component: TabDemo}
    ]
  },
  {
    path: '/work',
    component: Work
  },
  {
    path: '/about',
    component: About
  }
]

export default new VueRouter({
  linkActiveClass: 'cur',
  routes: routes
});
