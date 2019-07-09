<template>
  <div class="fullscreen">
    <task
      :readingEnabled="modeReading"
      :writingEnabled="modeWriting"
      :word="vocabularyTaskList[currentWordIndex]"
    />
    <q-linear-progress
      class="fixed-bottom"
      style="height: 10px"
      :value="lengthProgressBar"
    />
  </div>
</template>

<script>
import task from '../components/task';

const totalLengthProgressBar = 1;

export default {
  data() {
    return {
      vocabularyTaskList: [],
      currentWordIndex: 0,
      modeReading: true,
      modeWriting: false,
      lengthProgressBar: totalLengthProgressBar,
      timer: null,
      isTimerReset: false
    };
  },
  methods: {
    resetCountdown() {
      if (!this.isTimerReset) {
        this.isTimerReset = true;
        clearInterval(this.timer);
        this.lengthProgressBar = totalLengthProgressBar;
      }
    },
    showCountdown(totalSeconds, callback) {
      this.isTimerReset = false;
      let remainingSeconds = totalSeconds;
      this.timer = setInterval(() => {
        if (remainingSeconds === 0) {
          this.resetCountdown();
          callback();
          return;
        }
        remainingSeconds--;
        this.lengthProgressBar = (remainingSeconds / totalSeconds);
      }, 1000);
    },
    startEvaluationPhase() {
      console.log('evaluation phase');
    },
    startWritingPhase() {
      // Invoked, when the user presses Enter in the input field. See: src/components/task.vue
      this.$root.$on('task-input-submit', () => {
        this.resetCountdown();
        this.startEvaluationPhase();
      });

      this.modeWriting = true;
      this.showCountdown(10, this.startEvaluationPhase);
    },
    startWaitingPhase() {
      this.modeReading = false;
      this.showCountdown(3, this.startWritingPhase);
    },
    startReadingPhase() {
      this.showCountdown(3, this.startWaitingPhase);
    },
    startNewWordTask() {
      this.startReadingPhase();
    }
  },
  mounted() {
    this.vocabularyTaskList = this.$store.state.vocabulary.vocabularyTaskList;
    this.startNewWordTask();
  },
  components: {
    task
  }
};
</script>

<style>
</style>
