<template>
	<section>
		<div class="footer">
			<div :class="'footer_item ' + (item.size=='big'?'big_item':'')  " :style="'width:'+item_width" @click="change_nav(item)" v-for="(item,index) in footer_nav" :key="index">
				<img :src="item.path==now_path?item.select_icon:item.icon"/>
				<div :class="item.path==now_path?'navActived':''">{{item.name}}</div>
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
			item_width(){
				let length = this.$store.state.footer_store.footer_nav.length;
				switch (length){
					case 1:
						return '100%'
						break;
					case 2:
						return '50%'
						break;
					case 3:
						return '33.3%'
						break;
					case 4:
						return '25%'
						break;
					case 5:
						return '20%'
						break;
					default:
						break;
				}
			},
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
}
.footer_item{
	float: left;
	width: 33.3%;
    height:100%;
	text-align: center;
	font-size: 14px;
}
.footer_item img{
	width: 30px;
	height: 30px;
}
.footer_item.big_item{
	position: relative;
	top: -20px;
}
.footer_item.big_item img{
	width: 50px;
	height: 50px;
}
</style>
