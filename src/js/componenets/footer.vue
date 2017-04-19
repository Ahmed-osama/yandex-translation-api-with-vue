<template lang='pug'>
  footer.main-footer
    nav.main-footer__nav
      a(v-for="item in nav" :href="item.link" target="_target") {{item.name}}
    .main-footer__socials
      a.socialItem(v-for="item in socials" href="" class="item.class")
        i(class="item.icon")
</template>

<script>
export default {
  data () {
    return {
      nav:[
        {
          link:"https://github.com/Ahmed-osama",
          name:"Developer"
        }
      ],
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

