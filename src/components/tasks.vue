<template>
  <div class="fullscreen">
    <task :word="vocabularyList[0]" />
    <q-linear-progress :value="0.28" class="fixed-bottom" />
  </div>
</template>

<script>
import task from '../components/task';

export default {
  data() {
    return {
      vocabularyList: []
    };
  },
  mounted() {
    this.vocabularyList = this.$store.state.vocabulary.vocabularyList;
  },
  components: {
    task
  }
};
</script>

<style>
</style>
