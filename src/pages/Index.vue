<template>
  <q-page class="flex flex-center">
    <q-btn
      @click="$router.push('/tasks')"
      color="primary"
      label="Los!"
    />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  beforeMount () {
    console.log('before mount Index.vue')
    this.$q.electron.ipcRenderer.on('vocabularyFileLoaded', (event, wordsFromVocabularyFile) => {
      console.log('vocabularyFileLoaded')
      this.$store.commit('vocabulary/updateVocabulary', wordsFromVocabularyFile)
    })
  }
}
</script>
