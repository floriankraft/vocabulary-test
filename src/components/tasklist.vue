<template>
  <ul class="tasklist">
    <li class="taskbox--hidden" v-for="word in words" :key="word">
      Wort: <span class="taskbox__word">{{ word }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    words: {
      get () {
        return this.$store.state.vocabulary.vocabularyList
      }
    }
  }
}
</script>

<style>
</style>
