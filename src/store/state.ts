export type State = {
  frases: { [frasesId: string]: string };
  activeFrase: string;
  activeFraseId: string;
  activeFraseArray: string[];
  startCountDown: number;
  typingOn: boolean;
};

export const state: State = {
  frases: {},
  activeFrase: "",
  activeFraseId: "",
  activeFraseArray: [],
  startCountDown: -1,
  typingOn: false,
};
