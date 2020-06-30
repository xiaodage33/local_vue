<template>
  <div class="search-highlight" v-html="contentShow" >
  </div>
</template>

<script>
const CLASS_NAME = 'search-highlight'
export default {
  name:"2.0SearchHighlight",
    props: {
    content: {item:[{pod:'',status:''}]
        // pod:'',
        // status:''
        // type: String,
        // default: ''
    },
    keyword: {
      type: String,
      default: ''
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

    //    123456789   keyword->3
    // ['12','456789']
    // 12<font>3</font>456789


  computed: {    //这个监听是筛选实时
    contentShow () {
      console.log("this.keyword==",this.keyword)  //事件监听实时更新输入内容查找
      if (!this.keyword) return this.content
      let reg = new RegExp(this.keyword, 'g') //g表示全局
        // console.log("haha==",this.content)    //所有的列表输出
        // console.log("reg===",reg)     //输入内容进行匹配
      let stringList = this.content.split(reg)
        // console.log("stringList===进行分割",stringList)   //所有筛选
      if (!stringList.length) return this.content
      let content = ''
          // console.log("iiii==",content)   //搜索赋值？？
      for (let i = 0; i < stringList.length - 1; i++) {
          let style = i === this.lightIndex - 1 ? this.currentStyle : this.highlightStyle
          // console.log("sytle==", style) //搜索到的加背景
          content += `${stringList[i]}<font style="${style}" ${CLASS_NAME}>${this.keyword}</font>`
          // <font style="" search-highlight>sdfsdfdsf</font>
          // <font style="background: #ff9632" search-highlight="">fbss</font>
          // console.log("110==", content)  //输出<font style="background: #ff9632" search-highlight>django</font>
      }
      content += stringList[stringList.length - 1]
      // console.log("输出所有筛选的内容",content)  //输出日志所有筛选的内容
      return content
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler () {
        console.log("是否刷新进入 watch")
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
        let list = this.$el.querySelectorAll(`font[${CLASS_NAME}]`) //html5 -> js
          // console.log("list==",list)  //筛选了几个
        if (list[index - 1]) {
          this.lightIndex = index
            // console.log("this.lightIndex==",this.lightIndex) //当前滚动位置
          list[index - 1].scrollIntoView()
        }
      })
    },
    searchNext() {
      console.log("2.0Search",12345678)
      this.$nextTick(() => {
        let idx = this.lightIndex >= this.matchCount ? 1 : this.lightIndex + 1
        // console.log("idx===",idx)  //当前下一个的值数字
        this.scrollTo(idx)
      })
    },
    searchLast () {
      this.$nextTick(() => {
        let idx = this.lightIndex <= 1 ? this.matchCount : this.lightIndex - 1
        console.log("searchLast--idx",idx)   //上一个搜索字符
          this.scrollTo(idx)
      })
    },
    getMatchCount () {
      this.$nextTick(() => {
         console.log("this.$nextTick这个方法")

        let list = this.$el.querySelectorAll(`font[${CLASS_NAME}]`)

        console.log("getMatchCount这个方法搜到到几个==",list) //监听部分取值搜索
        this.matchCount = list.length
        this.lightIndex = this.matchCount ? 1 : 0
        this.scrollTo(this.lightIndex)
      })
    },
  }
}
</script>