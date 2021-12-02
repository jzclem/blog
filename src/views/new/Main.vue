<template>
  <div v-loading="loading" style="min-height: 600px">
    <el-card v-if="blog.id" shadow="never" style="min-height: 400px">
      <div slot="header">
        <span>{{ blog.title }}</span>
      </div>
      <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
        发布 {{ blog.create_date }} <br> 更新 {{ blog.update_date }}
      </div>
      <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px">
        <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
      </div>
      <div class="markdown-body" style="padding-top: 20px" v-html="blog.content"></div>
    </el-card>
    <el-card v-if="!blog.id" shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center">
      <font style="font-size: 30px;color:#dddddd "> <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b> </font>
    </el-card>
  </div>
</template>
<script>
  import GistApi from '@/api/gist'

  export default {
    data () {
      return {
        query: {
          page: 1,
          pageSize: 1
        },
        loading: false,
        blog: {
          id: '',
          title: '',
          content: '',
          description: '',
          createTime: '',
          updateTime: ''
        }
      }
    },
    mounted () {
      this.loading = true
      GistApi.list(this.query).then((response) => {
        let result = response.data.data
        if (!result || result.length == 0) {
          this.loading = false
          return
        }
        this.blog.id = result[0]['id']
        GistApi.single(this.blog.id).then((response) => {
          let result = response.data.data
          this.blog = result
          this.blog['create_date'] = this.$util.utcToLocal(result['create_date'])
          this.blog['update_date'] = this.$util.utcToLocal(result['update_date'])
        }).then(() => this.loading = false)
      })
    },
  }
</script>
