<template>
  <q-page class="flex flex-center">
    <q-circular-progress
      center-color="blue-grey-3"
      color="primary"
      show-value
      size="96px"
      :thickness="0.3"
      :value="timeRemainingPercent"
    />
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      timeRemainingPercent: 77
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style>
</style>
