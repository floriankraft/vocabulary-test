<template>
  <div>
    <q-linear-progress
      class="fixed-bottom"
      style="height: 10px"
      :value="lengthProgressBar"
    />
  </div>
</template>

<script>
const totalLengthProgressBar = 1;

export default {
  props: ['totalSeconds'],
  data() {
    return {
      lengthProgressBar: totalLengthProgressBar,
      timer: null
    };
  },
  mounted() {
    this.showCountdown();
  },
  methods: {
    showCountdown() {
      let remainingSeconds = this.totalSeconds;
      this.timer = setInterval(() => {
        if (remainingSeconds === 0) {
          this.resetCountdown();
          this.$root.$emit('task-progress-bar:finish');
          return;
        }
        remainingSeconds--;
        this.lengthProgressBar = (remainingSeconds / this.totalSeconds);
      }, 1000);
    },
    resetCountdown() {
      clearInterval(this.timer);
      this.lengthProgressBar = totalLengthProgressBar;
    }
  }
};
</script>

<style>
</style>
