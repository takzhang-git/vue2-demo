import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: {
        name: 'home',
      },
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: home */ '@/pages/homes/index.vue'),
      name: 'home',
    },
    {
      path: '/vueClassComponent',
      name: 'vueClassComponent',
      component: () => import(/* webpackChunkName: vueClassComponent */ '@/pages/vueClassComponent')
    },
    {
      path: '/vuePropDeco',
      name: 'vuePropDeco',
      component: () => import(/* webpackChunkName: vuePropDeco */ '@/pages/vuePropertyDecorator')
    },
    {
      path: '/slot',
      name: 'slot',
      component: resolve => require(['@/pages/slot/index.vue'], resolve)
    },
    {
      path: '/render',
      name: 'render',
      component: () => import(/* webpackChunkName: render */ '@/pages/render')
    },
    {
      path: '/vuextest',
      name: 'vuextest',
      component: () => import(/* webpackChunkName: vuextest */ '@/pages/vuextest')
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: () => import(/* webpackChunkName: echarts */ '@/pages/echarts')
    },
    {
      path: '/viewBoard',
      name: 'viewBoard',
      component: () => import(/* webpackChunkName: viewBoard */ '@/pages/viewBoard')
    },
    {
      path: '/functiontest',
      name: 'functiontest',
      component: () => import(/* webpackChunkName: functiontest */ '@/pages/functiontest')
    },
    {
      path: '/nextTick',
      name: 'nextTick',
      component: () => import(/* webpackChunkName: nextTick */ '@/pages/nextTick')
    },
    {
      path: '/formValidate',
      name: 'formValidate',
      component: () => import(/* webpackChunkName: formValidate */ '@/pages/formValidate'),
    },
    {
      path: '/v-viewer',
      name: 'vueViewer',
      component: () => import(/* webpackChunkName: vueViewer */ '@/pages/v-viewer'),
    },
    {
      path: '/pictures',
      name: 'pictures',
      component: () => import(/* webpackChunkName: pictures */ '@/pages/pictures'),
    },
    {
      path: '/mixins',
      name: 'mixins',
      component: () => import(/* webpackChunkName: mixins */ '@/pages/mixins'),
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import(/* webpackChunkName: notFound */ '@/pages/404')
    },
  ]
})
