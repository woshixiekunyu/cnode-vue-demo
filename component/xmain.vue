<template>
	<div>
		<header>
			<div>
				<i class="icon icon-userMenu" @click="login(1)"></i>
				<div class="left_menu">
					<div class="hasisLeftMenu">
						<h1>用户</h1>
						<div class="infor">
							<img src="image/icon/icon-wujiaoxing.png" alt="" />
							<span>{{name}}</span>
						</div>
						<div class="useImg">
							<div class="hasImg" @click="isHasImg()">
								<span></span>
							</div>
							<span>省流量</span>
						</div>
						<div class="list">
							
						</div>
					</div>
					<div class="noisLeftMenu" @click="noisLeftMenu()"></div>
				</div>
				
			</div>
			<span>ask</span>
			<span>share</span>
			<span>job</span>
			<span>good</span>
			<div  :class="{loginBg:isLogin}">
				<i @click="login(2)" class="icon icon-loginMenu"></i>
				<ul v-show="isLogin">
					<li @click="toLogin()">{{loginVal}}</li>
				</ul>
			</div>
			
		</header>
		<div class="loginPage">
				<div class="loginTop" v-show="isLoginPage">
					<h3>登录页面</h3>
				</div>
				<div class="loginInput" v-show="isLoginPage">
					<input type="text" />
					<button id="btnLogin">登录</button>
					<button id="exitbtn" @click="exitbtn()">取消</button>
				</div>
			</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data:function(){
			return {
				loginVal:'登录',
				isLogin:false,
				name:'谢',
				isImg:true,
				num:0,
				isLoginPage:false
			}
		},
		computed:{
			isHasImgs(){
				return this.$store.state.isImg
			}
		},
		methods:{
			login(num){
				if(num==2){
//					console.log(num)
//					console.log(this.loginVal)
//					
					this.isLogin = !this.isLogin;

					var timer = setInterval(function(){
						this.num += 0.1;
						if(this.num >= 1){
							this.num = 1;
							clearInterval(timer)
						}
						console.log(this.num)
						$('header div').eq(8).children('ul').animate({'opacity':this.num})
					}.bind(this),0)
				}else if(num==1){
					$('.left_menu').animate({'left':0},500)
					
				}
			},
			isHasImg(){
				this.isImg = !this.isImg;
				
				if(this.isImg == false){
					var now = new Date();
					now.setDate(now.getDate()+365)
					document.cookie = 'isImg='+this.isImg + ';expires='+now;
					
					$('.left_menu').children('.hasisLeftMenu').children('.useImg').children('.hasImg').css('backgroundColor','')
					.children('span').css('left','0');
					this.$store.commit('getIsImg',this.isImg)
					
				}else{
					var now = new Date();
					now.setDate(now.getDate()+365)
					document.cookie = 'isImg='+this.isImg + ';expires='+now;
					$('.left_menu').children('.hasisLeftMenu').children('.useImg').children('.hasImg').css('backgroundColor','green')
					.children('span').css('left','0.25rem');
					this.$store.commit('getIsImg',this.isImg)
				}
			},
			noisLeftMenu(){
				$('.left_menu').animate({'left':"-100%"},500)
			},
			exitbtn(){
				this.isLoginPage = false;
				$('.loginPage').animate({'right':'-100%','top':'-100%'},1000);
			},
			toLogin(){
				this.isLogin = false;
				$('.loginPage').animate({'right':0,'top':0},1000,function(){

					this.isLoginPage = true;
				}.bind(this));

					
				
			}
			
		},
		mounted(){

			var self = this;
			var tabArr = ['ask','share','job','good']
			$('header').on('click','span',function(){
				
				$(this).addClass('active').siblings().removeClass('active').fadeToggle('fast','swing');
				for(var i=0;i<tabArr.length;i++){
					if(this.innerText == tabArr[i]){
//						console.log(i)
						window.location.href = "#/xmain/"+tabArr[i] + "_list"
					}
				}

			});
//			console.log(window.location.hash.split('/')[2])
			if(window.location.hash.split('/')[2] == 'ask_list'){
				$('header>span').eq(0).addClass('active').siblings().removeClass('active').fadeToggle('fast','swing')
			}else if(window.location.hash.split('/')[2] == 'share_list'){
				$('header>span').eq(1).addClass('active').siblings().removeClass('active').fadeToggle('fast','swing')
			}else if(window.location.hash.split('/')[2] == 'job_list'){
				$('header>span').eq(2).addClass('active').siblings().removeClass('active').fadeToggle('fast','swing')
			}else if(window.location.hash.split('/')[2] == 'good_list'){
				$('header>span').eq(3).addClass('active').siblings().removeClass('active').fadeToggle('fast','swing')
			}
			
			$('header').parent().on('click',function(){
				this.isLogin = false
			})
			$('header>div').eq(6).children('ul').css('top',40)


			var isHasaImg;
			var cookie = document.cookie.split('; ');
			cookie.forEach(function(item){
				var arr = item.split('=');
				if(arr[0] == 'isImg'){
					isHasaImg = arr[1]
				}
			});
			if(isHasaImg == 'true'){
				console.log(isHasaImg)
				$('.left_menu').children('.hasisLeftMenu').children('.useImg').children('.hasImg').css('backgroundColor','green')
				.children('span').css('left','0.25rem');
				this.$store.commit('getIsImg',true)
			}else{
				console.log(isHasaImg)
				$('.left_menu').children('.hasisLeftMenu').children('.useImg').children('.hasImg').css('backgroundColor','')
				.children('span').css('left','0');
				this.$store.commit('getIsImg',false)
			}
			
			
		}
	}
</script>

<style scoped lang="scss">
	$size:0.16rem;
	
	header{
		/*overflow: hidden;*/
		height: 40px;
		background-color: deepskyblue;
		display: flex;
		z-index: 1000;
		span{
			flex: 1;
			height: 39px;
			color: #000;
			font-size: $size;
			line-height: 40px;
		}
		div{
			flex: 1;
			height: 40px;
			&:nth-child(1){
				i{background: url('image/icon/icon-userMenu.png') no-repeat;}
				.left_menu{
					display: flex;
					width: 100%;
					position: fixed;
					left: -100%;
					top: 0;
					height: 100%;
					z-index: 9999;
					.hasisLeftMenu{
						background: rgba(0,0,0,0.9);
						height: 100%;
						flex:7;
						h1{
							text-align: left;
							padding-left: 0.3rem;
							line-height: 0.6rem;
							color: #fff;
						}
						.infor{
							
							margin-top: 0.6rem;
							display: block;
							img{
								width: 0.4rem;
								height: 0.4rem;
								border: 1px solid #f00;
								border-radius: 50%;
							}
							&>span{
								display: block;
								color: #fff;
								font-size: 0.2rem;
								line-height: 0.3rem;
								height: 0.3rem;
							}
						}
						&>.useImg{
							&>.hasImg{
								width: 0.4rem;
								height: 0.15rem;
	
								background: #fff;
								/*margin-top: 0.6rem;*/
								border-radius: 0.1rem;
								margin: 0.6rem auto 0;
								position: relative;
								&>span{
									width: 0.15rem;
									height: 0.15rem;
									display: block;
									background: blue;
									border-radius: 50%;
									position: absolute;
									left: 0;
									top: 0;
								}
							}
							&>span{
								color:#fff;
								font-size: 0.14rem;
							}
						}
					}
					.noisLeftMenu{
						flex:3;
						height: 100%;
						background: #fff;
						opacity: 0.4;
					}
					
					
				}
			}
			&:nth-child(6){
				flex: 1.5;
				border-radius: 50%;
				position: relative;
				i{background: url('image/icon/icon-loginMenu.png') no-repeat;}
				ul{
					width: 100%;
					position: absolute;
					top: 40px;
					right: 0;
					opacity: 0;
					z-index: 100000;
					li{
						
						width: 100%;
						height: 30px;
						line-height: 30px;
						border: 1px solid deepskyblue;
						border-radius: 50%;
						background-color: #fff;
					}
				}
			}
			i{
				margin: auto;
				width: 24px;
				height: 24px;
				display: block;
				margin-top: 8px;
/*				margin: 8px 5px 0;*/
			}
		}
		.active{
			border-bottom: 1px solid #f00;
		}
		.loginBg{
			background-color: #fff;
			transition: all 1s;
		}
		
	}
	.loginPage{
		width: 100%;
		height: 100%;
		background-color: deepskyblue;
		position: fixed;
		top: -100%;
		right: -100%;
		z-index: 9999;
	}
	.loginPage .loginTop{
		height: 50px;
		width: 100%;
		line-height: 50px;
		text-align: center;
		border-bottom: 1px solid #ccc;
		background-color: #8A2BE2;
		color:#fff;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
	}
	
	.loginPage .loginInput{
		width: 2rem;
		height: 40px;
		margin: 0 auto;
		margin-top: 150px;
	}
	.loginPage input{
		width: 100%;
		height: 100%;
		border-radius: 0.1rem;
		outline: none;
		
	}
	.loginPage button{
		margin-top: 0.1rem;
		width: 30%;
		height: 0.3rem;
		margin-left: 0.3rem;
	}
	
</style>