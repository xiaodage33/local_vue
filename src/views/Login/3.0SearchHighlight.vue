<template>
  <div class="search-highlight" v-html="contentShow">
  </div>
</template>

<script>
  import { reactive, ref, isRef, toRefs, onMounted, watch,computed } from '@vue/composition-api';

const CLASS_NAME = 'search-highlight';
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
            if (!root.keyword) return root.content   //???
            let reg = new RegExp(root.keyword, 'g')
            let stringList = root.content.split(reg)
            if (!stringList.length) return root.content
            let content = ''
            for (let i = 0; i < stringList.length - 1; i++) {
                let style = i === lightIndex.value - 1 ? root.currentStyle : root.highlightStyle
                content += `${stringList[i]}<font style="${style}" ${CLASS_NAME}>${root.keyword}</font>`
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
                        emit('current-change', lightIndex.value)
                    }
            }
            ;
            matchCount: {
                immediate: true
                   const  handler = () => {
                        emit('mactch-count-change', matchCount.value)
                    }
            }})

       const  scrollTo= (index) =>{
      root.$nextTick=(() => {
        let list = root.$el.querySelectorAll(`font[${CLASS_NAME}]`)
        if (list[index - 1]) {
          lightIndex.value = index
          list[index - 1].scrollIntoView()
        }
      })
    }
    const searchNext= ()=> {
            alert(sssss)
      root.$nextTick(() => {

        let idx = lightIndex.value >= root.matchCount ? 1 : lightIndex.value + 1
        root.scrollTo(idx)
          alert(22)
      })
    }
   const searchLast= ()=> {
      root.$nextTick=(() => {
        let idx = lightIndex.value <= 1 ? root.matchCount : lightIndex.value - 1
        root.scrollTo(idx)
      })
    }
    const getMatchCount= ()=> {
            alert(156)
      root.$nextTick=(() => {
        let list = root.$el.querySelectorAll(`font[${CLASS_NAME}]`)
        matchCount.value = list.length
        lightIndex.value = matchCount.value ? 1 : 0
        root.scrollTo(lightIndex.value)
      })
    }

        return{
              content,keyword,highlightStyle,currentStyle,matchCount,contentShow,CLASS_NAME,
            scrollTo,searchNext,searchLast,getMatchCount,lightIndex
        }
    }



}
</script>