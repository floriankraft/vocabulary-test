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
      this.$store.commit('vocabulary/createTaskList', wordsFromVocabularyFile);
    });
  }
};
</script>

<style>
</style>
