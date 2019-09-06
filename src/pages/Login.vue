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
      />
    </div>
  </q-page>
</template>

<script>
export default {
};
</script>

<style>
.login__backbutton {
  margin: 48px 16px;
}
</style>
