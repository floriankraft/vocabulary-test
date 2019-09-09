<template>
  <q-page class="flex flex-center">
    <div>
      <h1 class="text-h3">Einstellungen</h1>
      <p>Bitte tragen Sie Wörter in die Vokabel Datei ein:</p>
      <p>Pfad: {{vocabularyFilePath}}</p>
      <q-btn
        @click="openVocabularyFile"
        class="configure__button"
        color="primary"
        label="Datei öffnen"
      />
      <q-btn
        @click="logoutAndRedirect"
        class="configure__button"
        color="primary"
        icon="meeting_room"
        label="Schließen"
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
    },
    logoutAndRedirect() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
.configure__button {
  margin: 16px 20px 0 0;
}
</style>
