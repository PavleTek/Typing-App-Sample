export type Frase = {
  frase: string;
  wpm: number;
  cpm: number;
};

export type State = {
  frases: { [frasesId: string]: Frase };
  activeFrase: string;
  activeFraseId: string;
  activeFraseArray: string[];
  startCountDown: number;
  typingCountDown: number;
  currentWPM: number;
  currentCPM: number;
  wpm: boolean;
};

export const state: State = {
  frases: {},
  activeFrase: "",
  activeFraseId: "",
  activeFraseArray: [],
  startCountDown: -1,
  typingCountDown: 0,
  currentWPM: 0,
  currentCPM: 0,
  wpm: true,
};
