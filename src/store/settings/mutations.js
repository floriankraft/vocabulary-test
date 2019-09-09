/*
export function someMutation (state) {
}
*/
import { defaults } from './state';

export const resetStore = (state) => {
  state.isPasswordExisting = defaults.isPasswordExisting;
};

export const setIsPasswordExisting = (state, isExisting) => {
  state.isPasswordExisting = isExisting;
};
