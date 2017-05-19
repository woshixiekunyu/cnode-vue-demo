<template>
	<div>
		<main>
			<ul>
				<li v-for="list in lists" @click="goDetail(list.id)">
					<h3><i></i>{{list.title}}</h3>
					<p>{{list.content}}</p>
					<span>作者：{{list.author.loginname}}</span>
					<span v-times class="time">时间：{{list.create_at}}</span>

				</li>
			</ul>
			<router-view></router-view>
			<div class="more" @click="lookMore()">查看更多</div>
		</main>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				page:1,
				lists:'',
			}
		},
		methods:{
			Ajax(){
				var self = this;
				console.log(this.page)
				
				$.ajax({
					url:'https://cnodejs.org/api/v1/topics',
					type:'GET',
	//				dataType:'json',
					data:{
						page:1,
						tab:'ask',
//						mdrender:false,

					},
					success(data){
						console.log(data)
						self.lists = data.data
					}
				});
			},
			lookMore(){
				this.page++
				this.Ajax()
			},
			goDetail(id){
				window.location.href="#/ask_Detail/"+id
			}
		},
		mounted(){
			this.Ajax();
			console.log(window.location)
		},
		directives:{
			Li:function(el){
				console.log(el)
			},
			times:function(el){
				el.innerHTML = el.innerText.substr(0,13)
//				el.
			}
		}
	}
</script>

<style scoped lang="scss">
	main{
		width: 100%;
		margin-top: 40px;
		ul{

			li{
				max-height: 1rem;
				padding: 0 10px;
				border-bottom: 1px solid #ccc;
				
				overflow:hidden;
				
				h3{
					font-size: 0.16rem;
					line-height: 0.3rem;
					text-indent: 0.25rem;
					white-space: nowrap;
					text-overflow:ellipsis;
					overflow:hidden;
					font-weight: bolder;
					position: relative;
					&>i{
						position: absolute;
						left: 0;
						top: 0;
						width: 24px;
						height: 24px;
						display: inline-block;
						background: url('image/icon/problem.png') no-repeat;
					}
				}
				
				p{
					color:#ccc;
					max-height: 0.4rem;
					text-indent: 0.3rem;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;

				}
				span{
					display:  inline-block;
					line-height: 0.18rem;
					float: right;
					margin-right: 10px;
				}
				
				&:active{
					background-color: #eee;
				}
			}
		}

	}
</style>