<template>
  <div>
    <div>My component</div>
    <div>{{ words }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      words: []
    }
  },
  beforeMount () {
    console.log('test')
    this.$q.electron.ipcRenderer.on('vocabularyFileLoaded', (event, wordsFromVocabularyFile) => {
      this.words = wordsFromVocabularyFile
    })
  }
}
</script>

<style>
</style>
