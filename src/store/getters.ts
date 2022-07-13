import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  getFraseById(state: State): (id: string) => string;
  getFraseDataById(state: State): (id: string) => string;
  getActiveFrase(state: State): string;
  getActiveFraseArray(state: State): string[];
  getCountDown(state: State): number;
  getTypingCountDown(state: State): number;
  getWpmSetting(state: State): boolean;
  getCpmSetting(state: State): boolean;
  getCheatDeleteSetting(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  getFraseById: (state) => (id: string) => {
    return state.frases[id];
  },
  getFraseDataById: (state) => (id: string) => {
    return state.frases[id];
  },
  getActiveFrase(state) {
    return state.activeFrase;
  },
  getActiveFraseArray(state) {
    return state.activeFraseArray;
  },
  getCountDown(state) {
    return state.startCountDown;
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
