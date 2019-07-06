<template>
  <q-page class="flex flex-center">
    <tasklist></tasklist>
  </q-page>
</template>

<style>
</style>

<script>
import tasklist from '../components/tasklist'

export default {
  name: 'PageIndex',
  components: {
    tasklist
  }
}
</script>
