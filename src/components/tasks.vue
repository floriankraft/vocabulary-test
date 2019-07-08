<template>
  <div class="fullscreen">
    <task :word="currentWord" />
    <q-linear-progress class="fixed-bottom" style="height: 10px" :value="remainingTimeRelative" />
  </div>
</template>

<script>
import task from '../components/task';

export default {
  data() {
    return {
      vocabularyList: [],
      currentWord: '',
      totalTimeRelative: 1,
      totalTimeSeconds: 10,
      remainingTimeRelative: 1,
      remainingTimeSeconds: 10
    };
  },
  mounted() {
    this.vocabularyList = this.$store.state.vocabulary.vocabularyList;
    this.currentWord = this.vocabularyList[0];
    const timer = setInterval(() => {
      this.remainingTimeSeconds--;
      this.remainingTimeRelative = (this.remainingTimeSeconds / this.totalTimeSeconds) * this.totalTimeRelative;
      if (this.remainingTimeSeconds === 0) {
        clearInterval(timer);
        // TODO: Do something, so that user can input a word.
        // Maybe put input component here as well and work with visibility attribute, which we are setting dynamically.
      }
    }, 1000);
  },
  components: {
    task
  }
};
</script>

<style>
</style>
