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
        store.commit(MutationType.SetSpeedMeasure, val);
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
    return { buttonText, store, wpmSetting, cheatDeleteSetting };
  },
});
</script>

<template>
  <div class="options-container">
    <input type="checkbox" v-model="wpmSetting" />
  </div>
</template>
<style scoped>
.wpm-cpm-button {
  width: fit-content;
  margin: 2%;
}
.options-container {
  background-color: rgb(48, 46, 45);
  margin-top: 4em;
}
</style>
