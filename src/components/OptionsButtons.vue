<script lang="ts">
import { MutationType } from "@/store/mutations";
import { tsConstructSignatureDeclaration } from "@babel/types";
import { computed, defineComponent, onMounted } from "vue";
import { store, useStore } from "../store";

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    function toggleSpeedMeasure() {
      store.commit(MutationType.ToggleSpeedMeasure, undefined);
    }
    const buttonText = computed(() =>
      store.getters.getWpm ? "Switch To CPM" : "Switch To WPM"
    );
    return { toggleSpeedMeasure, buttonText };
  },
});
</script>

<template>
  <div class="counter-container">
    <button @click="toggleSpeedMeasure" class="wpm-cpm-button">
      {{ buttonText }}
    </button>
  </div>
</template>
<style scoped>
.wpm-cpm-button {
  width: fit-content;
  margin: 2%;
}
</style>
