<template>
  <q-page class="flex flex-center">
    Evaluate
    <q-btn
      @click="$router.push('/wait')"
      color="primary"
      label="Next word"
    />
  </q-page>
</template>

<script>
export default {
  mounted() {
    const test = this.$store.state.vocabulary.inputList;
    console.log(test);
    this.$store.commit('vocabulary/increaseCurrentIndex');
  }
};
</script>

<style>
</style>
