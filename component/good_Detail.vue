<template>
	<div class="job_Detail">
		<header>
			<div class="back" @click="back()">
				<i class="icon icon-jiantou"></i>
			</div>
			<div><span></span></div>
			
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
			
			<article v-html="content">
			</article>
			
			<div class="discuss">
				<h3>评论<span>共{{disnum}}条评论</span></h3>
				<div class="discContent">
					<ul>
						<li v-for="dis in discContent" class="clearfix">
							<div class="userinfor">
								<img :src="!getIsImg?dis.author.avatar_url:''" v-show="!getIsImg" alt=""/>
								<span>{{dis.author.loginname}}</span>
							</div>
							<div class="content">
								<span v-html="dis.content"></span>
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
				discContent:'',
				disTime:'',
				disnum:0
			}
		},
		methods:{
			login(){
				this.isLogin = !this.isLogin
			},
			back(){
				
				var hrefs = location.hash.split('/')[1].substr(0,4);
				window.location.href="#/xmain/"+hrefs+"_list"
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
							console.log(data)
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
			},
			zan(){
				var cookie = document.cookie.split('; ')
				if(cookie[1]){
					console.log(666)
				}else{
					alert('请登录')
				}
			},
		},
		computed:{
			getIsImg:function(){
				return this.$store.state.isImg
			},

		},
		mounted(){
			var self = this;
//			console.log(window.location)
			var params = window.location.hash.split('/')[2]
			console.log(params)
			$.ajax({
				url:'https://cnodejs.org/api/v1/topic/'+params,
				type:'GET',
				success:function(data){
					console.log(data)
					self.title = data.data.title;
					self.time = data.data.create_at.substr(0,10)
					$('.timess').html(self.time)
					self.content = data.data.content;
					self.author = data.data.author.loginname
					self.discContent = data.data.replies;
					console.log(data.data.replies)
					if(data.data.replies.length>0){
						self.disnum = self.discContent.length
					}
				}
			})
//			console.log($('.area'))
			var cookie = document.cookie.split('; ')
			if(cookie[1]){
				self.loginVal = '退出'
			}
			

		},
		directives:{
			times(el){
				$(el).html($(el).html().substr(0,13))
			},
			Ul(el){

				$(el).css('top',$('header').innerHeight())
			},
			areaTips(el){
				var hrefss = location.hash.split('/')[1].substr(0,4)+'_list'
				$(el).html(hrefss).css('fontSize',16);
				$(el).bind('touchstart',function(e){
					e.target.style.borderBottom = "1px solid #ccc"
					e.target.style.borderLeft = "1px solid #ccc"
					window.location.href="#/xmain/"+hrefss
				})
				$(el).bind('touchend',function(e){
					e.target.style.border = 'none'
				})
			},
			
		}
	}
</script>
