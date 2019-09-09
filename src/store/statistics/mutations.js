/*
export function someMutation (state) {
}
*/
import { defaults } from './state';

export const resetStore = (state) => {
  state.data = defaults.data;
};

export const setData = (state, statistics) => {
  state.data = statistics;
};
