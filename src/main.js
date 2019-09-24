import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { rtdbPlugin } from 'vuefire'
import VueTelInput from 'vue-tel-input'

import Requirements from './components/Requirements.vue'
import BigBoy from './components/BigBoy.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueRouter)
Vue.use(rtdbPlugin)
Vue.use(VueTelInput)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: BigBoy },
    { path: '/requirements', component: Requirements },
    { path: '*', redirect: '/' },
  ],

  mode: 'history'
})

var bus = new Vue({})

new Vue({
  el: '#application',
	router,
	data: {
		bus: bus
	},
  render: h => h(App),
}).$mount('#application')
