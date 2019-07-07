<template>
  <q-page padding>
    <q-circular-progress
      center-color="blue-grey-3"
      color="primary"
      show-value
      size="96px"
      :thickness="0.3"
      :value="timeRemainingPercent"
    />
    <tasklist />
  </q-page>
</template>

<script>
import tasklist from '../components/tasklist'

export default {
  // name: 'PageName',
  data () {
    return {
      timeRemainingPercent: 77
    }
  },
  components: {
    tasklist
  }
}
</script>

<style>
</style>
