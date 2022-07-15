import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { state, State } from "./state";
import initialDictionaryFrases from "@/constants/InitalFrases";

export enum ActionTypes {
  SetInitialFrases = "SET_INITIAL_FRASES",
  ChangeActiveFrase = "CHANGE_RANDOM_FRASE",
  FinishTyping = "FINISH_TYPING",
  StartNewTypigFrase = "StartNewTypingFrase",
  MountSpeedTrackers = "MOUNT_SPEED_TRACKERS",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.SetInitialFrases](context: ActionAugments): void;
  [ActionTypes.FinishTyping](context: ActionAugments): void;
  [ActionTypes.StartNewTypigFrase](context: ActionAugments): void;
  [ActionTypes.MountSpeedTrackers](context: ActionAugments): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SetInitialFrases]({ commit }) {
    commit(MutationType.SetFrases, initialDictionaryFrases);
    commit(MutationType.SetRandomActiveFrase, undefined);
  },
  async [ActionTypes.MountSpeedTrackers]({ commit }) {
    commit(MutationType.SetTypingCountDown, 90);
    commit(MutationType.SetCurrentCPM, 0);
    commit(MutationType.SetCurrentWPM, 0);
  },
  async [ActionTypes.FinishTyping]({ commit }) {
    commit(MutationType.SetTypingCountDown, 0);
    commit(MutationType.SetResumeOn, true);
    const typedFraseId = state.activeFraseId;
    const finalcpm = state.currentCPM;
    const finalwpm = state.currentWPM;
    commit(MutationType.SetSpeedRecordById, {
      id: typedFraseId,
      wpm: finalwpm,
      cpm: finalcpm,
    });
  },
  async [ActionTypes.StartNewTypigFrase]({ commit }) {
    commit(MutationType.SetRandomActiveFrase, undefined);
    commit(MutationType.SetResumeOn, false);
    commit(MutationType.SetCountDown, 4);
  },
};
