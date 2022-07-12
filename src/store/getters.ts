import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  getFraseById(state: State): (id: string) => string;
  getActiveFrase(state: State): string;
  getActiveFraseArray(state: State): string[];
  getCountDown(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  getFraseById: (state) => (id: string) => {
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
};
