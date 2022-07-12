export type State = {
  frases: { [frasesId: string]: string };
  activeFrase: string;
  alreadyTyped: string;
  currentlyBeingTypedWord: string;
  notTypedYet: string;
  fraseArrayAttempt: string[];
};

export const state: State = {
  frases: {},
  activeFrase: '',
  alreadyTyped: '',
  currentlyBeingTypedWord: '',
  notTypedYet: '',
  fraseArrayAttempt: [],
};
