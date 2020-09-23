<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapGetters([
        'githubUsername',
        'htmlTitle'
      ])
    },
    created () {
      this.$store.dispatch('Init')
      this.$store.dispatch('GetInfo')
      this.$setTitle(this.$route.meta.title)
      let windowSize = this.$util.getWindowSize()
      let pathArr = this.$route.path.split('/')
      if (pathArr[1] == 'user' && windowSize.height > windowSize.width * 1.2) {
        this.$router.push('/mobile/user/blog')
      }
      if (pathArr[1] == 'mobile' && windowSize.height <= windowSize.width * 1.2) {
        this.$router.push('/')
      }
    },
    mounted () {
      document.title = `被发现啦(*´∇｀*)`
      let visProp = this.getHiddenProp()
      this.evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange'
      document.addEventListener(this.evtname, this.visibilityChange, false)
    },
    methods: {
      getHiddenProp () {
        var prefixes = ['webkit', 'moz', 'ms', 'o']
        // 如果本地支持“隐藏”，就返回它
        if ('hidden' in document) {
          return 'hidden'
        }
        // 否则，循环所有已知前缀，直到*找到一个
        for (var i = 0; i < prefixes.length; i++) {
          if ((prefixes[i] + 'Hidden') in document) {
            return prefixes[i] + 'Hidden'
          }
        }
        // 否则不支持
        return null
      },
      getVisibilityState () {
        var prefixes = ['webkit', 'moz', 'ms', 'o']
        if ('visibilityState' in document) return 'visibilityState'
        for (var i = 0; i < prefixes.length; i++) {
          if ((prefixes[i] + 'VisibilityState') in document) {
            return prefixes[i] + 'VisibilityState'
          }
        }
        // otherwise it's not supported 否则不支持
        return null
      },
      visibilityChange () {
        switch (document[this.getVisibilityState()]) {
          case 'visible':
            document.title = `被发现啦(*´∇｀*)`
            break
          case 'hidden':
          default:
            document.title = `藏好啦(つд⊂)`
            break
        }
      }
    }
  }
</script>
