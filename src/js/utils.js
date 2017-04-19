export default {
	
	url:function(text){
      return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.key}&text=${encodeURI(this.pureSentence)}&lang=en-ar&[format=plain]
     `}
}