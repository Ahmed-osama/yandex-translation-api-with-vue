
<template lang='pug'>
  main
    main-header(:blockLength="blockLength" @reset="reset" :resetBtn ="inputDone")
    .container.main-container
      transition(name="fade")
        .row(v-if="!inputDone")
          .col-sm-8.col-sm-push-2
            select.select-lang(v-model="sourcelang")
              option(v-for="(key, value) in counterylist" :value="value") {{key}}
            select.select-lang(v-model="targetlang")
              option(v-for="(key, value) in counterylist" :value="value") {{key}}
            textarea.main-input#mainInput(v-model="tempinput" @keyup.enter="input = tempinput")
            transition(name="fade")
              .btn.green_bg.block(v-if="tempinput.length >= 2" @click="input = tempinput; inputDone = true") translate
      transition(name="fade")
        .row(v-if="!translationDone && inputDone")
          .col-sm-8.col-sm-push-2
            translation-item(v-for="(block, index) in blocks",  @translation = "totalTranslation", :pureSentence="block", :indexNum="index" :fromlang="sourcelang" :tolang="targetlang")

            .btnHolder.marginBottom.tac
              .btn.blue_bg.round(v-if="blocks.length > -1", @click="translationDone = true")
                i.mdi-check
                |show translation
      transition(name="fade")
        .row(v-if="translationDone")
          p.output(v-for="p in output")
            |{{p}}
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
      counterylist:[],
      output:[],
      translationDone:false,
      inputDone:false,
      sourcelang:"en",
      targetlang:"ar"
    }
  },
  computed:{
      blocks:function(){
        var blocks =  this.input.split(".") || []
        this.cleanarray(blocks,"")
        return blocks
      },
      blockLength:function(){
         return this.blocks.length
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
        this.output[index] = data + "."
    },
    reset:function(){
      this.input = "";
      this.tempinput = "";
      this.output = [];
      this.translationDone = false;
      this.inputDone = false;
    },
    gitLanguage:function(){
      var url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20170416T160225Z.e6054dd4f8b7fa3e.aec3b9e969b0d5aa83dcc538ca270dde3e55ce9f&ui=ar"
      var that = this
      
      axios
      .get(url)
      .then(function (response) {
        that.counterylist =  response.data.langs
      })

    }
  },
  mounted:function(){
    setTimeout(this.gitLanguage(),500)
    
  }
}
</script>

<style lang="scss">
  .main-container{
    width:100%;
    max-width:100%;
    padding:50px;
  }
  .select-lang{
    display: inline-block;
    padding: 0 15px;
    height: 44px;
    line-height: 43px;
    border:1px solid darken(#fafafa,5%);
    background: rgba(0,0,0,0);
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
    & + .btn{
      margin-bottom:20px;
    }
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
    text-align: right;
    direction:rtl;
  }
  
</style>
