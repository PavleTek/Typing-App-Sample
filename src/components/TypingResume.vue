<script lang="ts">
import { ActionTypes } from "@/store/actions";
import { computed, defineComponent } from "vue";
import { useStore } from "../store";

export default defineComponent({
  components: {},
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
    <div v-if="wpmSpeedMeasure" class="two-padding-margin double-span">
      <span class="first-span"
        >you typed at {{ currentSpeedLog.wpm }} Word per minute</span
      >
      <span>your average speed this session is {{ averageWpm }}</span>
    </div>
    <div v-else class="two-padding-margin double-span">
      <span class="first-span"
        >you typed at {{ currentSpeedLog.cpm }} Word per minute,</span
      >
      <span>your average speed this session is {{ averageCpm }}</span>
    </div>
    <button
      class="two-padding-margin"
      @click="
        () => {
          startNewFrase();
          $emit('reset-input-values');
        }
      "
    >
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
.first-span {
  padding-right: 1em;
}
.double-span {
  display: flex;
  flex-direction: column;
}
</style>
