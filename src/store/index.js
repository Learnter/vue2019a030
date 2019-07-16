import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		footer_nav:[
			{
				name:'小视频',
				name_code:'smallVideo',
				icon:require('@/assets/tabImg/2019_a030_7.png'),
				select_icon:require('@/assets/tabImg/2019_a030_8.png'),
				size:'small',
				path:"/smallVideo"
			},
			{
				name:'短视频',
				name_code:'shortVideoTwo',
				icon:require('@/assets/tabImg/2019_a030_9.png'),
				select_icon:require('@/assets/tabImg/2019_a030_10.png'),
				size:'small',
				path:"/shortVideoTwo"
			},
		{
			name:'发布',
			name_code:'release',
			icon:require('@/assets/tabImg/2019_a030_15.png'),
			select_icon:require('@/assets/tabImg/2019_a030_16.png'),
			size:'big',
			path:"/release"
		},
    {
    	name:'直播',
    	name_code:'live',
    	icon:require('@/assets/tabImg/2019_a030_11.png'),
    	select_icon:require('@/assets/tabImg/2019_a030_12.png'),
		size:'small',
		path:"/live"
    },
    {
    	name:'我的',
    	name_code:'me',
    	icon:require('@/assets/tabImg/2019_a030_13.png'),
    	select_icon:require('@/assets/tabImg/2019_a030_14.png'),
		size:'small',
		path:"/me"
    }	
		],
		now_page_path:"/smallVideo",
		uploadType:"", //上传视频的类型
		user_asset:{} //用户的资产
	},
	mutations:{
		change_nav_list(state,data){ 
			state.footer_nav = data;
		},
		change_page(state,path){ //改变当前路径
			state.now_page_path = path;
		},
		change_uploadType(state,type){ //改变视频类型,区分为小视频、短视频
		   state.uploadType = type;
		},
		change_user_asset(state,obj){ //改变用户资产
			state.user_asset = obj;
		}
	},
	actions:{
		
	}
})

export default store
