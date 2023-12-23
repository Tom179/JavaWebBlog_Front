<template>
    <div>
        <a-card>
            <h2>创作</h2>
            <a-form-model :model="artInfo"  ref="artInfoRef">
            <a-form-model-item label="文章标题"></a-form-model-item>
            <a-input style="width:300px" v-model="artInfo.title"></a-input> 
            <a-form-model-item label="文章描述"></a-form-model-item>
            <a-input type="textarea" style="width:900px" v-model="artInfo.description"></a-input>
            <a-form-model-item label="封面">
                <a-upload
                    name="file"
                    :multiple="false"
                    action="http://localhost:8888/api/v1/upload"
                    :headers="headers"
                    @change="upChange"
                    listType="picture"
                >
                    <a-button> <a-icon type="upload" />点击上传 </a-button>
          <br/>
                </a-upload><!--listType=Picture：显示上传的图片-->
            </a-form-model-item>
             <a-form-model-item label="正文"></a-form-model-item>
            <a-input  v-model="artInfo.content" type="textarea" style="width:1200px;height: 400px;"></a-input>
            <a-form-model-item >
                <a-button type="primary" style="margin-right: 15px" @click="artOk(artInfo.id)">{{artInfo.id?'更新':'提交'}}</a-button>
                <a-button type="default" @click="addCancel">取消</a-button>
                 
            </a-form-model-item>
           </a-form-model>
        </a-card>
    </div>
</template>

<script>
export default {
    props:['id'],
    data(){
        return{
            artInfo:{
                id:0,//文章id
                title: '',
                description: '',
                content: '',
                UserID:'',//作者id
                img: '',
            },
            headers:{

            },

        }
    },
    created(){
    const UserID = sessionStorage.getItem('UserID');//获得用户的权限
    console.log(UserID)
    this.artInfo.UserID = UserID
    const modifyArticle=window.sessionStorage.getItem('modifyArticle')
        if(modifyArticle){
            console.log('sessionStroage中的值为'+modifyArticle)
        this.artInfo.id=modifyArticle
        this.getArtInfo(this.artInfo.id)
        console.log('文章id:'+this.artInfo.id)
        console.log('artInfo标题更新：'+this.artInfo.title)
        }
    },
    methods:{
        upChange(info) {
            if (info.file.status !== 'uploading') {
            
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                this.$message.success(`${info.file.name} 文件上传成功`);
                const imgUrl=info.file.response.Url
                this.artInfo.img=imgUrl

            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} 文件上传失败`);
            }
         
        },
        async getArtInfo(id){
           const {data:res}= await this.$http.get(`article/info/${id}`)
           if(res.status!=200) return this.$message.error(res.message)
          
          this.artInfo.title=res.article.title
          this.artInfo.description=res.article.description
          this.artInfo.content=res.article.content
          this.artInfo.UserID=res.article.created_by
          this.artInfo.img=res.article.img
          console.log(this.artInfo)
           console.log("响应到的img为"+res.article.img)          
        },
        async artOk(id){
          
           if(id==0){
            try{
                const {data:res}=await this.$http.post('article/add',this.artInfo)
                console.log(res)
                if(res.status!=200) return this.$message.error(res.message)
                this.$router.push('/admin/artlist')
                this.$message.success(res.message)
             }catch(error){
                console.error(error)
             }
           }else{
                const {data:res}=await this.$http.put(`Art/${id}`,this.artInfo)
                if(res.status!=200) return this.$message.error(res.message)
                
                this.$router.push('/admin/artlist')
                this.$message.success(res.message)
           }
          
        },
        addCancel(){
            this.$refs.artInfoRef.resetFields()
        }

    },
}
</script>