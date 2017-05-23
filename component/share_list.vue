<template>
	<div>
		<main>
			<ul>
				<li v-for="list in lists" @click="goDetail(list.id)">
					<div class="userImg">
						<img :src="!getIsImg?list.author.avatar_url:''" v-show="!getIsImg" alt="" />
					</div>
					<div class="list_content">
						<h3><i></i>{{list.title}}</h3>
						<p>{{list.content}}</p>
						<span>{{list.reply_count}}/{{list.visit_count}}</span>
						<span v-times class="time">time:{{list.create_at}}</span>
					</div>
					
				</li>
			</ul>
		</main>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				lists: [],
				src:'',

			}
		},
		computed:{
			getIsImg:function(){
				return this.$store.state.isImg
			},

		},
		methods: {
			
			lookMore() {
				var self = this;
//				console.log(this.page)

				$.ajax({
					url: 'https://cnodejs.org/api/v1/topics',
					type: 'GET',
					//				dataType:'json',
					data: {
						page: self.page,
						tab: 'share',
						mdrender:false,
						limit:30
					},
					success(data) {
						self.page++
//						console.log(data)
						self.lists =self.lists.concat(data.data)
						
						window.onscroll = function(e){
							var scrollTop = window.scrollY;
							if(scrollTop > document.body.scrollHeight-600){
								window.onscroll = null
								self.lookMore()
							}
						}
					}
				});
			},
			goDetail(id) {
				window.location.href = "#/share_Detail/" + id;
			},
			
		},
		mounted() {
//			console.log(this.getIsImg)
			var self = this;
			this.lookMore();
			
//			console.log(window.location)
			window.onscroll = function(e){
				var scrollTop = window.scrollY;
//				console.log(document.body.scrollHeight,scrollTop)
				if(scrollTop > document.body.scrollHeight-600){
					window.onscroll = null
					self.lookMore()
				}
			}
			
			
		},
		directives: {
			Li: function(el) {
//				console.log(el)
			},
			times: function(el) {
				el.innerHTML = el.innerText.substr(0, 15)
				//				el.
			}
		},
	}
</script>

<style scoped lang="scss">
	
	
	main {
		margin-top: 40px;
		width: 100%;
		ul {
			padding: 0.05rem;
			li {
				max-height: 1rem;
				padding: 0 10px;
				border: 1px solid #ccc;
				overflow: hidden;
				box-shadow:  0 3px 0 #eee;
				margin-top: 0.1rem;
				border-radius: 0.1rem;
				display: flex;
				.userImg{
					width: 15%;
					margin-top: 0.05rem;
					img{
						width: 0.4rem;
						height: 0.4rem;
						border-radius: 50%;
					}
				}
				.list_content{
					width: 85%;
					h3 {
						font-size: 0.16rem;
						line-height: 0.3rem;
						text-indent: 0.05rem;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-weight: bolder;
						position: relative;
					}
					p {
						color: #ccc;
						max-height: 0.4rem;
						text-indent: 0.2rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					span {
						display: inline-block;
						line-height: 0.18rem;
						float: right;
						margin-right: 10px;
					}
				}
				
				
			}
		}
	}
</style>