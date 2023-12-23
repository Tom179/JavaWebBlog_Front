<template>
    <div>
      <a-card :title="article.title">
        <p >发布者：{{ article.authorName }}</p>
        <p>{{ article.createTime }}</p>
        <img :src="article.coverImage" alt="封面图片" class="cover-image" />
        <div class="article-content" v-html="article.content"></div>
      </a-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        article: {
          id: null,
          title: '文章标题',
          author: '作者',
          authorName:null,
          createTime: '2023-01-01', // 
          content: '文章内容...', // 
          coverImage: '', // 
        },
      };
    },
    created() {
      this.getArticle(this.$route.params.id);
    },
    methods: {
      async getArticle(id) {
        console.log('id为' + id);
        const { data: res } = await this.$http.get(`Art/${id}`);
        // console.log(res.data.content);
        console.log(res.data.title);
        this.article.title = res.data.title;
        this.article.author = res.data.created_by; // 这里需要获取作者信息，替换为实际的作者信息
        this.article.authorName=res.authorName
        console.log('作者为'+this.article.author)
        console.log('作者名为'+res.authorName)
        this.article.createTime = res.data.created_at;
        this.article.content = res.data.content;
        this.article.coverImage = res.data.img;
      },
  
     
    },
  };
  </script>
  
  <style scoped>
  .cover-image {
    max-width: 100%;
    max-height: 300px; /* 设置封面图片的最大高度 */
    margin-bottom: 16px; /* 与文章内容之间添加一些底边距 */
  }
  
  .article-content {
    white-space: pre-line; /* 保留换行符 */
  }
  </style>
  