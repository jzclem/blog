<template>
  <div :style="'background: #f8f8f8;min-height: '+windowSize.height+'px'">
    <van-nav-bar right-text="分享" class="nav" title="博客列表" @click-right="$mobileShare()" />
    <div style="height: 60px;"></div>
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="20"
      finished-text="没有更多了"
      @load="list"
    >
      <van-cell class="cell" v-for="item in blogs" :key="item.id" @click="goDetails(item.id)">
        <p class="title">{{ item.title }}</p>
        <p class="time title">{{ '更新时间 ' + item.update_time }}</p>
        <div class="content">{{ $util.cutStr(item.description, 48) }}</div>
      </van-cell>
    </van-list>
    <div style="height: 75px;"></div>
  </div>
</template>
<script>
  import GistApi from '@/api/gist'

  export default {
    data () {
      return {
        windowSize: this.$util.getWindowSize(),
        loading: false,
        finished: false,
        query: {
          page: 1,
          pageSize: 6
        },
        blogs: []
      }
    },
    mounted () {
      this.list()
    },
    methods: {
      list () {
        this.loading = true
        GistApi.list(this.query).then((response) => {
          let result = response.data.data
          this.blogs.push(...result)
          this.finished = result.length < ++this.query.page
        }).then(() => this.loading = false)
      },
      goDetails (id) {
        this.$router.push(`/mobile/user/blog/details/${id}`)
      }
    }
  }
</script>

<style scoped>
  .nav {
    position:fixed;
    top:0;
    z-index: 9999;
    box-shadow: 0 -3px 10px #888888;
    width: 100%;
  }
  .title {
    margin: 0;
  }
  .time {
    font-size: 0.7rem;
    margin-bottom: 7px;
  }
  .content {
    padding: 7px 15px 7px 0;
    color: #303133;
    font-size: 0.9rem;
    border-top: 1px solid #ebedf0;
  }
  .cell {
    margin: 10px 0;
  }
  [class*=van-hairline]::after {
    border: 0;
  }
  .van-list .cell:first-child {
    margin: 0;
  }
</style>
