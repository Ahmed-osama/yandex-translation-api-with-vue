import axios from 'axios'
<template lang='pug'>
  div
    p {{pureSentence}}
    p {{translation}}
    textarea(v-model="humanTranslation") {{translation}}
</template>

<script>
export default {
  data () {
    return {
      translation:"",
      humanTranslation:this.humanTranslation ||this.translation ,
      key:"trnsl.1.1.20170416T160225Z.e6054dd4f8b7fa3e.aec3b9e969b0d5aa83dcc538ca270dde3e55ce9f"
    }
  },
  props:["pureSentence"],
  computed:{
    url:function(){
      return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.key}&text=${encodeURI(this.pureSentence)}&lang=en-ar&[format=plain]
     `}
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

