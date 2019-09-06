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
      const passwordHash = allFilesContent.settingsFileContent.pw.hash;
      const passwordSalt = allFilesContent.settingsFileContent.pw.salt;
      this.$store.commit('settings/setPasswordHash', passwordHash);
      this.$store.commit('settings/setPasswordSalt', passwordSalt);

      const vocabularyFilePath = allFilesContent.vocabularyFileContent.filePath;
      this.$store.commit('vocabulary/setFilePath', vocabularyFilePath);

      const vocabularyArray = allFilesContent.vocabularyFileContent.vocabulary;
      this.$store.commit('vocabulary/setTaskList', vocabularyArray);

      const statisticsData = allFilesContent.statisticsFileContent;
      this.$store.commit('statistics/setData', statisticsData);

      if (passwordHash === '' || passwordSalt === '') {
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
