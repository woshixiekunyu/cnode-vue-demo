<template>
	<div class="share_Detail">
		<header>
			<div class="back" @click="back()">
				<i class="icon icon-jiantou"></i>
			</div>
			<div></div>
			
			<div  :class="{loginBg:isLogin}">
				<i @click="login(2)" class="icon icon-loginMenu"></i>
				<ul v-show="isLogin" v-Ul>
					<li>{{loginVal}}</li>
					<li>关于</li>
				</ul>
			</div>
			
		</header>
		<nav>
			<span v-areaTips></span>
		</nav>
		<main>
			<div class="title">
				<h3 v-html="title"></h3>
				<span v-html="'作者：'+author"></span>
				<span>发表时间：<i class="timess"></i></span>
			</div>
			
			<article v-html="content" v-img>
			</article>
			
			<div class="discuss">
				<h3>评论</h3>
				<div class="discContent" v-img>
					<ul>
						<li v-for="dis in disContent" class="clearfix">
							<div class="userinfor">
								<img :src="dis.author.avatar_url" alt=""/>
								<span>{{dis.author.loginname}}</span>
							</div>
							<div class="content">
								<div v-html="dis.content" v-allA></div>
								<i v-times>时间:{{dis.create_at}}</i>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				title:'',
				time:'',
				loginVal:'登录',
				isLogin:false,
				content:'',
				author:'',
				disContent:'',
				
			}
		},
		methods:{
			login(){
				this.isLogin = !this.isLogin
			},
			back(){
				
				var hrefs = location.hash.split('/')[1].substr(0,5);
				window.location.href="#/xmain/"+hrefs+"_list"
			},
		},
		mounted(){
			var self = this;
			console.log(window.location)
			var params = window.location.hash.split('/')[2]
			console.log(params)
			$.ajax({
				url:'https://cnodejs.org/api/v1/topic/'+params,
				type:'GET',
				data:{
//					mdrender:false
				},
				success:function(data){
					console.log(data)
					self.title = data.data.title;
					self.time = data.data.create_at.substring(0,10)
//					self.time = data.data.create_at;
					$('.timess').html(self.time)
					self.content = data.data.content;
					self.author = data.data.author.loginname;
					self.disContent = data.data.replies;
					
				}
			})
			console.log($('.area'))
			
			

		},
		directives:{
			times(el){
//				console.log($(el))

			},
			Ul(el){

				$(el).css('top',$('header').innerHeight())
			},
			areaTips(el){
				var hrefss = location.hash.split('/')[1].substr(0,5)+'_list';
				
				$(el).html('分享').css('fontSize',16);
				$(el).bind('touchstart',function(e){
					e.target.style.borderBottom = "1px solid #ccc"
					e.target.style.borderLeft = "1px solid #ccc"
					window.location.href="#/xmain/"+hrefss
				})
				$(el).bind('touchend',function(e){
					e.target.style.border = 'none'
				})
			},
//			img:{
//				bind:function(){
//					$('body').on('click','img',()=>{
//						console.log(this)
////						var $cloneImg = $('img').clone().css('position','fixed')
////						.css('left',0).css('top',0).css('width','100%').css('height','100%').appendTo($('body'));
////						$cloneImg.on('click',function(){
////							$(this).remove()
////						})
//						
//					})
//				}
//				
//			},
			img(el){
			
					$(el).on('click','img',function(){
	//					console.log(e.target)
						console.log($(this))
						var $cloneImg = $(this).clone().css('position','fixed')
						.css('left',0).css('top',0).css('width','100%').css('height','100%').appendTo($('body'));
						$cloneImg.on('click',function(e){
							console.log(e)
								$($cloneImg).remove()
							e.stopPropagation();
						})
	
					})
				
			},
			allA:{
				bind(el){
//					console.log($(el).children('.markdown-text').children('p').html())
				}
			}
		}
	}
</script>
<style>
	
</style>