<template>
  <div id="q-app">
    {{ words }}
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      words: []
    }
  },
  beforeMount () {
    console.log('test')
    this.$q.electron.ipcRenderer.on('vocabularyFileLoaded', (event, wordsFromVocabularyFile) => {
      this.words = wordsFromVocabularyFile
      // console.log(words)
    })
  },
  mounted () {
    console.log('after mount')
    // this.$nextTick(function () {
    // console.log(this.words)
    // })
  }
}
</script>

<style>
</style>
