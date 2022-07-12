import { MutationTree } from "vuex";
import { State } from "./state";
import { v4 as uuid } from "uuid";
import { store } from ".";

export enum MutationType {
  SetFrases = "SET_FRASES",
  SetRandomActiveFrase = "SET_RANDOM_ACTIVE_FRASE",
  SetFraseSubSections = "SET_FRASE_SUBSETCTIONS",
}

export type Mutations = {
  [MutationType.SetFrases](state: State, frases: string[]): void;
  [MutationType.SetRandomActiveFrase](state: State): void;
  [MutationType.SetFraseSubSections](state: State): void;
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
};
