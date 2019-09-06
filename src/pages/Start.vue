<template>
  <q-page class="flex flex-center">
    <q-btn
      class="start__configbutton fixed-top-right"
      color="primary"
      flat
      icon="build"
      round
      to="/login"
    />
    <q-btn
      color="primary"
      :disable="isAppNotConfigured"
      label="Los gehts!"
      to="/wait"
    />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      isAppNotConfigured: true
    };
  },
  beforeMount() {
    this.isAppNotConfigured = this.$store.state.vocabulary.taskList.length === 0;
  }
};
</script>

<style>
.start__configbutton {
  margin: 48px 16px;
}
</style>
