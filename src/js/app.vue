
<template lang='pug'>
  main
    main-header
    .container.main-container
      .row
        .col-sm-4
          textarea.main-input(v-model="input")
          .btn.green_bg.block translate
        .col-sm-8
          translation-item(v-for="block in blocks",  :pureSentence="block")
    main-footer(:name="developer")
</template>

<script>
export default {
  data () {
    return {
      developer:"ahmed osama",
      input:"",
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
    margin-bottom: 15px;;
  }
  
</style>
