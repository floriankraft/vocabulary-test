<template>
  <div>
    <task :word="vocabularyList[0]" />
    <q-circular-progress
      center-color="blue-grey-3"
      color="primary"
      reverse
      show-value
      size="96px"
      :thickness="0.3"
      :value="timeRemainingPercent"
    >{{ timeRemainingSeconds }}</q-circular-progress>
  </div>
</template>

<script>
import task from '../components/task'

export default {
  data () {
    return {
      totalTimePercent: 100,
      totalTimeSeconds: 10,
      timeRemainingPercent: 100,
      timeRemainingSeconds: 10
    }
  },
  computed: {
    vocabularyList: {
      get () {
        return this.$store.state.vocabulary.vocabularyList
      }
    }
  },
  components: {
    task
  }
}
</script>

<style>
</style>
