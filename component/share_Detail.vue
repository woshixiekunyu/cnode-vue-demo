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
					<li @click="toLogin()">{{loginVal}}</li>
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
								<img :src="!getIsImg?dis.author.avatar_url:''" v-show="!getIsImg" alt=""/>
								<span>{{dis.author.loginname}}</span>
							</div>
							<div class="content">
								<div v-html="dis.content"></div>
								<div class="sendtime">
									<i @click="zan()">赞</i>
									<i v-times>时间:{{dis.create_at}}</i>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</main>
		<footer>
			<input type="text" v-model="messageCont"/>
			<span @click="sendMessage()">回复</span>
		</footer>
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
		computed:{
			getIsImg:function(){
				return this.$store.state.isImg
			},

		},
		methods:{
			sendMessage(){
				var id = window.location.hash.split('/')[2]
				console.log(id)
				var self = this;
				var cookie = document.cookie.split('; ')
				
				if(cookie[1]){
					if(self.messageCont == ''){
						alert('请输出内容')
						return;
					}
					$.ajax({
						
						url:'https://cnodejs.org/api/v1/topic/'+id+'/replies',
						type:'POST',
						data:{
							accesstoken : '28a0473d-7bed-48a1-a6a6-840afd389ddf',
							content : self.messageCont,
							success(data){
								self.messageCont = '';
							}
						}
					})
				}else{
					alert('请登录')
				}
			},
			login(){
				this.isLogin = !this.isLogin
			},
			back(){
				
				var hrefs = location.hash.split('/')[1].substr(0,5);
				window.location.href="#/xmain/"+hrefs+"_list"
			},
			zan(){
				var cookie = document.cookie.split('; ')
				if(cookie[1]){
					console.log(666)
				}else{
					alert('请登录')
				}
			},
			toLogin(){
				if(this.loginVal == '登录'){
					this.isLogin= false;
					window.location.href="#/login"
				}else if(this.loginVal == '退出'){
					$.ajax({
						url:'https://cnodejs.org/api/v1/accesstoken',
						type:'POST',
						data:{
							accesstoken : '28a0473d-7bed-48a1-a6a6-840afd389ddf'
						},
						success(data){
//							console.log(data)
							var now = new Date();
							now.setDate(now.getDate()-1);
							document.cookie = 'username='+data.loginname+';expires='+now;
							document.cookie = 'userid='+data.id+';expires='+now;
							document.cookie = 'userImg='+data.avatar_url+';expires='+now;
							self.userKey = '';
							location.reload()
						}
					})
				}
			}
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
//			console.log($('.area'))
			if(this.getIsImg){
				this.getIsImg = false;
			}
			var cookie = document.cookie.split('; ')
			if(cookie[1]){
				self.loginVal = '退出'
			}
			

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
		}
	}
</script>
<style>
	
</style>