<template>
	<div>
		<header>
			<div>
				<i class="icon icon-userMenu" @click="login(1)"></i>
				<ul>
					<li></li>
				</ul>
			</div>
			<span>ask</span>
			<span>share</span>
			<span>job</span>
			<span>good</span>
			<div  :class="{loginBg:isLogin}">
				<i @click="login(2)" class="icon icon-loginMenu"></i>
				<ul v-show="isLogin">
					<li>{{loginVal}}</li>
					<li>关于</li>
				</ul>
			</div>
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data:function(){
			return {
				loginVal:'登录',
				isLogin:false,
				
			}
		},
		methods:{
			login(num){
				if(num==2){
					console.log(this.loginVal)
					
					this.isLogin = !this.isLogin;
					setInterval(function(){
						$('header div').eq(1).children('ul').animate({'opacity':1})
					}.bind(this),50)
				}else{
					console.log(num)
				}
			},
			
		},
		mounted(){
			var self = this;
			var tabArr = ['ask','share','job','good']
			$('header').on('click','span',function(){
				
				$(this).addClass('active').siblings().removeClass('active').fadeToggle('fast','swing');
				for(var i=0;i<tabArr.length;i++){
					if(this.innerText == tabArr[i]){
						console.log(i)
						window.location.href = "#/xmain/"+tabArr[i] + "_list"
					}
				}
//				window.location.href=""
			});
			console.log(window.location.hash.split('/')[2])
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
			$('header div').eq(1).children('ul').css('top',$('header').innerHeight())
		}
	}
</script>

<style scoped lang="scss">
	$size:0.16rem;
	header{
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
			}
			&:nth-child(6){
				border-radius: 50%;
				position: relative;
				i{background: url('image/icon/icon-loginMenu.png') no-repeat;}
				ul{
					width: 100%;
					position: absolute;
					top: 0;
					right: 0;
					opacity: 0;
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
	
</style>