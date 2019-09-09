<template>
  <q-page class="flex flex-center">
    <div class="welcome__container">
      <h1 class="text-h3">Willkommen!</h1>
      <p>Es sieht so aus, als wären Sie das erste Mal hier. Bitte vergeben Sie ein Passwort, da Sie damit den Zugriff
        auf die Einstellungen in dieser Anwendung schützen.</p>
      <q-input
        autofocus
        class="welcome__input"
        label="Passwort"
        ref="inputPassword"
        :rules="[validatePasswordNotBlank]"
        stack-label
        type="password"
        v-model="inputPassword"
      />
      <q-input
        class="welcome__input"
        label="Passwort Wiederholung"
        ref="inputPasswordRepetition"
        :rules="[validatePasswordEquality]"
        stack-label
        type="password"
        v-model="inputPasswordRepetition"
      />
      <q-btn
        class="welcome__submit"
        @click="submitPassword"
        color="primary"
        label="Weiter"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      inputPassword: '',
      inputPasswordRepetition: ''
    };
  },
  beforeMount() {
    this.$q.electron.ipcRenderer.on('backendHasSavedPassword', this.onBackendHasSavedPassword);
  },
  methods: {
    validatePasswordNotBlank(value) {
      return new Promise((resolve) => {
        resolve((value && value.length > 0) || 'Das Passwort darf nicht leer sein.');
      });
    },
    validatePasswordEquality() {
      return new Promise((resolve) => {
        resolve(this.inputPassword === this.inputPasswordRepetition || 'Die Passwörter stimmen nicht überein.');
      });
    },
    submitPassword() {
      this.$refs.inputPassword.validate();
      this.$refs.inputPasswordRepetition.validate();

      if (!this.$refs.inputPassword.hasError && !this.$refs.inputPasswordRepetition.hasError) {
        this.$q.electron.ipcRenderer.send('frontendHasNewPassword', {
          password: this.inputPassword
        });
      }
    },
    onBackendHasSavedPassword() {
      this.$router.push('/');
    }
  },
  beforeDestroy() {
    this.$q.electron.ipcRenderer.removeListener('backendHasSavedPassword', this.onBackendHasSavedPassword);
  }
};
</script>

<style>
.welcome__container {
  margin: 50px;
}

.welcome__input {
  width: 300px;
}

.welcome__submit {
  margin: 25px 0;
}
</style>
