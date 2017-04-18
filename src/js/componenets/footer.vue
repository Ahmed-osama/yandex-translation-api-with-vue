<template lang='pug'>
  footer.main-footer
    nav.main-footer__nav
      a(href="#") Developer
    .main-footer__socials
      a.socialItem(v-for="item in socials" href="" class="item.class")
        i(class="item.icon")
</template>

<script>
export default {
  data () {
    return {
      socials:[
        {
          class : "facebook",
          icon  : "mdi-facebook"
        }, {
          class : "twitter",
          icon  : "mdi-twitter"
        }, {
          class : "youtube",
          icon  : "mdi-youtube-play"
        }
      ]
    }
  },
  computed(){
    return {
      
    }
  },
  methods(){
    return{

    }
  }
}
</script>

