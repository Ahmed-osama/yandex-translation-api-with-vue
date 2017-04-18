import axios from 'axios'
<template lang='pug'>
  div.translation_block(v-if="pureSentence.length > 1")
    .row
      .col-sm-3
        span.translation_block_item(:class='{"translation_block_item--loading": wordToTarget.length > 0 && wordToTargetResponse.length < 1 }') 
          span.note(v-if="wordToTarget.length == 0 && wordToTargetResponse.length == 0") single word translation to target lang
      .col-sm-9
        p.translation_block_item.translation_block_item--source
          span.word(v-for='word in sourcWords') {{word}}
      .clearfix
    .row
      .col-sm-3
        span.translation_block_item(v-if="translation.length > 1", :class='{"translation_block_item--loading":wordToSource.length > 0 && wordToSourceResponse.length < 1 }')
          span.note(v-if="wordToTarget.length == 0 && wordToTargetResponse.length == 0") single word translation to source lang
      .col-sm-9
        p.translation_block_item.translation_block_item--translated(:class='{"translation_block_item--loading":translation.length < 1}') {{translation}}
      .clearfix
    .row
      .col-sm-3
      .col-sm-9
        textarea.translation_block_item.translation_block_item--input(v-model.lazy="humanTranslation") {{translation}}
      .clearfix
</template>

<script>
export default {
  data () {
    return {
      translation:"",
      wordToTarget:"",
      wordToTargetResponse:"",
      wordToSource:"",
      wordToSourceResponse:"",
      humanTranslation:this.humanTranslation ||this.translation ,
      key:"trnsl.1.1.20170416T160225Z.e6054dd4f8b7fa3e.aec3b9e969b0d5aa83dcc538ca270dde3e55ce9f",
    }
  },
  props:["pureSentence"],
  computed:{
    url:function(text){
      return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.key}&text=${encodeURI(this.pureSentence)}&lang=en-ar&[format=plain]
     `},
      sourcWords:function(){
        var arr =  this.pureSentence.trim()
        return arr.split(" ")
      }
  },
  methods:{
   
  },
  watch:{
    url:function(){
      var that = this;

      axios
      .get(that.url)
      .then(function (response) {
        that.translation = response.data.text[0]
        console.log(response.data.text[0])
      }) 
    }
  }

}
</script>
<style scoped lang="scss">
  .translation_block{
    margin-bottom: 15px;
  }
  .translation_block_item {
    display: block;
    padding:15px;
    border-radius: 15px;
    background: #fafafa;
    width:100%;
    font-size: 24px;
    line-height: 1.65em;
    &--source{
      border-radius:15px 15px 0 0;
      border-bottom: 1px solid darken(#fafafa,5%);
    }
    &--side-item{
      background: darken(#fafafa,2%);
    }
    &--translated{
      border-radius: 0;
      border-bottom: 1px solid darken(#fafafa,5%);
      min-height: 100px;
      font-family: 'bahej';
    }
    &--input{
      border-radius: 0 0 15px 15px;
      font-family: 'bahej';
      border:none;
      outline: none;
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
