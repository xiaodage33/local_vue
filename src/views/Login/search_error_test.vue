<template>
  <div id="app">
    <div class="container"     >
      <div class="header">
        <input type="text" v-model="keyword">
        <div class="match-num">{{ currentIdx }} / {{ matchCount }}</div>
        <button @click.stop="searchLast">上一个</button>
        <button @click.stop="searchNext">下一个</button>
                <button @click="cat_log">看日志</button>

      </div>

      <div v-for="(item,index) in content ">  </div>
                <!--{{item.pod}} -->

      <search-highlight
        class="search-highlight"
        ref="search"
        @current-change="currentChange"
        @mactch-count-change="matchCountChange"
        :content=content
        :keyword="keyword">

      </search-highlight>

        <!--{item}.item.pod-->

    </div>
  </div>
</template>

<script>
import SearchHighlight from '../../components/2.0SearchHighlight.vue'
 import { k8slog } from "../../api/getinfo";

export default {
  name: 'app',
  components: {
    SearchHighlight
  },
    props:{
      // title:String
    },
  data () {
    return {
      keyword: '',
      currentIdx: 0,
      matchCount: 0,
      type_num:'',
        content:
            `
            春江花月夜
                [唐] 张若虚
      春江潮水连海平，海上明月共潮生。
      滟滟随波千万里，何处春江无月明！
      江流宛转绕芳甸，月照花林皆似霰；
      空里流霜不觉飞，汀上白沙看不见。
      江天一色无纤尘，皎皎空中孤月轮。
      江畔何人初见月？江月何年初照人？
      人生代代无穷已，江月年年望相似。
      不知江月待何人，但见长江送流水。
      白云一片去悠悠，青枫浦上不胜愁。
      谁家今夜扁舟子？何处相思明月楼？
      可怜楼上月徘徊，应照离人妆镜台。
      玉户帘中卷不去，捣衣砧上拂还来。
      此时相望不相闻，愿逐月华流照君。
      鸿雁长飞光不度，鱼龙潜跃水成文。
      昨夜闲潭梦落花，可怜春半不还家。
      江水流春去欲尽，江潭落月复西斜。
      斜月沉沉藏海雾，碣石潇湘无限路。
      不知乘月几人归，落月摇情满江树。`,
    }
  },
  methods: {
    searchLast () {
      this.$refs.search.searchLast()
    },
    searchNext () {
      this.$refs.search.searchNext()
    },
    matchCountChange (count) {
      this.matchCount = count
    },
    currentChange (idx) {
      this.currentIdx = idx
    },
      cat_log(){
        let that =this
        k8slog().then(function (res) {
             let content_item=[]

            if(res.status === 200){
                that.content = res.data.data
                // console.log("that.content=",that.content)
                for(let i=0;i< that.content.length;i++){
                    // console.log("循环===",i)
                    // console.log("循环222",that.content[i].pod)
                    // console.log("什么对象",typeof(that.content[i].pod))
                    content_item.push(that.content[i].pod)

                    // console.log("content_item- push 后",content_item)
                }
                that.content = content_item
                console.log("这是数组",that.content)
                // that.content = that.content.join("\n")
                that.content = that.content.join("\n")

                console.log("转换后字符串==：",that.content)
            }else{
                alert("error")
            }
        })
      },
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
body {
  margin: 0;
}
</style>
<style>
.container {
  max-width: 30rem;
  height: 100vh;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header {
  text-align: center;
  display: flex;
  height: 40px;
  align-items: center;
  flex-shrink: 0;
  flex-wrap: wrap;
}
button {
  margin: 0 2px;
  flex-shrink: 0;
}
.search-highlight {
  flex: auto;
  max-height: 20em;
  white-space: pre-line;
  overflow: auto;
  line-height: 2em;
}
</style>