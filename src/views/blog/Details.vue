<template>
  <div v-loading="loading" style="min-height: 600px">
    <el-card shadow="never" style="min-height: 400px">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>{{ blog.title }}</span>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right;">
              <el-button icon="el-icon-share" style="padding: 3px 0" type="text" @click="$share()">分享</el-button>
              <el-button v-if="token" icon="el-icon-edit" style="padding: 3px 0" type="text" @click="edit">编辑
              </el-button>
              <el-button v-if="token" icon="el-icon-delete" style="padding: 3px 0" type="text" @click="deleteBlog">删除
              </el-button>
              <el-button icon="el-icon-more-outline" style=" padding: 3px 0" type="text" @click="more">更多博客</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
        发布 {{ blog.create_date }} <br> 更新 {{ blog.update_date }}
      </div>
      <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px">
        <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
      </div>
      <div class="markdown-body" style="padding-top: 20px" v-html="blog.content"></div>
    </el-card>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import GistApi from '@/api/gist'

  export default {
    data () {
      return {
        blog: {
          id: '',
          title: '',
          content: '',
          description: ''
        },
        loading: false,
      }
    },
    computed: {
      ...mapGetters([
        'token',
      ])
    },
    mounted () {
      this.loading = true
      this.blog.id = this.$route.params.id
      GistApi.single(this.blog.id).then((response) => {
        let result = response.data.data
        this.blog = result
        this.blog['create_date'] = this.$util.utcToLocal(result['create_date'])
        this.blog['update_date'] = this.$util.utcToLocal(result['update_date'])
      }).then(() => this.loading = false)
    },
    methods: {
      deleteBlog () {
        this.$confirm('是否永久删除该博客?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          GistApi.delete(this.blog.id).then(_ => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.$router.push('/user/blog/main')
          })
        })
      },
      edit () {
        if (!this.token) {
          this.$message({
            message: '请绑定有效的Token',
            type: 'warning'
          })
          return
        }
        this.$router.push('/user/blog/edit/' + this.blog.id)
      },
      more () {
        this.$router.push('/user/blog/main')
      }
    }
  }
</script>
