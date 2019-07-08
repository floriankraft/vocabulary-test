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
export default {
  // name: 'PageName',
  data() {
    return {
      totalTimePercent: 100,
      totalTimeSeconds: 3,
      timeRemainingPercent: 100,
      timeRemainingSeconds: 3
    };
  },
  mounted() {
    const timer = setInterval(() => {
      this.timeRemainingSeconds--;
      this.timeRemainingPercent = (this.timeRemainingSeconds / this.totalTimeSeconds) * this.totalTimePercent;
      if (this.timeRemainingSeconds === 0) {
        clearInterval(timer);
        this.$router.push('/tasks');
      }
    }, 1000);
  }
};
</script>

<style>
</style>
