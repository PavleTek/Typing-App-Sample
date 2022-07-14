export type speedLog = {
  wpm: number;
  cpm: number;
};

export type State = {
  //  frase info
  frases: { [frasesId: string]: string };
  speedLogs: { [fraseId: string]: speedLog };
  activeFrase: string;
  activeFraseId: string;
  activeFraseArray: string[];
  //  countdown that defines most functionality
  startCountDown: number;
  //  typing on which also defines app functionality
  typingOn: boolean;
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
  speedLogs: {},
  activeFrase: "",
  activeFraseId: "",
  activeFraseArray: [],
  //  countdown that defines most functionality
  startCountDown: -1,
  //  typing on which also defines app functionality
  typingOn: false,
  //  speed measurement
  typingCountDown: 0,
  currentWPM: 0,
  currentCPM: 0,
  //  app settings
  wpmSpeedMeasure: true,
  cpmSpeedMeasure: false,
  cheatDelete: false,
};
