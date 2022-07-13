<script lang="ts">
import { MutationType } from "@/store/mutations";
import { tsConstructSignatureDeclaration } from "@babel/types";
import { computed, defineComponent, onMounted } from "vue";
import { store, useStore } from "../store";

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const buttonText = computed(() =>
      store.getters.getWpmSetting ? "Switch To CPM" : "Switch To WPM"
    );
    const wpmSetting = computed({
      get() {
        return store.getters.getWpmSetting;
      },
      set(val: boolean) {
        store.commit(MutationType.SetWpmSpeedMeasure, val);
        store.commit(MutationType.SetCpmSpeedMeasure, !val);
      },
    });
    const cpmSetting = computed({
      get() {
        return store.getters.getCpmSetting;
      },
      set(val: boolean) {
        store.commit(MutationType.SetCpmSpeedMeasure, val);
        store.commit(MutationType.SetWpmSpeedMeasure, !val);
      },
    });
    const cheatDeleteSetting = computed({
      get() {
        return store.getters.getCheatDeleteSetting;
      },
      set(val: boolean) {
        store.commit(MutationType.SetCheatDelete, val);
      },
    });
    return { buttonText, store, wpmSetting, cheatDeleteSetting, cpmSetting };
  },
});
</script>

<template>
  <div class="options-container">
    <div class="check-box-div">
      <input type="checkbox" v-model="wpmSetting" class="setting-check-box" />
      <p class="check-text">Measure Speed in Words Per Minute</p>
    </div>
    <div class="check-box-div">
      <input type="checkbox" v-model="cpmSetting" class="setting-check-box" />
      <p class="check-text">Measure Speed in Characters Per Minute</p>
    </div>
    <div class="check-box-div">
      <input
        type="checkbox"
        v-model="cheatDeleteSetting"
        class="setting-check-box"
      />
      <p class="check-text">Toggle Cheat Delete Functionality</p>
    </div>
  </div>
</template>
<style scoped>
.options-container {
  background-color: rgb(48, 46, 45);
  border-radius: 10px;
  margin-top: 4em;
  width: min-content;
}
.check-box-div {
  padding: 5;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.setting-check-box {
  padding: 20px;
  margin: 20px;
  transform: scale(2);
}
.check-text {
  color: white;
  white-space: nowrap;
  padding-right: 1em;
}
</style>
