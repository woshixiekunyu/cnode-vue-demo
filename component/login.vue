<template>
	<div>
		<div class="loginPage">
			<header>
				<h3>登录页面</h3>
			</header>
			<main>
				<div>
					<input type="text" v-model="userKey"/>
					<button id="btnLogin" @click="btnLogin()">登录</button>
					<button id="exitbtn" @click="exitbtn()">取消</button>
				</div>
			
			</main>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				userKey:'',
				isLoginPage:false,
			}
		},
		methods:{
			exitbtn(){
				window.history.back();
			},
			
			btnLogin(){
				var self = this;
				if(self.userKey == '28a0473d-7bed-48a1-a6a6-840afd389ddf'){
					$.ajax({
						url:'https://cnodejs.org/api/v1/accesstoken',
						type:'POST',
						data:{
							accesstoken : self.userKey
						},
						success(data){
							console.log(data)
							var now = new Date();
							now.setDate(now.getDate()+7);
							document.cookie = 'username='+data.loginname+';expires='+now;
							document.cookie = 'userid='+data.id+';expires='+now;
							document.cookie = 'userImg='+data.avatar_url+';expires='+now;
							self.userKey = ''
							window.location.href = "#/xmain/ask_list"
						}
					})
				}else{
					console.log('错误')
				}
				
			}
		},
		mounted(){
			$('input').focus()
		}
	}
</script>

<style scoped lang="scss">
	.loginPage{
		width: 100%;
		height: 100%;
		background-color: deepskyblue;
		position: fixed;
		top: 0;
		left: 0;
		header{
			height: 50px;
			width: 100%;
			
			border-bottom: 1px solid #ccc;
			background-color: #8A2BE2;
			position: fixed;
			top: 0;
			left: 0;
			h3{
				width: 100%;
				text-align: center;
				color:#fff;
				line-height: 50px;
			}
		}
		main{
			width: 100%;
			height: 100%;
			background-color: deepskyblue;
			padding-top: 1.5rem;
			&>div{
				width: 2rem;
				height: 100%;
				margin: 0 auto;
				input{
					width: 100%;
					height: 100%;
					height: 0.3rem;
					border-radius: 0.1rem;
					outline: none;
				}
				button{
					margin-top: 0.1rem;
					width: 0.6rem;
					height: 0.3rem;
					margin-left: 0.3rem;
				}
			}
		}
	}

</style>