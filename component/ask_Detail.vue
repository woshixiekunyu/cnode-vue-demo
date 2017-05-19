<template>
	<div>
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
				<h3>问题:{{title}}</h3>
				<span>发表时间：<i class="timess"></i></span>
			</div>
			
			<article>
				<p>{{content}}</p>
			</article>
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
				content:''
			}
		},
		methods:{
			login(){
				this.isLogin = !this.isLogin
			},
			back(){
				
				var hrefs = location.hash.split('/')[1].substr(0,3);
				window.location.href="#/xmain/"+hrefs+"_list"
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
					
					mdrender:false
				},
				success:function(data){
					console.log(data)
					self.title = data.data.title;
					self.time = data.data.create_at.substring(0,10)
//					self.time = data.data.create_at;
					$('.timess').html(self.time)
					self.content = data.data.content;
				}
			})
			console.log($('.area'))

		},
		directives:{
			times(el){
				console.log($(el))

			},
			Ul(el){

				$(el).css('top',$('header').innerHeight())
			},
			areaTips(el){
				var hrefss = location.hash.split('/')[1].substr(0,3)+'_list'
				$(el).html(hrefss).css('fontSize',16);
				$(el).bind('touchstart',function(e){
					e.target.style.borderBottom = "1px solid #ccc"
					e.target.style.borderLeft = "1px solid #ccc"
					window.location.href="#/xmain/"+hrefss
				})
				$(el).bind('touchend',function(e){
					e.target.style.border = 'none'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	body{
		header{
			height: 40px;
			/*background-color: greenyellow;*/
			display: flex;
			background-color: purple;
			div{
				i{
					margin: 10px auto;
				}
				&:nth-child(1){
					flex: 1;
					height: 40px;
					
					background-color: blueviolet;
					i{
						/*margin-top: 12px;*/
	
						display: block;
						width: 24px;
						height: 24px;
						background: url('image/icon/icon-jiantou.png') no-repeat;
					}
				}
				&:nth-child(2){
					flex: 7.5;
					
				}
				&:nth-child(3){
					flex: 1.5;
					
					position: relative;
					border-radius: 50%;
					i{
						/*margin-top: 8px;*/
						width: 24px;
						height: 24px;
						display: block;
						background: url('image/icon/icon-loginMenu.png');
						
					}
					ul{
						position: absolute;
						right: 0;
						top: 0;
						width: 100%;
						li{
							width: 100%;
							height: 24px;
							line-height: 24px;
							text-align: center;
							border: 1px solid purple;
							background-color: #fff;
							border-radius: 50%;
						}
					}
				}
			}
		}
		nav{
			margin-top: 40px;
			height:30px;
			width: 100%;
			border-bottom: 1px solid #ccc;
			&>span{
				width: 80px;
				height: 30px;
				line-height: 30px;
				display: block;
				background: url('image/icon/icon-areaTips.png') no-repeat;
				text-align: center;
			}
		}
		main{
			
			
			.title{
				border-bottom: 1px solid green;
				overflow: hidden;
				h3{
					padding: 5px 10px;
					text-indent: 0.3rem;
					line-height: 0.3rem;
				}
				span{
					float: right;
					margin-right: 0.15rem;
					line-height: 0.2rem;		
				}
			}
			
			article{
				p{
					text-align: center;
				}
			}
		}
		.loginBg{
			background-color: #fff;
			transition: all 1s;
		}
	}
</style>