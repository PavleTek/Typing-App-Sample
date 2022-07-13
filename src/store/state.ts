export type State = {
  //  frase info
  frases: { [frasesId: string]: string };
  activeFrase: string;
  activeFraseId: string;
  activeFraseArray: string[];
  //  countdown that defines most functionality
  startCountDown: number;
  //  speed measurement
  typingCountDown: number;
  currentWPM: number;
  currentCPM: number;
  //  app settings
  wpmSpeedMeasure: boolean;
  cpmSpeedMeasure: boolean;
  cheatDelete: boolean;
};

export const state: State = {
  //  frase info
  frases: {},
  activeFrase: "",
  activeFraseId: "",
  activeFraseArray: [],
  //  countdown that defines most functionality
  startCountDown: -1,
  //  speed measurement
  typingCountDown: 0,
  currentWPM: 0,
  currentCPM: 0,
  //  app settings
  wpmSpeedMeasure: true,
  cpmSpeedMeasure: false,
  cheatDelete: false,
};
