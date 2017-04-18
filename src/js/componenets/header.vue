<template lang='pug'>
 header.main-header
  a.main-header__logo(href="index.html")
    img(src="img/logo.png")
  input#headerSidemenu-state(type="checkbox" hiddin)
  label.main-header__menuToggler(for='headerSidemenu-state')
    -for(var i=0; i<=2; i++)
      span
  #headerSidemenu.main-header__sideMenu
    nav.main-header__nav
      ul
        li(v-for="item in nav")
          a(:href="item.link") {{item.name}}
      .btn.yellow_bg.round.main-header__cta
        span add your story
        i.mdi-plus
  label.main-header__menuTogglerOver(for='headerSidemenu-state')
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

