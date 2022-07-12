export type State = {
  frases: { [frasesId: string]: string };
  activeFrase: string;
  activeFraseId: string;
  activeFraseArray: string[];
  countDownOn: boolean;
};

export const state: State = {
  frases: {},
  activeFrase: "",
  activeFraseId: "",
  activeFraseArray: [],
  countDownOn: false,
};
