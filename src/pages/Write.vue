<template>
  <q-page class="flex flex-center">
    <q-input
      autofocus
      class="task__input"
      outlined
      rounded
      v-model="currentInput"
      v-on:keyup.enter="inputSubmit"
    />
    <task-progress-bar :totalSeconds="30" />
  </q-page>
</template>

<script>
import taskProgressBar from '../components/taskProgressBar';

export default {
  data() {
    return {
      currentInput: '',
      vocabularyCurrentIndex: 0
    };
  },
  methods: {
    inputSubmit() {
      this.$router.push('/evaluate');
    }
  },
  mounted() {
    this.$root.$on('task-progress-bar:finish', () => {
      this.$router.push('/evaluate');
    });

    this.vocabularyCurrentIndex = this.$store.state.vocabulary.currentIndex;
  },
  beforeDestroy() {
    this.$root.$off('task-progress-bar:finish');
    this.$store.commit('vocabulary/setInputListItem', {
      index: this.vocabularyCurrentIndex,
      word: this.currentInput
    });
  },
  components: {
    taskProgressBar
  }
};
</script>

<style>
.task__input {
  font-size: 32px;
}
</style>
