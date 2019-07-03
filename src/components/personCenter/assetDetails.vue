<template>
    <section class="assetDetail">
        <return-nav style="background:#5077F8">
            <template  v-slot:middle>
                钱包明细
            </template>
        </return-nav>
        <div class="asset_main">
            <div class="search_short">
                <div>
                    <span>分类</span>
                    <img style="width:10px;height:5px" src="../../assets/tabImg/zpzp_69.png" alt="排序">
                </div>
                <div>
                    <span>日期</span>
                    <img style="width:10px;height:5px" src="../../assets/tabImg/zpzp_69.png" alt="排序">
                </div>
                <div>
                    <span>排序</span>
                    <img style="width:10px;height:5px" src="../../assets/tabImg/zpzp_69.png" alt="排序">
                </div>
            </div>

             <div class="asset_list">
                 <ul>
                     <li class="asset_details_li" v-for="(item,index) in 10" :key="index">
                        <div class="asset_details_icon">
                            <img src="../../assets/tabImg/2019_a030_1.png" alt="">
                        </div>
                        <div class="asset_details_right">
                            <div>
                                <span>静态受益</span>
                                <span>+900.00</span>
                            </div>
                            <p>昨天&nbsp;10:11</p>
                        </div>
                     </li>
                 </ul>
             </div>
        </div>
    </section>    
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
    name:"assetDetail",
    data(){
        return{

        }
    },
    components:{
        returnNav
    }
}
</script>
<style lang="scss">
    .assetDetail{
        position:fixed;
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index:999;
        background:#F2F2F2;
        overflow: scroll;
    }
    .asset_main{
        padding-top:54px;
        .search_short{
            width:100%;
            height:45px;
            display:flex;
            justify-content:space-around;
            align-items:center;
            background:#FFFFFF;
            div{
                 display:flex;
                 justify-content:space-around;
                 align-items:center;
                 img{
                     margin-left:5px;
                 }
            }
        }
        .asset_list{
            padding:10px 10px 0;
            ul{
                display:flex;
                flex-direction:column;
                .asset_details_li{
                    background:#FFFFFF;
                    padding:10px;
                    margin-bottom:8px;
                    border-radius:5px;
                    display:flex;
                    align-content:center;
                    .asset_details_icon{
                        width:50px;
                        height:50px;
                    }
                    .asset_details_right{
                        flex:1;
                        text-align:left;
                        padding:5px 10px;
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        div{
                           display:flex;
                           justify-content:space-between;
                        }
                    }
                }
            } 
        }
    }

</style>
