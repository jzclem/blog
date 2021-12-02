<template>
  <div :style="'background: #f8f8f8;min-height: '+windowSize.height+'px'">
    <van-nav-bar right-text="分享"
                 style="position:fixed;top:0;z-index: 9999; box-shadow: 0px -3px 10px #888888;width: 100%;"
                 title="博客列表"
                 @click-right="$mobileShare()" />
    <div style="height: 60px;"></div>
    <router-link v-for="(item,index) in blogs" :key="'p'+index" :to="`/mobile/user/blog/details/${item.id}`">
      <van-panel :desc="'更新时间 '+item.update_time" :title="item.title" style="margin-bottom: 10px">
        <div style="padding: 7px 15px 7px 15px;color: #303133;font-size: 0.9rem">{{
            $util.cutStr(item.description, 50) }}
        </div>
      </van-panel>
    </router-link>
    <div style="height: 75px;"></div>
  </div>
</template>
<script>
  import GistApi from '@/api/gist'

  export default {
    data () {
      return {
        windowSize: this.$util.getWindowSize(),
        query: {
          page: 1,
          pageSize: 20,
          pageNumber: 1
        },
        searchKey: '',
        blogs: []
      }
    },
    mounted () {

      this.list()
    },
    methods: {
      test () {

      },
      list () {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: '加载中'
        })
        GistApi.list(this.query).then((response) => {
          let result = response.data.data
          let pageNumber = this.$util.parseHeaders(response.headers)
          if (pageNumber) {
            this.query.pageNumber = pageNumber
          }
          if (result.length == 0) {
            return
          }
          this.blogs = result
        }).then(() => this.$toast.clear())
      },
      search () {
        for (let i = 0; i < this.blogs.length; i++) {
          this.blogs[i].hide = this.blogs[i].title.indexOf(this.searchKey) < 0
        }
      },
      goDetails (id) {
        console.log(id)
        this.$router.push('' + id)
      }
    }
  }
</script>
