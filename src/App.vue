<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount () {
    console.log('before mount Index.vue')
    this.$q.electron.ipcRenderer.on('vocabularyFileLoaded', (event, wordsFromVocabularyFile) => {
      console.log('vocabularyFileLoaded')
      this.$store.commit('vocabulary/updateVocabulary', wordsFromVocabularyFile)
    })
  }
}
</script>

<style>
</style>
