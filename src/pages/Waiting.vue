<template>
  <q-page class="flex flex-center">
    <q-circular-progress
      center-color="blue-grey-3"
      color="primary"
      reverse
      show-value
      size="96px"
      :thickness="0.3"
      :value="timeRemainingPercent"
    >{{ timeRemainingSeconds }}</q-circular-progress>
  </q-page>
</template>

<script>
const totalTimePercent = 100;
const totalTimeSeconds = 3;

export default {
  // name: 'PageName',
  data() {
    return {
      timeRemainingPercent: totalTimePercent,
      timeRemainingSeconds: totalTimeSeconds
    };
  },
  mounted() {
    const timer = setInterval(() => {
      if (this.timeRemainingSeconds === 0) {
        clearInterval(timer);
        this.$router.push('/tasks');
        return;
      }
      this.timeRemainingSeconds--;
      this.timeRemainingPercent = (this.timeRemainingSeconds / totalTimeSeconds) * totalTimePercent;
    }, 1000);
  }
};
</script>

<style>
</style>
