<template>
    <section class="editInfo">
        <van-nav-bar title="编辑资料" left-arrow right-text="保存"  @click-left="$router.go(-1)" @click-right="saveBtn"></van-nav-bar>
        <div class="editHead">
             <van-uploader  :after-read="afterRead">
                  <van-image class="editImg" round  :src="user.avatar"/>
             </van-uploader>
            <p>点击更换头像</p>
        </div>
        <div class="editCenter">
            <van-cell-group>
                <van-field v-model="user.nickname"  label="昵称" placeholder="请输入您的昵称"/> 
                <van-field label="性别" :value="userSex" placeholder="请选择您的性别" disabled>
                    <van-radio-group v-model="user.sex" slot="right-icon">
                        <van-radio name="1" checked-color="#07c160">男</van-radio>
                        <van-radio name="2" checked-color="#07c160">女</van-radio>
                    </van-radio-group>
                </van-field>
                <!-- <van-field  label="所在地"  placeholder="请输入您所在地址"/> -->
                <van-field readonly clickable label="所在地" :value="userAddress" placeholder="选择城市" @click="showPicker = true"/>

                <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar :columns="columns" @cancel="showPicker = false"  @confirm="onConfirm"  @change="onChange"/>
                </van-popup>

                <van-field v-model="user.signature"  label="签名" placeholder="这家伙很懒、什么都没有留下"/>
            </van-cell-group> 
        </div>
    </section>
</template>
<script>
export default {
    name:"editInfo",
    data(){
        return{
            showPicker:false,
            columns:[
                { values:[],className:'column1'},
                { values:[],className:'column2'},
                { values:[],className:'column3'}
            ],
            addressList:{},//联动地址
            user:{}
        }
    },
    created(){
        this.fetchUserInfo();
        this.fetchAddress();
    },
    computed:{
       userSex(){ //用户性别
           let sex ;
           if(this.user.sex == "1"){
               sex = "男"
           }else if(this.user.sex == "2"){
               sex = "女"
           }else if(this.user.sex == "3"){
               sex = "保密"
           }
           return sex ;
       },
       userAddress(){ //用户所在地址
        let province = this.user.province;
        let city = this.user.city;
        let district = this.user.district;
        if(province && province.length > 0 && city && city.length > 0 &&  district &&  district.length > 0){
            return province+"-"+ city +"-"+ district;
        }else if(province && province.length > 0 && city && city.length > 0 && district && district == 0){
             return province +"-"+ city;
        }else if(province && province.length > 0 && city && city.length == 0){
            return province;
        }else{
            return ''; 
          }
        }
    },
    methods:{
       fetchAddress(){ //获取联动地址

           let url = "config/getRegion";

           this.$https.get(url).then( res => {

               if(res.data.code === 200 && Object.keys(res.data.data).length != 0){
                   this.addressList = res.data.data;
                   //console.log(this.addressList);
                   this.columns[0].values = Object.keys(res.data.data); //初始化省
                   this.columns[1].values = Object.keys(res.data.data["北京市"]); //初始化市
                   this.columns[2].values = res.data.data["北京市"]["市辖区"]; //初始化区、县
               }
           })
       },
       fetchUserInfo(){ //用户基本信息
           let url = "user/getUserInfo";
           this.$https.get(url).then( res => {
                //  console.log(res);
                 if(res.data.code === 200 && Object.keys(res.data.data).length != 0){
                     this.user = res.data.data;
                 }
           })
        },
        afterRead(file){ //上传头像

             let fileFormData = new FormData();
             fileFormData.append('head_img',file.file);

             let url = "user/modifyAvatar";
             this.$https.post(url,fileFormData,'multipart/form-data').then(res => {
                  if(res.data.code === 200 && res.data.data && res.data.data.src.length > 0){
                      this.user.avatar = res.data.data.src
                       this.$notify({
                        message:'头像修改成功',
                        duration: 2000,
                        className:"notifyClass",
                        background:"#07C160"
                     });
                  }
             })

        },
         onConfirm(value) { //地址栏确定
            //  console.log(value);
             this.user.province= value[0],
             this.user.city = value[1],
             this.user.district = value[2];
             this.showPicker = false; 
        },
        onChange(picker,values) { //地址栏变动
           //  console.log(values);
           let citys; //市列表
           let districts; //区、县列表

          citys =  Object.keys(this.addressList[values[0]]); 

           if(citys.length > 0){

               picker.setColumnValues(1,citys);

                if(citys.indexOf(values[1]) !== -1){ //判断市列表是否存在
                     districts = this.addressList[values[0]][values[1]];
               }else{
                    let initCity = Object.keys(this.addressList[values[0]])[0];
                    districts = this.addressList[values[0]][initCity];
               }

                if( !districts || districts.length == 0){ //判断区、县列表是否存在
                   picker.setColumnValues(2,[]);
                }else{
                  picker.setColumnValues(2,districts);
                }
               
           }else{
               picker.setColumnValues(1,[]);
               picker.setColumnValues(2,[])
           } 
        },
        saveBtn(){ //更改用户信息
            let url = "user/modifyUserInfo";
            let data = {
                nickname:this.user.nickname,
                sex:this.user.sex,
                province:this.user.province,
                city:this.user.city,
                district:this.user.district,
                signature:this.user.signature
            }
            this.$https.post(url,data).then(res => {
                if(res.data.code === 200){
                 this.$notify({
                    message:'修改成功',
                    duration: 2000,
                    className:"notifyClass",
                    background:"#07C160"
                    });
                }else{
                  this.$notify({
                        message:res.data.msg,
                        duration: 3000,
                        className:"notifyClass"
                    });
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .editInfo{
        position:fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color:#ffffff;
        /deep/ .van-nav-bar {
            height: 54px;
            line-height: 54px;
            .van-nav-bar__title {
                font-size: 18px;
                color:#000000;
            }
            .van-icon {
                font-size: 24px;
                color:#000000;
            }
            .van-nav-bar__text{
                color:red;
                letter-spacing:2px;
            }
        }
     .editHead{
         font-size:12px;
         color:#D2D2D2;
         .editImg{
             width:80px;
             height:80px;
             border-radius:50%;
             overflow:hidden;
             margin-bottom:8px;
         }
     }
     .editCenter{
         padding:0 10px;
       /deep/  .van-cell-group {
            background: transparent;
            .van-cell {
                padding: 15px 10px;
                color: black;
                border-radius: 5px;
                border-bottom:1px solid rgba(0,0,0,0.1);
                .van-radio-group{
                    display:flex;
                    align-items:center;
                }
                .van-field__control{
                    color:black;
                    &::-webkit-input-placeholder{
                        // color:#ae8ee8;
                        color:#D2D2D2;
                    }
                }
                .van-cell__title{
                    color:#D2D2D2;
                    font-size:18px;
                }
            }
         }
     }
   }
</style>
