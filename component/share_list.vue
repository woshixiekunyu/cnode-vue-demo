<template>
	<div>
		<nav>
			<input type="text" placeholder="输入相关信息搜索" v-model="sameVal" />
			<button @click="searchSameVal()">搜索</button>
		</nav>
		<main>

			<ul>
				<li v-for="list in lists" @click="goDetail(list.id)">
					<h3><i></i>{{list.title}}</h3>
					<p>{{list.content}}</p>
					<!--<span>作者：{{list.author.loginname}}</span>-->
					<span v-times class="time">time:{{list.create_at}}</span>

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
				sameVal: '',
				
			}
		},
		methods: {
//			
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
						limit:20
					},
					success(data) {
						self.page++
						console.log(data)
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
				window.location.href = "#/share_Detail/" + id
			},
			searchSameVal(){
				var $len = $('main>ul>li').length;
				for(var i=0;i<$length;i++){
//					if()
				}
			}
		},
		mounted() {
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
//		filters: {
//			filterBys:function(arr, search, delimiter) {
//				arr = convertArray(arr);
//				if(search == null) {
//					return arr;
//				}
//				if(typeof search === 'function') {
//					return arr.filter(search);
//				}
//				// cast to lowercase string
//				search = ('' + search).toLowerCase();
//				// allow optional `in` delimiter
//				// because why not
//				var n = delimiter === 'in' ? 3 : 2;
//				// extract and flatten keys
//				var keys = Array.prototype.concat.apply([], toArray(arguments, n));
//				var res = [];
//				var item, key, val, j;
//				for(var i = 0, l = arr.length; i < l; i++) {
//					item = arr[i];
//					val = item && item.$value || item;
//					j = keys.length;
//					if(j) {
//						while(j--) {
//							key = keys[j];
//							if(key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
//								res.push(item);
//								break;
//							}
//						}
//					} else if(contains(item, search)) {
//						res.push(item);
//					}
//				}
//				return res;
//			}
//		}
	}
</script>

<style scoped lang="scss">
	nav {
		display: flex;
		margin-top: 40px;
		height: 0.3rem;
		input {
			flex: 8;
			outline: none;
		}
		button {
			flex: 2;
		}
	}
	
	main {
		width: 100%;
		ul {
			li {
				max-height: 1rem;
				padding: 0 10px;
				border-bottom: 1px solid #ccc;
				overflow: hidden;
				h3 {
					font-size: 0.16rem;
					line-height: 0.3rem;
					text-indent: 0.25rem;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-weight: bolder;
					position: relative;
					&>i {
						position: absolute;
						left: 0;
						top: 0;
						width: 24px;
						height: 24px;
						display: inline-block;
						background: url('image/icon/problem.png') no-repeat;
					}
				}
				p {
					color: #ccc;
					max-height: 0.4rem;
					text-indent: 0.3rem;
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
</style>