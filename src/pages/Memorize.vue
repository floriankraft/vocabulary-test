<template>
  <q-page class="flex flex-center">
    <q-spinner-pie
      color="primary"
      size="96px"
    />
    <task-progress-bar :totalSeconds="1" />
  </q-page>
</template>

<script>
import taskProgressBar from '../components/taskProgressBar';

export default {
  mounted() {
    this.$root.$on('task-progress-bar:finish', () => {
      this.$router.push('/write');
    });
  },
  beforeDestroy() {
    this.$root.$off('task-progress-bar:finish');
  },
  components: {
    taskProgressBar
  }
};
</script>

<style>
</style>
