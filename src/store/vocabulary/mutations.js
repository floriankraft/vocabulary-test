/*
export function someMutation (state) {
}
*/
export const createVocabularyTaskList = (state, words) => {
  state.vocabularyTaskList = words;
};

export const addVocabularyInput = (state, word) => {
  state.vocabularyInputList.push(word);
};
