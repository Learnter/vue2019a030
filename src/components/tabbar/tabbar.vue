<template>
	<section>
		<div class="footer">
			<div class="footer_item" @click="change_nav(item)" v-for="(item,index) in footer_nav" :key="index">
				<div :class="item.size=='big'?'footer_big_icon':'footer_icon'">
					<img :src="item.path == now_path ? item.select_icon : item.icon"/>
				</div>
				
				<div :class="item.path == now_path ? 'navActived':''">{{item.name}}</div>
			</div>
		</div>
	</section>
</template>

<script>

	export default {
		data() {
			return {
				
			};
		},
		mounted(){
			this.refresh();//F5页面刷新
		},
		methods:{
			change_nav(item){ // 底部导航切换

				this.$store.commit("change_page",item.path);

				this.$router.push(item.path);

			},
			refresh(){ //页面刷新存储当前路由地址
				let now_path =  location.hash.slice(1); 
				 this.$store.commit('change_page',now_path);
			}
		},
		computed:{
			footer_nav(){
				return this.$store.state.footer_store.footer_nav;
			},
			now_path(){
				return this.$store.state.footer_store.now_page_path;
			}
		}
	}
</script>

<style lang="scss">
  
  .navActived{
    font-weight:bold;
    font-size:15px;
    color:#FFF700;
  }
  
  
.footer{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
    height: 60px;
	box-sizing:border-box;
	z-index:10;
	background:linear-gradient(to right,#B40CFF,#793DFF);
	color: #fff;	
	display:flex;
	justify-content:space-between;
	align-items:center;
}

.footer_item{
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	width:20%;
	height:100%;
	box-sizing:border-box;
	text-align: center;
	font-size: 14px;
}

.footer_icon{
	width:30px;
	height:30px;
}

.footer_big_icon{
	position: relative;
	top:-20px;
	width:30px;
	height:30px;
	img{
	   position: absolute;
	   width: 50px;
	   height: 50px;
	   left:-10px; 
	}
}
</style>
