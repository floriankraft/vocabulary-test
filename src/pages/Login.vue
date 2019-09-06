<template>
  <q-page class="flex flex-center">
    <q-btn
      class="login__backbutton fixed-top-left"
      color="primary"
      flat
      icon="arrow_back"
      round
      to="/start"/>
    <div>
      <h1 class="text-h3">Geschützter Bereich</h1>
      <p>Bitte geben Sie Ihr Passwort ein.</p>
      <q-input
        autofocus
        label="Passwort"
        stack-label
        type="password"
        v-model="inputPassword"
      />
      <q-btn
        @click="login"
        color="primary"
        label="Anmelden"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      inputPassword: ''
    };
  },
  beforeMount() {
    this.$q.electron.ipcRenderer.on('backendHasValidatedLogin', (event, loginSuccessful) => {
      if (loginSuccessful) {
        this.$router.push('/configure');
      } else {
        // TODO: Show error message
      }
    });
  },
  methods: {
    login() {
      this.$q.electron.ipcRenderer.send('frontendIsTryingToLogin', {
        password: this.inputPassword
      });
    }
  }
};
</script>

<style>
.login__backbutton {
  margin: 48px 16px;
}
</style>
