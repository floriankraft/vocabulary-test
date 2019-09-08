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
        error-message="Das Passwort ist nicht korrekt."
        :error="!isLoginValid"
        label="Passwort"
        ref="inputPassword"
        stack-label
        type="password"
        v-model="inputPassword"
      />
      <q-btn
        @click="login"
        class="login__submit"
        color="primary"
        :loading="isLoginInProgress"
        label="Anmelden"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      inputPassword: '',
      isLoginInProgress: false,
      isLoginValid: true
    };
  },
  beforeMount() {
    this.$q.electron.ipcRenderer.on('backendHasValidatedLogin', (event, loginSuccessful) => {
      if (loginSuccessful) {
        this.$router.push('/configure');
      } else {
        this.isLoginValid = false;
        this.isLoginInProgress = false;
      }
    });
  },
  methods: {
    login() {
      this.isLoginInProgress = true;
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

.login__submit {
  margin: 24px 0 0;
}
</style>
