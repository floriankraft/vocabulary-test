/*
export function someMutation (state) {
}
*/
export const setPasswordHash = (state, passwordHash) => {
  state.pw.hash = passwordHash;
};

export const setPasswordSalt = (state, passwordSalt) => {
  state.pw.salt = passwordSalt;
};
