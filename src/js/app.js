import Vue from 'vue'
import App from './App.vue'
import mainHeader  from './componenets/header.vue'
import mainFooter  from './componenets/footer.vue'
import item  from './componenets/item.vue'
const apiKey ="$"
Vue.component("main-header",mainHeader)
Vue.component("main-footer",mainFooter)
Vue.component("translation-item",item)
new Vue({
  el: '#app',
  render: h => h(App),
})