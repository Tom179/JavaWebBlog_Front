<template>
    <div>
    <h2>文章</h2>
    <a-card class="listContainer">
        <a-row :gutter="20"><!--gutter属性：列间隔-->
            <a-col :span="6"> 
                <a-input-search v-model="queryParam.title" placeholder="输入文章名查找" enter-button allowClear @search="getArtList"/>
            </a-col>
        </a-row>

        <a-table rowKey="ID" :columns="columns" :pagination="paginationOption" :dataSource="Artlist" ><!--这个ArtList是从data(){}中获取，也就是后端返回的响应-->
            <span class="ArtImg" slot="img" slot-scope="img">
                    <img :src="img" />
                    </span>
                    
                    
                    <template slot="action" slot-scope="data"><!--slot-scope在插槽中传递数据,每一行如何找到自己的id的？这个template为什么被绑定到一列上？-->
                        <div class="actionSlot">
                        <a-button type="default"  @click="showArticle(data.ID)">查看</a-button>
                        <a-button type="danger" @click="deleteArt(data.ID)" v-show="userRole === 1">删除</a-button>
                        </div>
                    </template>
                    
        </a-table>
    </a-card>
 
    </div>
</template>

<script>
const columns=[
  { 
    title: 'ID',
    dataIndex: 'ID',//每一列的标识要和数据库中的相同
    width: '8%',
    key:'ID'
  },{
    title: '标题',
    dataIndex: 'title',
    width: '20%',
    key:'title',
    style: 'width: 40px; height: 40px; object-fit: cover;font-size:10000000px;'
  },
  {
    title: '文章描述',
    dataIndex: 'description',
    width: '20%',
    key:'description',
  },
  {
    title: '封面',
    dataIndex: 'img',
    width: '20%',
    key:'img',
    scopedSlots:{customRender:'img'}
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
                    this.getArtList()
                },
                onShowSizeChange:(current, size) =>{
                    this.paginationOption.defaultCurrent=current
                    this.paginationOption.defaultPageSize=size
                    this.getArtList()
                },
            },
            Artlist:[],
            columns,
            queryParam:{
                title:'',
                // pagesize:5,
                // pagenum:1,
            },
            visible: false,
            addArtVisible: false,
            confirmLoading: false, 
            userRole: null,

        }
    },
created(){
    const userRole = sessionStorage.getItem('token');//获得用户的权限
    this.userRole = userRole ? parseInt(userRole, 10) : null;
    this.getArtList()
},
methods:{
  async getArtList(){
        const { data: res }= await this.$http.get('article',{
        params: {
            pagesize:this.paginationOption.defaultPageSize,
            pagenum:this.paginationOption.defaultCurrent,
            title:this.queryParam.title,    
        },
       })
       console.log(res)
       if(res.status!=200)return this.$message.error(res.message)

       this.Artlist=res.data
       this.paginationOption.total=res.total
    },
    async deleteArt(id){
        const confirmed = window.confirm('确认要删除吗？');

        // 如果用户确认删除
        if (confirmed) {
            try {  
                // 发送删除请求
                const res = await this.$http.delete(`Art/${id}`);
                console.log(res);

                // 根据响应状态处理
                if (res.status !== 200) {
                this.$message.error(res.data.message);
                } else {
                // 删除成功，刷新列表
                this.getArtList();
                this.$message.success(res.data.message);
                }
            } catch (error) {
                // 处理异常
                console.error('Error deleting Art:', error);
                this.$message.error('删除文章时出错');
            }
        }
    },
     tst(){
        console.log("111S")    
    },
    async showArticle(id){
       console.log('点击'+id);
       this.$router.push(`Art/${id}`)
    },
  

    
},

}
</script>



<style scoped>
.ArtImg img{
    width: 250px;
    height:200px;

}
/* .listContainer{
    background-image: url('../../assets/1102604.jpg');
    background-size: cover;
    background-position: center; 
} */

</style>