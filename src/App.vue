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
      this.$store.commit('vocabulary/setTaskList', wordsFromVocabularyFile);
    });
    this.$q.electron.ipcRenderer.on('statisticsFileLoaded', (event, statistics) => {
      this.$store.commit('vocabulary/setStatistics', statistics);
    });
  }
};
</script>

<style>
</style>
