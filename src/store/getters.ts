import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  getFraseById(state: State): (id: string) => string;
  getActiveFrase(state: State): string;
  getActiveFraseArray(state: State): string[];
  getCountDownOn(state: State): boolean;
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
  getCountDownOn(state) {
    return state.countDownOn;
  },
};
