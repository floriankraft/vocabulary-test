/*
export function someMutation (state) {
}
*/
export const setFilePath = (state, path) => {
  state.filePath = path;
};

export const setTaskList = (state, words) => {
  state.taskList = words;
};

export const setInputListItem = (state, payload) => {
  const index = payload.index;
  const word = payload.word;
  if (index >= 0) {
    while (state.inputList.length <= index) {
      state.inputList.push('');
    }
    state.inputList[index] = word;
  }
};

export const increaseCurrentIndex = (state) => {
  state.currentIndex++;
};

export const increaseCorrectWordCount = (state) => {
  state.correctWordCount++;
};

export const setStatistics = (state, statistics) => {
  state.statistics = statistics;
};
