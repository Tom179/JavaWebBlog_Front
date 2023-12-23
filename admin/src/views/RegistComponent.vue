<!-- 注册 -->
<template> 
    <div class="container">
        <div class="registBox">
            注册
            <a-form-model ref="registFormRef" :rules="rules" :model="formdata" class="registForm"><!--":model为数据传输的接口"-->
                <a-form-model-item prop="username">
                    <a-input v-model="formdata.username" placeholder="请输入用户名"><a-icon slot="prefix" type="user"/></a-input>
                </a-form-model-item>
                <a-form-model-item prop="password"><!--prop输入，从data(){}中获取-->
                    <a-input-password v-model="formdata.password" placeholder="请输入密码"><a-icon slot="prefix" type="lock" />
                    </a-input-password></a-form-model-item>
                <a-form-model-item prop="checkpass">
                    <a-input-password v-model="formdata.checkpass" placeholder="确认密码"></a-input-password>
                </a-form-model-item>
                <a-form-model-item class="registBtn">
                <a-button type="primary" style="margin:10px" @click="regist" >注册</a-button>
                <a-button type="default" style="margin:10px" @click="resetForm">取消</a-button>
                </a-form-model-item>         
            </a-form-model>
            已有账号？请点击<a-button  type="link" @click="jumpToLogin">登录</a-button>   
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            formdata:{
                username:'',
                password:'',
                checkpass:'',
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
                checkpass:[
                    { validator:
                        (rule,value,callback)=>{
                            if(this.formdata.checkpass==""){
                                callback(new Error('请确认密码'))
                            }
                            if(this.formdata.password!=this.formdata.checkpass){
                                callback(new Error('两次输入请一致'))
                            }else{
                                callback()//callback表示验证成功
                            }
                        },
                        trigger:'blur'//trigger:'blur'意味着在离开输入框时触发 
                    }    
                 ]

            }
        }
    },
    methods:{
        resetForm(){
            this.$refs.registFormRef.resetForm
        },
        regist(){
            this.$refs.registFormRef.validate(async valid=>{
                if(!valid) return this.$message.error("输入非法，请重新输入")
              const {data:res}= await this.$http.post('regist',this.formdata)
              console.log(res)
              if(res.status !== 200) return this.$message.error(res.message)
              this.$message.success(res.message)
              this.$router.push('/login')
            })
        },
        jumpToLogin(){
            this.$router.push('/login')
        }           
    }
}
</script>

<!-- scoped表示只对本页面有效，不会污染全局页面 -->
<style scoped>
.container{
 height:100%;
 /* background-color: rgb(19, 19, 16); */
    background-image: url('../assets/1102604.jpg');
    background-size: cover; 
    background-position: center; 

}
.registBox{
    width: 450px;
    height: 400px;
    /* background-color: #fff; */
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 9px;
    background-color: rgba(255, 255, 255, 0.9); /**调整透明度为0.9 */

}
.registForm{
    width: 100%;
    position: absolute;
    bottom: 10%;
    padding:0 20px;
    box-sizing: border-box;
}
.registBtn{
    display: flex;
    justify-content: flex-end;
}
</style>