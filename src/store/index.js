import Vue from 'vue';
import Vuex from 'vuex';

// we first import the module
import statistics from './statistics';
import vocabulary from './vocabulary';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      statistics,
      vocabulary
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
