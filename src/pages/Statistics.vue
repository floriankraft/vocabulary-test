<template>
  <q-page class="flex flex-center">
    <q-rating
      color="amber"
      :max="maxRating"
      readonly
      size="32px"
      :value="actualRating"
    />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      maxRating: 8,
      actualRating: 6
    };
  },
  mounted() {
    // const vocabularyTaskList = this.$store.state.vocabulary.taskList;
    // const vocabularyInputList = this.$store.state.vocabulary.inputList;
  }
};
</script>

<style>
</style>
