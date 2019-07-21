<template>
  <q-page class="flex flex-center">
    <div v-if="!isVocabularyFileLoaded">
      <h1 class="text-h3">Die Vokabel Datei ist leer.</h1>
      <p>Bitte tragen Sie Wörter in die Vokabel Datei ein:</p>
      <p>Pfad: {{vocabularyFilePath}}</p>
      <p class="index__vocabulary-missing__message">Sobald Sie fertig sind, starten Sie bitte die Anwendung neu.</p>
      <q-btn
        @click="openVocabularyFile"
        class="index__vocabulary-missing__button"
        color="primary"
        label="Datei öffnen"
      />
    </div>
    <q-btn
      v-if="isVocabularyFileLoaded"
      @click="$router.push('/wait')"
      color="primary"
      label="Los gehts!"
    />
    <q-badge class="index__versionfield fixed-bottom-right" color="primary" transparent>v{{appVersion}}</q-badge>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      isVocabularyFileLoaded: false,
      vocabularyFilePath: '',
      appVersion: ''
    };
  },
  beforeMount() {
    this.$q.electron.ipcRenderer.on('vocabularyFileLoaded', (event, vocabularyFilePayload) => {
      this.vocabularyFilePath = vocabularyFilePayload.filePath;
      const vocabularyArray = vocabularyFilePayload.vocabulary;
      if (vocabularyArray.length > 0) {
        this.$store.commit('vocabulary/setTaskList', vocabularyArray);
        this.isVocabularyFileLoaded = true;
      }
    });
    this.$q.electron.ipcRenderer.on('statisticsFileLoaded', (event, statistics) => {
      this.$store.commit('vocabulary/setStatistics', statistics);
    });

    this.appVersion = this.$q.electron.remote.app.getVersion();
  },
  methods: {
    openVocabularyFile() {
      this.$q.electron.remote.shell.openItem(this.vocabularyFilePath);
    }
  }
};
</script>

<style>
.index__vocabulary-missing__message {
  font-weight: bold;
}

.index__vocabulary-missing__button {
  margin: 16px 0 0;
}

.index__versionfield {
  margin: 16px;
}
</style>
