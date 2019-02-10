import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import timechange from '../components/timechange.vue'
import ctime from '../components/ctime.vue'
export default new Router({
  routes: [
    
    {path:"/",component:ctime,children:[
      {path:"timechange",component:timechange}
    ]}
   
  ]
})
