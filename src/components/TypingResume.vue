<script lang="ts">
import { ActionTypes } from "@/store/actions";
import { MutationType } from "@/store/mutations";
import {
  stringTypeAnnotation,
  tsConstructSignatureDeclaration,
} from "@babel/types";
import { computed, defineComponent, onMounted } from "vue";
import { store, useStore } from "../store";

export default defineComponent({
  components: {},
  props: {},
  setup() {
    const store = useStore();
    function startNewFrase() {
      store.dispatch(ActionTypes.StartNewTypigFrase);
    }
    const typedFraseId = computed(() => store.getters.getActiveFraseId);
    const typedFrase = computed(() => store.getters.getActiveFrase);
    const currentSpeedLog = computed(() =>
      store.getters.getFraseSpeedLogById(typedFraseId.value)
    );
    const wpmSpeedMeasure = computed(() => store.getters.getWpmSetting);
    const averageWpm = computed(() => store.getters.getAverageSpeedWpm);
    const averageCpm = computed(() => store.getters.getAverageSpeedCpm);
    return {
      startNewFrase,
      typedFrase,
      currentSpeedLog,
      wpmSpeedMeasure,
      averageWpm,
      averageCpm,
    };
  },
});
</script>

<template>
  <div class="resume-container">
    <div class="typed-frase two-padding-margin">{{ typedFrase }}</div>
    <div v-if="wpmSpeedMeasure" class="two-padding-margin">
      <span>you typed at {{ currentSpeedLog.wpm }} Word per minute</span>
      <span>your average speed this session is {{ averageWpm }}</span>
    </div>
    <div v-else class="two-padding-margin">
      <span>you typed at {{ currentSpeedLog.cpm }} Word per minute</span>
      <span>your average speed this session is {{ averageCpm }}</span>
    </div>
    <div class="two-padding-margin">your average speed this session</div>
    <button class="two-padding-margin" @click="startNewFrase">
      start new frase
    </button>
  </div>
</template>
<style scoped>
.resume-container {
  display: flex;
  flex-direction: column;
  background-color: rgb(48, 46, 45);
  height: min-content;
  align-self: center;
  justify-self: center;
  border-radius: 5px;
  color: white;
  font-size: large;
  font-weight: 500;
}
.two-padding-margin {
  padding: 1%;
  margin: 1%;
}
</style>
