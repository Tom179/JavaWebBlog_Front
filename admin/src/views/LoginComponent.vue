<!-- 视图页面需要在router里配置 -->
<template> 
    <div class="container">
        <div class="loginBox">
            <a-form-model ref="loginFormRef" :rules="rules" :model="formdata" class="loginForm"><!--":model为数据传输的接口"-->
                <a-form-model-item prop="username">
                    <a-input v-model="formdata.username" placeholder="请输入用户名"><a-icon slot="prefix" type="user"/></a-input>
                </a-form-model-item>
                <a-form-model-item prop="password"><!--prop输入，从data(){}中获取-->
                    <a-input type="password" v-model="formdata.password" placeholder="请输入密码"><a-icon slot="prefix" type="lock" />
                    </a-input></a-form-model-item>
                <a-form-model-item class="loginBtn">
                    <a-button type="primary" style="margin:10px" @click="login" >登录</a-button>
                    <a-button type="default" style="margin:10px" @click="resetForm">取消</a-button>
                </a-form-model-item>      
     
            </a-form-model>
            还没有账号？请点击
            <a-button  type="link" @click="regist">注册</a-button>             
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            formdata:{
                username:'',
                password:''
            },
            rules:{
                username:[
                {required:true,message:'用户名不能为空',trigger: 'blur'},//格式规范
                {min:4,max:12,message:'用户名必须在4-12位之间',trigger:'blur'},
                ],
                password:[
                {required:true,message:'请输入密码',trigger: 'blur'},//格式规范
                {min:6,max:12,message:'密码必须在6-20位之间',trigger:'blur'},
                ],

            }
        }
    },
    methods:{
        resetForm(){
            this.$refs.loginFormRef.resetForm//通过对dom对象的引用重置输入框
        },
        login(){
            this.$refs.loginFormRef.validate(async valid=>{//async:
                if(!valid) return this.$message.error("输入非法，请重新输入")
              const {data:res}= await this.$http.post('login',this.formdata)//将data赋值给res、await：等待异步操作完成
              console.log(res)
              if(res.status !== 200) return this.$message.error(res.message)//res：获取到的后端数据
              window.sessionStorage.setItem('token',res.token)//存储到session
              window.sessionStorage.setItem('UserID',res.id)
              this.$router.push('admin/artlist')
            }) 
        },
        regist(){
        this.$router.push('/regist')
        }   
    }
}
</script>

<!-- scoped表示只对本页面有效，不会污染全局页面 -->
<style scoped>
.container{
 height:100%;
 background-color: rgb(19, 19, 16);
 
}
.loginBox{
    width: 450px;
    height: 300px;
    /* background-color: #fff; */
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 9px;
    background-color: rgba(255, 255, 255, 0.9); /**调整透明度为0.9 */

}
.loginForm{
    width: 100%;
    position: absolute;
    bottom: 10%;
    padding:0 20px;
    box-sizing: border-box;
}
.loginBtn{
    display: flex;
    justify-content: flex-end;
}
</style>