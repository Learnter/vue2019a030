<template>
	<section>
		<div class="footer">
			<div :class="'footer_item ' + (item.size=='big'?'big_item':'')  " :style="'width:'+item_width" @click="change_nav(index,item)" v-for="(item,index) in footer_nav" :key="index">
				<img :src="index==now_index?item.select_icon:item.icon"/>
				<div :class="index==now_index?'actived':''">{{item.name}}</div>
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
		methods:{
			change_nav(index,item){
				this.$store.commit("change_page",index);

				this.$router.push(item.path);

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
			now_index(){
				return this.$store.state.footer_store.now_page_index;
			}
		}
	}
</script>

<style lang="scss" scoped>
  
  view{
    line-height:1;
  }
  
  .actived{
    font-weight:bold;
    font-size:15px;
    color:#FFF700;
  }
  
  
.footer{
	position: fixed;
	bottom: 0;
	left: 0;
    box-sizing:border-box;
	width: 100%;
    height: 60px;
    padding:3 0;
	background:linear-gradient(to right,#B40CFF,#793DFF);
	color: #fff;	
    z-index:9999;
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
