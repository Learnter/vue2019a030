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
		uploadType:"",  //上传视频的类型
		user_asset:{}, //用户的资产
		user_info:{}, //用户基本信息
		user_statistics:{} //用户的统计信息
	},
	mutations:{
		clearState(state){ //退出时清空vuex;
			state = {};
		},
		change_nav_list(state,data){ 
			state.footer_nav = data;
		},
		change_page(state,path){ //改变当前路径
			state.now_page_path = path;
		},
		change_uploadType(state,type){ //改变视频类型,区分为小视频、短视频
		   state.uploadType = type;
		},
		change_user_asset(state,obj){ //设置用户资产
			state.user_asset = obj;
		},
		set_user_info(state,obj){ //设置用户信息
			state.user_info = obj;
		},
		update_user_avatar(state,src){ // 更新用户头像
			state.user_info.avatar = src;
		},
		updata_user_other(state,obj){ //更新用户其他信息
			state.user_info.nickname = obj.nickname;
			state.user_info.sex = obj.sex;
			state.user_info.province = obj.province;
			state.user_info.city = obj.city;
			state.user_info.district = obj.district;
			state.user_info.signature = obj.signature;
		},
	    set_user_statistics(state,obj){ //设置用户统计信息
		    state.user_statistics = obj;
		},
		reduceIntegral(state,val){ //扣除积分
			state.user_statistics.integral -= val;
		},
		follow(state){ //关注
			state.user_statistics.follow_num += 1;
		},
		unfollow(state){ //取消关注
			state.user_statistics.follow_num -= 1;
		},
		withDraw(state,values){ //充值提现
			state.user_statistics.balance -= values;
		},
		increaseBalance(state,money){ //增加余额
			state.user_statistics.balance += money;
		},
		subtractStamp(state,num){ //扣除邮票
		   state.user_statistics.stamp -= num;
		},
		increaseStamp(state,num){ //增加邮票
			state.user_statistics.stamp += num;
		},
		updateVideo(state){ //上传视频
		   state.user_statistics.video_num += 1;
		}
	},
	getters:{
		integral(state){ //用户积分
			return state.user_asset['4'].money * 1 
		},
		userInfo(state){ //用户基本信息
		   return state.user_info;
		},
		statistics(state){ //统计信息
			return state.user_statistics;
		}
	},
	actions:{
		
	}
})

export default store
