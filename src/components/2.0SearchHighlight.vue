<template>
  <div class="search-highlight" v-html="contentShow">
  </div>
</template>

<script>
const CLASS_NAME = 'search-highlight'
export default {
  name:"2.0SearchHighlight",
    props: {
    content: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      default: 'Exception'
    },
    highlightStyle: {
      type: String,
      default: 'background: #ffff00'
    },
    currentStyle: {
      type: String,
      default: 'background: #ff9632'
    }
  },
  data () {
    return {
      lightIndex: 0,
        currentIdx:0,
      matchCount: 0
    }
  },
  computed: {
    contentShow () {
        console.log("contentShow",)
      if (!this.keyword) return this.content
      let reg = new RegExp(this.keyword, 'g')
      let stringList = this.content.split(reg)
      if (!stringList.length) return this.content
      let content = ''
      for (let i = 0; i < stringList.length - 1; i++) {
        let style = i === this.lightIndex - 1 ? this.currentStyle : this.highlightStyle
        content += `${stringList[i]}<font style="${style}" ${CLASS_NAME}>${this.keyword}</font>`
      }
      content += stringList[stringList.length - 1]
      // console.log(content)  //输出日志所有内容
      return content
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler () {
        this.getMatchCount()
      }
    },
    lightIndex: {
      immediate: true,
      handler () {
        this.$emit('current-change', this.lightIndex)
      }
    },
    matchCount: {
      immediate: true,
      handler () {
        this.$emit('mactch-count-change', this.matchCount)
      }
    }
  },
  methods: {
    scrollTo (index) {
      this.$nextTick(() => {
        let list = this.$el.querySelectorAll(`font[${CLASS_NAME}]`)
        if (list[index - 1]) {
          this.lightIndex = index
          list[index - 1].scrollIntoView()
        }
      })
    },
    searchNext() {
      console.log("2.0Search",12345678)
      this.$nextTick(() => {
        let idx = this.lightIndex >= this.matchCount ? 1 : this.lightIndex + 1
        this.scrollTo(idx)
      })
    },
    searchLast () {
      this.$nextTick(() => {
        let idx = this.lightIndex <= 1 ? this.matchCount : this.lightIndex - 1
        this.scrollTo(idx)
      })
    },
    getMatchCount () {
      this.$nextTick(() => {
        let list = this.$el.querySelectorAll(`font[${CLASS_NAME}]`)
        this.matchCount = list.length
        this.lightIndex = this.matchCount ? 1 : 0
        this.scrollTo(this.lightIndex)
      })
    },
  }
}
</script>