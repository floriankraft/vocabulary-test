<template>
  <div>{{ word }}</div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['word'],
  computed: {
    vocabularyList: {
      get() {
        return this.$store.state.vocabulary.vocabularyList;
      }
    }
  }
};
</script>

<style>
</style>
