<template>
  <ul class="tasklist">
    <li class="taskbox--hidden" v-for="word in words" :key="word">
      Wort: <span class="taskbox__word">{{ word }}</span>
    </li>
  </ul>
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
