import { MutationTree } from "vuex";
import { State } from "./state";
import { v4 as uuid } from "uuid";
import { store } from ".";

export enum MutationType {
  SetFrases = "SET_FRASES",
  SetRandomActiveFrase = "SET_RANDOM_ACTIVE_FRASE",
  SetFraseSubSections = "SET_FRASE_SUBSETCTIONS",
  SetCountDown = "SET_COUNT_DOWN",
  SetTypingCountDown = "SET_TYPING_COUNT_DOWN",
  SetSpeedMeasure = "TOGGLE_SPEED_MEASURE",
  SetCheatDelete = "TOGGLE_SPEED_DELETE",
  SetCurrentWPM = "SET_CURRENT_WPM",
  SetCurrentCPM = "SET_CURRENT_CPM",
}

export type Mutations = {
  [MutationType.SetFrases](state: State, frases: string[]): void;
  [MutationType.SetRandomActiveFrase](state: State): void;
  [MutationType.SetFraseSubSections](state: State): void;
  [MutationType.SetCountDown](state: State, number: number): void;
  [MutationType.SetTypingCountDown](state: State, number: number): void;
  [MutationType.SetSpeedMeasure](state: State, value: boolean): void;
  [MutationType.SetCheatDelete](state: State, value: boolean): void;
  [MutationType.SetCurrentWPM](state: State, number: number): void;
  [MutationType.SetCurrentCPM](state: State, number: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetFrases](state, frases) {
    const stateFrasesCopy = state.frases;
    frases.forEach((frase: string) => {
      const newFraseId = uuid();
      stateFrasesCopy[newFraseId] = frase;
    });
    state.frases = stateFrasesCopy;
  },
  [MutationType.SetRandomActiveFrase](state) {
    const frases = Object.keys(state.frases);
    let activeFrase = state.activeFrase;
    let activeFraseId = "";
    while (activeFrase === state.activeFrase) {
      activeFraseId = frases[Math.floor(Math.random() * frases.length)];
      activeFrase = state.frases[activeFraseId];
    }
    state.activeFraseId = activeFraseId;
    state.activeFrase = activeFrase;
  },
  [MutationType.SetFraseSubSections](state) {
    const activeFraseArray = state.activeFrase.split("");
    state.activeFraseArray = activeFraseArray;
  },
  [MutationType.SetCountDown](state, number) {
    state.startCountDown = number;
  },
  [MutationType.SetTypingCountDown](state, number) {
    state.typingCountDown = number;
  },
  [MutationType.SetSpeedMeasure](state, value) {
    state.wpmSpeedMeasure = value;
  },
  [MutationType.SetCheatDelete](state, value) {
    state.cheatDelete = value;
  },
  [MutationType.SetCurrentWPM](state, number) {
    state.currentWPM = number;
  },
  [MutationType.SetCurrentCPM](state, number) {
    state.currentCPM = number;
  },
};
