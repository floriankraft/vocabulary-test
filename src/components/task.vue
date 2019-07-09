<template>
  <div class="fixed-center">
    <div
      class="text-h1"
      v-bind:class="readingEnabled ? '' : 'hidden'"
    >
      {{ word }}
    </div>
    <q-spinner-pie
      v-bind:class="readingEnabled || writingEnabled ? 'hidden' : ''"
      color="primary"
      size="96px"
    />
    <q-input
      autofocus
      class="task__input"
      outlined
      rounded
      v-bind:class="writingEnabled ? '' : 'hidden'"
      v-on:input="inputChange"
      v-on:keyup.enter="inputSubmit"
    />
  </div>
</template>

<script>
export default {
  props: ['readingEnabled', 'writingEnabled', 'word'],
  methods: {
    inputChange(value) {
      this.$store.commit('vocabulary/addVocabularyInput', value);
    },
    inputSubmit() {
      this.$root.$emit('task-input-submit');
    }
  }
};
</script>

<style>
.task__input {
  font-size: 32px;
}
</style>
