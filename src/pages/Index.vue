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
      const isPasswordExisting = allFilesContent.settingsFileContent.isPasswordExisting;
      this.$store.commit('settings/setIsPasswordExisting', isPasswordExisting);

      const vocabularyFilePath = allFilesContent.vocabularyFileContent.filePath;
      this.$store.commit('vocabulary/setFilePath', vocabularyFilePath);

      const vocabularyArray = allFilesContent.vocabularyFileContent.vocabulary;
      this.$store.commit('vocabulary/setTaskList', vocabularyArray);

      const statisticsData = allFilesContent.statisticsFileContent;
      this.$store.commit('statistics/setData', statisticsData);

      if (!isPasswordExisting) {
        this.$router.push('/welcome');
      } else {
        this.$router.push('/start');
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
