//引入Vue模块
import Vue from 'vue'

//引入jquery
import $ from 'jquery';
//变为全局变量
window.$ = $;
//引入base.css
require('./dist/css/base.css')
//引入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter)
var xmain = require('./component/xmain.vue')
var ask_list = require('./component/ask_list.vue')
var share_list = require('./component/share_list.vue')
var job_list = require('./component/job_list.vue')
var good_list = require('./component/good_list.vue')
var ask_Detail = require('./component/ask_Detail.vue')

var router = new VueRouter({
	routes:[{
		path:'/xmain',
		component:xmain,
		children:[{
					path:'ask_list',
					component:ask_list,
					
				},{
					path:'share_list',
					component:share_list,
					
				},{
					path:'job_list',
					component:job_list,
					
				},{
					path:'good_list',
					component:good_list,
					
				}]
		},{
			path:'/ask_Detail/:id',
			component:ask_Detail
			
		},{
			path:'/',
			redirect:'/xmain/ask_list'
		}]
})


new Vue({
	el:'#demo',
//	data:{
//		name:'xie'
//	},
	template:'<router-view></router-view>',
	router,
	
})
