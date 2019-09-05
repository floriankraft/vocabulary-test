<template>
  <q-page class="flex flex-center">
    <div>
      <h1 class="text-h3">Die Vokabel Datei ist leer.</h1>
      <p>Bitte tragen Sie Wörter in die Vokabel Datei ein:</p>
      <p>Pfad: {{vocabularyFilePath}}</p>
      <q-btn
        @click="openVocabularyFile"
        class="init__button"
        color="primary"
        label="Datei öffnen"
      />
      <q-btn
        @click="$router.push('/')"
        class="init__button"
        color="primary"
        icon="refresh"
        label="Neu laden"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      vocabularyFilePath: ''
    };
  },
  beforeMount() {
    this.vocabularyFilePath = this.$store.state.vocabulary.filePath;
  },
  methods: {
    openVocabularyFile() {
      this.$q.electron.remote.shell.openItem(this.vocabularyFilePath);
    }
  }
};
</script>

<style>
.init__button {
  margin: 16px 20px 0 0;
}
</style>
