<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount() {
    this.$q.electron.ipcRenderer.on('vocabularyFileLoaded', (event, wordsFromVocabularyFile) => {
      this.$store.commit('vocabulary/createVocabularyTaskList', wordsFromVocabularyFile);
    });
  }
};
</script>

<style>
</style>
