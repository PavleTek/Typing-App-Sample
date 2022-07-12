<script lang="ts">
import { MutationType } from "@/store/mutations";
import { tsConstructSignatureDeclaration } from "@babel/types";
import { computed, defineComponent, onMounted } from "vue";
import { store, useStore } from "../store";

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const countDown = computed(() => store.getters.getCountDown);
    function countDownTimer() {
      if (Number(countDown.value) > 0) {
        setTimeout(() => {
          store.commit(MutationType.SetCountDown, Number(countDown.value) - 1);
          countDownTimer();
        }, 1000);
      }
    }
    onMounted(() => {
      countDownTimer();
    });
    return { countDown };
  },
});
</script>

<template>
  <div class="counter-container">
    <h2>{{ countDown }}</h2>
    <div class="traffic-light">
      <div class="red-light"></div>
      <div class="yellow-light"></div>
      <div class="green-light"></div>
    </div>
  </div>
</template>
<style scoped>
.counter-container {
  background-color: aqua;
  padding: 2%;
  margin: 2%;
}
.traffic-light {
  display: flex;
  justify-content: space-evenly;
}
.green-light {
  background-color: green;
  border-radius: 10%;
  height: 4em !important;
  width: 4em !important;
}
.yellow-light {
  background-color: yellow;
  border-radius: 10%;
  height: 4em;
  width: 4em;
}
.red-light {
  background-color: red;
  border-radius: 10%;
  height: 4em;
  width: 4em;
}
</style>
