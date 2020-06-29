<template>
  <div class="search-highlight" v-html="contentShow">
  </div>
</template>

<script>
  import { reactive, ref, isRef, toRefs, onMounted, watch,computed } from '@vue/composition-api';

const CLASS_NAME = 'search-highlight'
export default {
    name:'SearchHighlight',
    setup(props, {refs, root, ref,emit}) {
        const content = reactive({
            type: String,
            default: ''
        });
        const keyword = reactive({
            type: String,
            default: 'Exception'
        });
        const highlightStyle = reactive({
            type: String,
            default: 'background: #ffff00'
        });
        const currentStyle = reactive({
            type: String,
            default: 'background: #ff9632'
        });
        const lightIndex=ref(0)
        const matchCount = ref(0)


       // const contentShow = =>content.contentShow())



        const contentShow = computed(() => {
            if (!root.keyword) return root.content
            let reg = new RegExp(root.keyword, 'g')
            let stringList = root.content.split(reg)
            if (!stringList.length) return this.content
            let content = ''
            for (let i = 0; i < stringList.length - 1; i++) {
                let style = i === root.lightIndex - 1 ? root.currentStyle : root.highlightStyle
                content += `${stringList[i]}<font style="${style}" ${CLASS_NAME}>${this.keyword}</font>`
            }
            content += stringList[stringList.length - 1]
            // console.log(content)  //输出查找的内容
            return content
        })


        // watch(()=>{
        //     alert(123)
        // })
        watch(() => {data.dialog_info_flag = props.flag;
            keyword: {
                immediate: true
                   const  handler = () => {
                    getMatchCount()
                    }
            }
            ;
            lightIndex: {
                immediate: true
                   const  handler = () => {
                        emit('current-change', root.lightIndex)
                    }
            }
            ;
            matchCount: {
                immediate: true
                   const  handler = () => {
                        emit('mactch-count-change', root.matchCount)
                    }
            }})

       const  scrollTo= (index) =>{
      root.$nextTick=(() => {
        let list = root.$el.querySelectorAll(`font[${CLASS_NAME}]`)
        if (list[index - 1]) {
          root.lightIndex = index
          list[index - 1].scrollIntoView()
        }
      })
    }
    const searchNext= ()=> {
            alert(sssss)
      root.$nextTick(() => {

        let idx = root.lightIndex >= root.matchCount ? 1 : root.lightIndex + 1
        root.scrollTo(idx)
          alert(22)
      })
    }
   const searchLast= ()=> {
      root.$nextTick=(() => {
        let idx = root.lightIndex <= 1 ? root.matchCount : root.lightIndex - 1
        root.scrollTo(idx)
      })
    }
    const getMatchCount= ()=> {
            alert(156)
      root.$nextTick=(() => {
        let list = root.$el.querySelectorAll(`font[${CLASS_NAME}]`)
        root.matchCount = list.length
        root.lightIndex = root.matchCount ? 1 : 0
        root.scrollTo(root.lightIndex)
      })
    }

        return{
              content,keyword,highlightStyle,currentStyle,matchCount,contentShow,CLASS_NAME,
            scrollTo,searchNext,searchLast,getMatchCount,lightIndex
        }
    }



}
</script>