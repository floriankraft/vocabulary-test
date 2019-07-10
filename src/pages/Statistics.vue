<template>
  <q-page class="flex flex-center">
    <q-timeline color="primary" layout="comfortable">
      <q-timeline-entry
        v-for="(entry, index) in statisticEntries"
        :key="index"
        :subtitle="formatTimestamp(entry.timestamp)"
      >
        <q-rating
          color="amber"
          :max="entry.maxRating"
          readonly
          size="32px"
          :value="entry.actualRating"
        />
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script>
const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

export default {
  data() {
    return {
      statisticEntries: []
    };
  },
  mounted() {
    this.statisticEntries = this.$store.state.vocabulary.statistics.runs;
  },
  methods: {
    formatTimestamp(timestamp) {
      return dateFormatter.format(new Date(timestamp));
    }
  }
};
</script>

<style>
.q-timeline--comfortable .q-timeline__subtitle {
  padding-top: 7px;
}

.q-timeline__dot {
  top: 7px;
}

.q-timeline__title {
  display: none;
}
</style>
