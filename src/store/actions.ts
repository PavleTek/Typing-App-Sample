import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { state, State } from "./state";
import initialDictionaryFrases from "@/constants/InitalFrases";
import { store } from ".";

export enum ActionTypes {
  SetInitialFrases = "SET_INITIAL_FRASES",
  ChangeActiveFrase = "CHANGE_RANDOM_FRASE",
  FinishTyping = "FINISH_TYPING",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.SetInitialFrases](context: ActionAugments): void;
  [ActionTypes.ChangeActiveFrase](context: ActionAugments): void;
  [ActionTypes.FinishTyping](context: ActionAugments): void;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SetInitialFrases]({ commit }) {
    commit(MutationType.SetFrases, initialDictionaryFrases);
    commit(MutationType.SetRandomActiveFrase, undefined);
    commit(MutationType.SetFraseSubSections, undefined);
  },
  async [ActionTypes.ChangeActiveFrase]({ commit }) {
    commit(MutationType.SetRandomActiveFrase, undefined);
  },
  async [ActionTypes.FinishTyping]({ commit }) {
    const typedFraseId = state.activeFraseId;
    const finalcpm = state.currentCPM;
    const finalwpm = state.currentWPM;
    commit(MutationType.SetSpeedRecordById, {
      id: typedFraseId,
      wpm: finalwpm,
      cpm: finalcpm,
    });
  },
};
