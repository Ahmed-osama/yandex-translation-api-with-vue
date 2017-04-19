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
        li: a source blocks : {{blockLength}}
      
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
  props:['blockLength'],
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

