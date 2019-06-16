import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import JsonTranslate from '@/components/JsonTranslate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/jsonTranslate',
      name: 'JsonTranslate',
      component: JsonTranslate
    }
  ]
})
