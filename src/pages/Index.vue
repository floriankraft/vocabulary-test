<template>
  <q-page class="flex flex-center">
    <q-spinner
      color="primary"
      size="96px"
    />
  </q-page>
</template>

<script>
export default {
  beforeMount() {
    this.$q.electron.ipcRenderer.on('backendHasLoadedData', (event, allFilesContent) => {
      const passwordHash = allFilesContent.settingsFileContent.pw;
      this.$store.commit('settings/setPassword', passwordHash);

      const vocabularyFilePath = allFilesContent.vocabularyFileContent.filePath;
      this.$store.commit('vocabulary/setFilePath', vocabularyFilePath);

      const vocabularyArray = allFilesContent.vocabularyFileContent.vocabulary;
      this.$store.commit('vocabulary/setTaskList', vocabularyArray);

      const statisticsData = allFilesContent.statisticsFileContent;
      this.$store.commit('statistics/setData', statisticsData);

      if (passwordHash === '') {
        this.$router.push('/welcome');
      } else if (vocabularyArray.length > 0) {
        this.$router.push('/start');
      } else {
        this.$router.push('/configure');
      }
    });
  },
  mounted() {
    this.$q.electron.ipcRenderer.send('frontendIsReadyForData');
  }
};
</script>

<style>
</style>
