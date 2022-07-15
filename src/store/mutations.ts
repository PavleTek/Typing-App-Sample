import { MutationTree } from "vuex";
import { speedLog, State } from "./state";
import { v4 as uuid } from "uuid";
import { store } from ".";

export enum MutationType {
  SetFrases = "SET_FRASES",
  SetRandomActiveFrase = "SET_RANDOM_ACTIVE_FRASE",
  SetCountDown = "SET_COUNT_DOWN",
  SetTypingCountDown = "SET_TYPING_COUNT_DOWN",
  SetResumeOn = "SET_RESUME_ON",
  SetWpmSpeedMeasure = "SET_WPM_SPEED_MEASURE",
  SetCpmSpeedMeasure = "SET_CPM_SPEED_MEASURE",
  SetCheatDelete = "TOGGLE_SPEED_DELETE",
  SetCurrentWPM = "SET_CURRENT_WPM",
  SetCurrentCPM = "SET_CURRENT_CPM",
  SetSpeedRecordById = "SET_SPEED_RECORD_BY_ID",
}

export type Mutations = {
  [MutationType.SetFrases](state: State, frases: string[]): void;
  [MutationType.SetRandomActiveFrase](state: State): void;
  [MutationType.SetCountDown](state: State, number: number): void;
  [MutationType.SetTypingCountDown](state: State, number: number): void;
  [MutationType.SetWpmSpeedMeasure](state: State, value: boolean): void;
  [MutationType.SetCpmSpeedMeasure](state: State, value: boolean): void;
  [MutationType.SetCheatDelete](state: State, value: boolean): void;
  [MutationType.SetResumeOn](state: State, value: boolean): void;
  [MutationType.SetCurrentWPM](state: State, number: number): void;
  [MutationType.SetCurrentCPM](state: State, number: number): void;
  [MutationType.SetSpeedRecordById](
    state: State,
    value: { id: string; wpm: number; cpm: number }
  ): void;
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
    state.activeFraseArray = activeFrase.split("");
  },
  [MutationType.SetCountDown](state, number) {
    state.startCountDown = number;
  },
  [MutationType.SetTypingCountDown](state, number) {
    state.typingCountDown = number;
  },
  [MutationType.SetWpmSpeedMeasure](state, value) {
    state.wpmSpeedMeasure = value;
  },
  [MutationType.SetCpmSpeedMeasure](state, value) {
    state.cpmSpeedMeasure = value;
  },
  [MutationType.SetCheatDelete](state, value) {
    state.cheatDelete = value;
  },
  [MutationType.SetResumeOn](state, value) {
    state.resumeOn = value;
  },
  [MutationType.SetCurrentWPM](state, number) {
    state.currentWPM = number;
  },
  [MutationType.SetCurrentCPM](state, number) {
    state.currentCPM = number;
  },
  [MutationType.SetCurrentCPM](state, number) {
    state.currentCPM = number;
  },
  [MutationType.SetSpeedRecordById](state, value) {
    const stateSpeedLogsCopy = state.speedLogs;
    const activeFraseSpeedLog: speedLog = { wpm: value.wpm, cpm: value.cpm };
    stateSpeedLogsCopy[value.id] = activeFraseSpeedLog;
    state.speedLogs = stateSpeedLogsCopy;
  },
};
