<template>
  <div class="fixed-center text-h1">{{ word }}</div>
</template>

<script>
export default {
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
