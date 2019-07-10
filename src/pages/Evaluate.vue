<template>
  <q-page class="flex flex-center column">
    <div class="flex column">
      <div class="flex evaluate__item">
        <q-icon class="evaluate__type-icon" name="visibility" size="64px" />
        <div class="text-h1">
          {{ vocabularyCurrentTask }}
        </div>
      </div>
      <div class="flex evaluate__item" :class="isCorrect ? 'evaluate__item--correct' : 'evaluate__item--incorrect'">
        <q-icon class="evaluate__type-icon" name="edit" size="64px" />
        <div class="text-h1">
          {{ vocabularyCurrentInput }}
        </div>
        <q-icon class="evaluate__status-icon" name="check" size="64px" v-if="isCorrect" />
        <q-icon class="evaluate__status-icon" name="close" size="64px" v-if="!isCorrect" />
      </div>
    </div>
    <q-btn
      @click="buttonClick"
      color="primary"
      :label="isLastWord ? 'Fertig!' : 'Weiter gehts!'"
    />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      vocabularyCurrentTask: '',
      vocabularyCurrentInput: '',
      isLastWord: false
    };
  },
  computed: {
    isCorrect() {
      return this.vocabularyCurrentTask === this.vocabularyCurrentInput;
    }
  },
  mounted() {
    this.vocabularyCurrentTask = this.$store.state.vocabulary.taskList[this.$store.state.vocabulary.currentIndex];
    this.vocabularyCurrentInput = this.$store.state.vocabulary.inputList[this.$store.state.vocabulary.currentIndex];
    this.isLastWord = this.$store.state.vocabulary.taskList.length === this.$store.state.vocabulary.currentIndex + 1;
    if (this.isLastWord) {
      this.saveStatistics();
    } else {
      this.$store.commit('vocabulary/increaseCurrentIndex');
    }
  },
  methods: {
    saveStatistics() {
      console.log('saving');
    },
    buttonClick() {
      if (this.isLastWord) {
        this.$router.push('/statistics');
      } else {
        this.$router.push('/wait');
      }
    }
  }
};
</script>

<style lang="stylus">
.evaluate__item {
  margin: 0 0 20px;
}

.evaluate__type-icon {
  margin: 20px 30px 0 0;
}

.evaluate__status-icon {
  margin: 20px 0 0 30px;
}

.evaluate__item--correct {
  color: $positive;
}

.evaluate__item--incorrect {
  color: $negative;
}
</style>
