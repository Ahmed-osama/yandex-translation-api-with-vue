import axios from 'axios'
<template lang='pug'>
  div.translation_block(v-if="pureSentence.length > 1")
    .row
      .col-sm-4
        span.translation_block_item.translation_block_item--side-item(:class='{"translation_block_item--loading": wordToTargetLoading }') 
          span(v-if="wordToTargetResponse.length != 0") {{wordToTargetResponse}}
      .col-sm-8
        p.translation_block_item.translation_block_item--source
          span.word(v-for='(word, index) in sourcWords', @click="totarget(word, index)", :class='{"active":totargetindex == index, "ar": fromlang == "ar" }') {{word}}
      .clearfix
    .row
      .col-sm-4
        span.translation_block_item.translation_block_item--side-item(v-if="translation.length > 1", :class='{"translation_block_item--loading": wordToSourceLoading, "ar":tolang =="ar" }')
          span(v-if="wordToSourceResponse.length != 0") {{wordToSourceResponse}}
         
      .col-sm-8
        p.translation_block_item.translation_block_item--translated(:class='{"translation_block_item--loading":loadingTranslation, "ar":tolang =="ar"}')
          span.word(v-for='(word, index) in translatedWords', @click="tosource(word, index)", :class='{"active":tosourceindex == index }') {{word}}

      .clearfix
    .row
      .col-sm-4.btnHolder

        .btn.square.blue_bg.right.round(@click="initTranslation")
          i.mdi-reload
        .btn.square.red_bg.right.round {{indexNum + 1}}
      .col-sm-8
        textarea.translation_block_item.translation_block_item--input(v-model.lazy="humanTranslation" :class='{"ar": tolang == "ar"}') {{translation}}
      .clearfix

</template>

<script>
export default {
  data () {
    return {
      translation:"",

      loadingTranslation:true,
      wordToTargetResponse:"",
      wordToSourceResponse:"",
      wordToTargetLoading:false,
      wordToSourceLoading:false,
      
      tosourceindex:-1,
      totargetindex:-1,

      humanTranslation:"",
      key:"trnsl.1.1.20170416T160225Z.e6054dd4f8b7fa3e.aec3b9e969b0d5aa83dcc538ca270dde3e55ce9f",
      loaded:"",

    }
  },
  props:["pureSentence","indexNum", "fromlang","tolang"],
  computed:{
      sourcWords:function(){
        var arr =  this.pureSentence.trim()
        return arr.split(" ")
      }, 
      translatedWords:function(){
        var arr =  this.translation.trim()
        return arr.split(" ")
      }
  },
  methods:{
    url:function(text,from,to){
      from = from || "en"
      to = to || "ar"
      return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.key}&text=${encodeURI(text)}&lang=${from}-${to}&[format=plain]
    `},
    initTranslation:function(){
      var that = this
      axios
      .get(that.url(that.pureSentence,that.fromlang, that.tolang))
      .then(function (response) {
          that.translation =  response.data.text[0]
          that.$emit('translation', that.humanTranslation, that.indexNum)
          that.loaded =true
          that.loadingTranslation =false
          that.humanTranslation  = that.translation 
       
      })
    },
    totarget(word,index){
      var that = this
      that.wordToTargetResponse = ""
      that.wordToTargetLoading =  true
      this.totargetindex = index
      axios
      .get(that.url(word,that.fromlang,that.tolang))
      .then(function (response) {
         that.wordToTargetResponse =  response.data.text[0]
          that.wordToTargetLoading =  false
      })
    },
    tosource(word,index){
      var that = this
      that.wordToSourceResponse = ""
      that.wordToSourceLoading =  true
      this.tosourceindex = index
      axios
      .get(that.url(word,that.tolang, that.fromlang))
      .then(function (response) {
         that.wordToSourceResponse =  response.data.text[0]
         that.wordToSourceLoading =  false
      })
    },
  },
  watch:{
    humanTranslation:function(){
      this.$emit('translation', this.humanTranslation, this.indexNum)
    }
  },
  mounted:function(){
    var that = this
    if(!that.pureSentence) return
    this.initTranslation()
  }
}
</script>
<style scoped lang="scss">
  .translation_block{
    padding-bottom: 10px;
     border-bottom: 3px solid darken(#fafafa,5%);
    margin-bottom: 20px;
  }
  .translation_block_item {
    display: block;
    padding:15px;
    border-radius: 2px;
    background: #fafafa;
    width:100%;
    font-size: 24px;
    line-height: 1.65em;
    margin-bottom: 10px;
    min-height: 100px;
    &.ar{
      font-family: 'bahej';
      direction:rtl;
      text-align: right;;
    }
    &--source{
      border-radius:2px 2px 0 0;
      border-bottom: 1px solid darken(#fafafa,5%);
      border-right:3px solid #e61400;
    }
    &--side-item{
      background: darken(#fafafa,2%);
      font-size: 32px;
      text-align: center  ;
      line-height:  66px;
      color:#0047e6;
    }
    &--translated{
      border-radius: 0;
      border-bottom: 1px solid darken(#fafafa,5%);
      border-right:3px solid #0047e6;
    }
    &--input{
      border-radius: 0 0 2px 2px;
      border:none;
      outline: none;
      border: 2px solid darken(#fafafa,5%);
      width:   100%;
      min-width:   100%;
      max-width:   100%;

      &:focus{
         border: 2px solid #0047e6;
      }
    }
    &--loading{
      background-image:url("../../../img/gears.gif");
      background-repeat: no-repeat;
      background-position:50% 50%;
      background-size: 32px 32px;
      border:none;
    }
  }
  .word{
    display: inline-block;
    padding:5px;
    line-height: 1em;
    border-radius:3px;
    &.active{
      background:lighten(#0047e6,40%);
    }
    &:hover{
      cursor: pointer;
      background:darken(#fafafa,5%);
    }
  }
  .note{
    color:darken(#fafafa,15%);
    font-size: 12px;
  }
</style>
