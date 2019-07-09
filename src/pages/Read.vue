<template>
  <q-page class="flex flex-center">
    <div class="text-h1">
      {{ vocabularyTaskList[vocabularyCurrentIndex] }}
    </div>
    <task-progress-bar :totalSeconds="1" />
  </q-page>
</template>

<script>
import taskProgressBar from '../components/taskProgressBar';

export default {
  data() {
    return {
      vocabularyTaskList: [],
      vocabularyCurrentIndex: 0
    };
  },
  mounted() {
    this.$root.$on('task-progress-bar:finish', () => {
      console.log('progress bar finished');
      this.$router.push('/memorize');
    });

    this.vocabularyTaskList = this.$store.state.vocabulary.taskList;
    this.vocabularyCurrentIndex = this.$store.state.vocabulary.currentIndex;
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
