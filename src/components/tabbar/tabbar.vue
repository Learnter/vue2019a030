<template>
	<section>
		<div class="footer">
			<div class="footer_item" @click="change_nav(item)" v-for="(item,index) in footer_nav" :key="index">
				<div :class="item.size=='big'?'footer_big_icon':'footer_icon'">
					<img :src="item.path == now_path ? item.select_icon : item.icon"/>
				</div>
				
				<div :class="item.path == now_path ? 'navActived':''">{{item.name}}</div>
			</div>
			<div :class="isShowMask?'maskLayer':'hiddenMask'" @click="isShowMask = false">
				<div class="publish">
					<div @click="uploadVideo('uploadSmallVideo')"> 
						<img src="@/assets/tabImg/2019_a030_53.png" alt="">
						<p>小视频</p>
					</div>
					<div  @click="uploadVideo('uploadShortVideo')">
						<img src="@/assets/tabImg/2019_a030_52.png" alt="">
						<p>短视频</p>
					</div>
					<div>
						<img src="@/assets/tabImg/2019_a030_51.png" alt="">
						<p>直播</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>

	export default {
		data() {
			return {
				isShowMask:false //是否显示遮罩层
			};
		},
		mounted(){
			this.refresh();//F5页面刷新
		},
		methods:{
			change_nav(item){ // 底部导航切换

				if(item.size == 'big'){
					this.isShowMask = true;
					this.$store.commit("change_page",item.path);
					return false;
				}

				this.$store.commit("change_page",item.path);

				this.$router.push(item.path);

			},
			refresh(){ //页面刷新存储当前路由地址
				let now_path =  location.hash.slice(1); 
				this.$store.commit('change_page',now_path);
			},
			uploadVideo(type){ //上传视频
			   this.$store.commit("change_uploadType",type); //type为视频类型,用于区分是小视频、短视频
			   this.$router.push("/release");
			}
		},
		computed:{
			footer_nav(){
				return this.$store.state.footer_nav;
			},
			now_path(){
				return this.$store.state.now_page_path;
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

.hiddenMask{
	display:none;
}

/*遮罩层*/
.maskLayer{
	position:absolute;
	left:0;
	bottom:0;
	width:100vw;
	height:100vh;
	background:rgba(0,0,0,0.3);
	.publish{
		position: absolute;
		left:0;
		bottom:0;
		width:100%;
		box-sizing:border-box;
		padding:10px;
		border-radius:10px 10px 0 0;
	    background:rgba(0,0,0,0.8);
		display:flex;
		justify-content:space-around;
		letter-spacing:3px;
		font-size:14px;
		img{
			width:50px;
			height:50px;
			margin-bottom:10px;
		}

	}

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
