import { GetterTree } from "vuex";
import { Frase, State } from "./state";

export type Getters = {
  getFraseById(state: State): (id: string) => string;
  getFraseDataById(state: State): (id: string) => Frase;
  getActiveFrase(state: State): string;
  getActiveFraseArray(state: State): string[];
  getCountDown(state: State): number;
  getTypingCountDown(state: State): number;
  getWpm(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  getFraseById: (state) => (id: string) => {
    return state.frases[id].frase;
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
  getWpm(state) {
    return state.wpm;
  },
};
