<template>
  <q-page class="flex flex-center">
    <q-btn
      class="statistics__backbutton fixed-top-left"
      color="primary"
      flat
      icon="arrow_back"
      round
      to="/start"/>
    <q-scroll-area class="fullscreen statistics__scrollarea">
      <q-timeline class="statistics__timeline" color="primary" layout="comfortable">
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
    </q-scroll-area>
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
    this.statisticEntries = this.$store.state.statistics.data.runs;
  },
  methods: {
    formatTimestamp(timestamp) {
      return dateFormatter.format(new Date(timestamp));
    }
  }
};
</script>

<style>
.statistics__backbutton {
  margin: 48px 16px;
}

.statistics__scrollarea {
  margin: 32px 0 0 60px;
}

.statistics__timeline {
  padding: 0 50px;
}

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
