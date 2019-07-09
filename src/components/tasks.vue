<template>
  <div class="fullscreen">
    <task
      :readingEnabled="modeReading"
      :writingEnabled="modeWriting"
      :word="vocabularyList[currentWordIndex]"
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
      vocabularyList: [],
      currentWordIndex: 0,
      modeReading: true,
      modeWriting: false,
      lengthProgressBar: totalLengthProgressBar,
      timer: null
    };
  },
  methods: {
    resetCountdown() {
      clearInterval(this.timer);
      this.lengthProgressBar = totalLengthProgressBar;
    },
    showCountdown(totalSeconds, callback) {
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
    this.$root.$on('timer-stop', () => {
      this.resetCountdown();
      this.startEvaluationPhase();
    });

    this.vocabularyList = this.$store.state.vocabulary.vocabularyList;
    this.startNewWordTask();
  },
  components: {
    task
  }
};
</script>

<style>
</style>
