export type State = {
  frases: { [frasesId: string]: string };
  activeFrase: string;
  activeFraseId: string;
  activeFraseArray: string[];
  startCountDown: number;
  typingCountDown: number;
  wpm: boolean;
};

export const state: State = {
  frases: {},
  activeFrase: "",
  activeFraseId: "",
  activeFraseArray: [],
  startCountDown: -1,
  typingCountDown: 0,
  wpm: true,
};
