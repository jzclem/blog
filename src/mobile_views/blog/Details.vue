<template>
  <div>
    <van-nav-bar :title="blog.title"
                 left-arrow
                 left-text="返回"
                 right-text="分享"
                 style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -5px 10px #888888;width: 100%;"
                 @click-left="$router.go(-1)"
                 @click-right="$mobileShare()" />
    <div style="height: 60px;"></div>
    <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;padding: 10px 10px 0px 10px">
      发布 {{ blog.create_date }} <br> 更新 {{ blog.update_date }}
    </div>
    <div style="font-size: 0.9rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 10px">
      {{ blog.description }}
    </div>
    <div class="markdown-body" style="padding: 10px" v-html="blog.content"></div>
    <div style="height: 75px;"></div>
  </div>
</template>
<script>
  import GistApi from '@/api/gist'

  export default {
    data () {
      return {
        blog: {
          id: '',
          title: '',
          content: '',
          description: ''
        }
      }

    },
    mounted () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      this.blog.id = this.$route.params.id
      GistApi.single(this.blog.id).then((response) => {
        let result = response.data.data
        this.blog = result
        this.blog['create_date'] = this.$util.utcToLocal(result['create_date'])
        this.blog['update_date'] = this.$util.utcToLocal(result['update_date'])
      }).then(() => this.$toast.clear())
    },
    methods: {}

  }
</script>
