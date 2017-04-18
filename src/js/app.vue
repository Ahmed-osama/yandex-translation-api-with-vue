
<template lang='pug'>
  main
    main-header
    .container.main-container
      .row
        .col-sm-4
          textarea(v-model="input")
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

