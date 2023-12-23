<template>
    <div class="listContainer">
    <h2>用户列表</h2>
    <a-card>
        <a-row :gutter="20"><!--gutter属性：列间隔-->
            <a-col :span="6"> <a-input-search 
                v-model="queryParam.username" 
                placeholder="输入用户名"
                enter-button 
                allowClear 
                @search="getUserList"/>
            </a-col>
            <a-col :span="4"><a-button type="primary" v-show="userRole === 1" @click="addUserVisible=true">新增</a-button></a-col>
        </a-row>
        <a-table rowKey="ID" :columns="columns" :pagination="paginationOption" :dataSource="userlist"><!--这个userList是从data(){}中获取，也就是后端返回的响应-->
        <span slot="role" slot-scope="role">{{ role==1?'管理员':'订阅者'}}</span>
        <template slot="action" slot-scope="data"><!--slot-scope在插槽中传递数据,每一行都传入自己的id-->
            <div class="actionSlot">
            <a-button type="danger" v-show="userRole === 1" @click="deleteUser(data.ID)">删除</a-button>
        </div>
        </template>
        </a-table>
    </a-card>
   <!--新增用户区域----------------->
   <a-modal title="新增用户"
      closable
      destoryOnClose
      :visible="addUserVisible"
      :confirm-loading="confirmLoading"
      @ok="addUserOk"
      @cancel="addUserCancel"
      >


      <!--根据prop和v-model来双向绑定-->
    <a-form-model :model="userInfo" :rules="userRules" ref="addUserRef"><!--：model和：rules是双向绑定一个对象，输入框变化时也跟着变化-->
    <a-form-model-item label="用户名" prop="username"><a-input v-model="userInfo.username"></a-input></a-form-model-item><!--v-model绑定的是data(){中的数据项}-->
    <a-form-model-item label="密码" prop="password"><a-input-password v-model="userInfo.password"></a-input-password></a-form-model-item>
    <a-form-model-item label="确认密码" prop="checkpass"><a-input-password v-model="userInfo.checkpass"></a-input-password></a-form-model-item>
    <a-form-model-item label="是否为管理员" prop="rule">
        <a-select defaultValue="0" style="120px" @change="adminchange">
            <a-select-option key="1" value="1">是</a-select-option>
            <a-select-option key="0" value="0">否</a-select-option>
        </a-select>
    
    </a-form-model-item>
</a-form-model>

    </a-modal>


    </div>
</template>

<script>
const columns=[
  { 
    title: 'ID',
    dataIndex: 'ID',//每一列的标识要和数据库中的相同
    width: '10%',
    key:'ID'
  },{
    title: '用户名',
    dataIndex: 'username',
    width: '20%',
    key:'username'
  },{
    title: '角色',
    dataIndex: 'role',
    width: '20%',
    key:'role',
    scopedSlots:{customRender:'role'}
  },{
    title: '操作',
    width: '30%',
    key:'action',
    scopedSlots:{customRender:'action'}
  },
  
]
export default {
data(){
    return{
        paginationOption:{
            pageSizeOptions:['2','3','5','10','20'],
            defaultCurrent:1,
            defaultPageSize:0,
            total:0,
            showSizeChanger:true,
            showTotal:(total)=>`共${total}条`,
            onChange:(current, pageSize)=>{
                this.paginationOption.defaultCurrent=current
                this.paginationOption.defaultPageSize=pageSize
                this.getUserList()
            },
            onShowSizeChange:(current, size) =>{
                this.paginationOption.defaultCurrent=current
                this.paginationOption.defaultPageSize=size
                this.getUserList()
            },
        },
        userlist:[],
        columns,
        queryParam:{
            username:'',
            // pagesize:5,
            // pagenum:1,
        },
        userInfo:{
            id:0,
            username:'',
            password:'',
            checkpass:'',
            role:0,
        },
        visible: false,
        addUserVisible: false,
        confirmLoading: false, 
        userRules:{
            username:[
             {required:true,
                message:"请输入用户名",
                trigger:'blur'
             },
             {min:4,
                max:12,
                message:"用户名长度为4-12位之间",
                trigger:'blur'
             }
            ],
            password:[
            {required:true,
                message:"请输入密码",
                trigger:'blur'
             },
             {min:6,
                max:20,
                message:"用户名长度为6-20位之间",
                trigger:'blur'
             }
            ],
            checkpass:[
            { validator:
                    (rule,value,callback)=>{
                        if(this.userInfo.checkpass==""){
                            callback(new Error('请确认密码'))
                        }
                        if(this.userInfo.password!=this.userInfo.checkpass){
                            callback(new Error('两次输入请一致'))
                        }else{
                            callback()//callback表示验证成功
                        }
                    },
                    trigger:'blur'//trigger:'blur'意味着在离开输入框时触发 
                }    
            ]
 
        },
        userRole: null,
    }
},
created(){
    const userRole = sessionStorage.getItem('token');//获得用户的权限
    this.userRole = userRole ? parseInt(userRole, 10) : null;
    console.log('用户角色为'+this.userRole)
    this.getUserList()
},
methods:{
  async getUserList(){
       const { data: res }= await this.$http.get('users',{
        params: {
            pagesize:this.paginationOption.defaultPageSize,
            pagenum:this.paginationOption.defaultCurrent,
            username:this.queryParam.username,
            // pagesize:this.queryParam.pagesize,
            // pagenum:this.queryParam.pagenum,
        },
       })
       console.log(res)
       if(res.status!=200)return this.$message.error(res.message)
       
       this.userlist=res.data
       this.paginationOption.total=res.total
    },
    async deleteUser(id){
        const confirmed = window.confirm('确认要删除吗？');

        // 如果用户确认删除
        if (confirmed) {
            try {
                // 发送删除请求
                const res = await this.$http.delete(`user/${id}`);
                console.log(res);

                // 根据响应状态处理
                if (res.status !== 200) {
                this.$message.error(res.data.message);
                } else {
                // 删除成功，刷新用户列表
                this.getUserList();
                this.$message.success(res.data.message);
                }
            } catch (error) {
                // 处理异常
                console.error('Error deleting user:', error);
                this.$message.error('删除用户时出错');
            }
        }
    },
    addUserOk(){
    this.$refs.addUserRef.validate(async (valid)=>{
      
       if(!valid) return this.$message.error('参数不符合要求，请重新输入')
       const{data:res}=await this.$http.post('user/add',{username:this.userInfo.username,password:this.userInfo.password,role:this.userInfo.role})//!!!!请求传参
        
       if (res.status!=200) return this.$message.error(res.message)
       this.$message.success(res.message)

       this.addUserVisible=false
        this.getUserList()
    })
    },
    addUserCancel(){
        this.$refs.addUserRef.resetFields()
        this.addUserVisible=false;
    },
    adminchange(value){
        this.userInfo.role=value
        console.log(this.userInfo.role)
    }
},

}
</script>
<style>
</style>