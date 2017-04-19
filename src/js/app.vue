
<template lang='pug'>
  main
    main-header
    .container.main-container
      .row(v-if="!translationDone")
        .col-sm-4
          textarea.main-input(v-model="tempinput" @keyup.enter="input = tempinput")
          .btn.green_bg.block(@click="input = tempinput") translate
        .col-sm-8
          translation-item(v-for="(block, index) in blocks",  :pureSentence="block", :indexNum="index" @translation = "totalTranslation")
          

          .btnHolder.marginBottom.tac
            .btn.blue_bg.round(v-if="blocks.length > 1", @click="translationDone = true")
              i.mdi-check
              |show translation
      .row(v-if="translationDone")
        p.output(v-for="p in output")
          |{{p}} .
          br
    main-footer(:name="developer")
</template>

<script>
export default {
  data () {
    return {
      developer:"ahmed osama",
      input:"",
      tempinput:"",
      output:[],
      translationDone:false
    }
  },
  computed:{
      blocks:function(){
        var blocks =  this.input.split(".") || []
        this.cleanarray(blocks,"")
        return blocks
      }
  },
  methods:{
    cleanarray: function(c,val) {
      var arr = [];
      for (var i = 0; i < c.length; i++) {
        if (c=!val) {
          arr.push(c[i]);
        }
      }
      return arr;
    },
    totalTranslation:function(data, index){
        this.output[index] = data
    }
  },
}
</script>

<style lang="scss">
  .main-container{
    width:100%;
    max-width:100%;
    padding:50px;
  }
  .main-input{
    padding: 15px;
    font-size: 18px;
    line-height: 1.5em;
    display: block;
    height:calc(100vh - 250px);
    background: #fafafa;
    border:none;
    outline: none;
    clear:both;
    width:100%;
    margin-bottom: 15px;
    border:1px solid darken(#fafafa,5%);
  }
  .output{
    font-family: 'bahej';
    line-height:  1.6em;
    font-size:  24px;
    margin-bottom:  15px;
    max-width:600px;
    margin-left:  auto;
    margin-right: auto;
    display:  block;
  }
  
</style>
