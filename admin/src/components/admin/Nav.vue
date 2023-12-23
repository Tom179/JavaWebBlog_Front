<template>
   <a-layout-sider breakpoint="lg"><div class="log" >{{ username }},你好</div>
    <a-menu theme="dark" mode="inline" @click="gotoPage"><!--主题改为dark可与背景融合-->
        <a-menu-item key="index" ><a-icon type="menu-fold"/>控制台</a-menu-item>
        <a-sub-menu title="文章">
            <a-menu-item key="addart"><a-icon type="edit" /><span>写文章</span></a-menu-item>
            <a-menu-item key="artlist"><a-icon type="container" /><span>文章列表</span></a-menu-item>
        </a-sub-menu>
        <a-menu-item key="userList"><a-icon type="usergroup-delete" />用户列表</a-menu-item>
        <a-menu-item key="PersonalCenter"><a-icon type="user" />个人中心</a-menu-item>
    </a-menu>

</a-layout-sider>
</template>


<script>
export default {
    data(){
        return{
            username:null,
        }
    },
    created(){
        const UserID = sessionStorage.getItem('UserID');
        this.getUserName(UserID)
        // console.log("当前用户ID为"+UserID)
    },
    methods:{
    async getUserName(id){
        const {data:res} = await this.$http.get(`user/${id}`)
        this.username=res.data.username//注意这个data！！！！，接收的是什么？
        // console.log('为'+res.data.username)
    },    
    gotoPage(item){
        this.$router.push('/admin/'+item.key).catch((err)=>err)//catch((err)=>err)消除访问同一个路由的报错
    }
    
    }
}
</script>

<style scoped> 
.log{
   height: 32px;
   margin: 14px;
   background-color: antiquewhite;
display: flex;
justify-content: center;
align-items: center;/*让里面的文字居中*/
font-size: 17;
}

</style>