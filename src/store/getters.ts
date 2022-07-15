import { GetterTree } from "vuex";
import { speedLog, State } from "./state";

export type Getters = {
  getFraseById(state: State): (id: string) => string;
  getFraseSpeedLogById(state: State): (id: string) => speedLog;
  getAverageSpeedWpm(state: State): number;
  getAverageSpeedCpm(state: State): number;
  getActiveFrase(state: State): string;
  getActiveFraseId(state: State): string;
  getActiveFraseArray(state: State): string[];
  // countDowns and functionality managers
  getResumeOn(state: State): boolean;
  getCountDown(state: State): number;
  getTypingCountDown(state: State): number;
  // settings
  getWpmSetting(state: State): boolean;
  getCpmSetting(state: State): boolean;
  getCheatDeleteSetting(state: State): boolean;
  // speedData
};

export const getters: GetterTree<State, State> & Getters = {
  getFraseById: (state) => (id: string) => {
    return state.frases[id];
  },
  getFraseSpeedLogById: (state) => (id: string) => {
    return state.speedLogs[id];
  },
  getAverageSpeedWpm(state) {
    const stateSpeedLogsCopy: { [fraseId: string]: speedLog } = state.speedLogs;
    let speedSum = 0;
    Object.keys(stateSpeedLogsCopy).forEach((key: string) => {
      speedSum += stateSpeedLogsCopy[key].wpm;
    });
    return speedSum / Object.values(stateSpeedLogsCopy).length;
  },
  getAverageSpeedCpm(state) {
    const stateSpeedLogsCopy: { [fraseId: string]: speedLog } = state.speedLogs;
    let speedSum = 0;
    Object.keys(stateSpeedLogsCopy).forEach((key: string) => {
      speedSum += stateSpeedLogsCopy[key].cpm;
    });
    return speedSum / Object.values(stateSpeedLogsCopy).length;
  },
  getActiveFrase(state) {
    return state.activeFrase;
  },
  getActiveFraseId(state) {
    return state.activeFraseId;
  },
  getActiveFraseArray(state) {
    return state.activeFraseArray;
  },
  getCountDown(state) {
    return state.startCountDown;
  },
  getResumeOn(state) {
    return state.resumeOn;
  },
  getTypingCountDown(state) {
    return state.typingCountDown;
  },
  getWpmSetting(state) {
    return state.wpmSpeedMeasure;
  },
  getCpmSetting(state) {
    return state.cpmSpeedMeasure;
  },
  getCheatDeleteSetting(state) {
    return state.cheatDelete;
  },
};
