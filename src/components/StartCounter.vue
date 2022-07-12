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
    <div class="traffic-light">
      <div :class="[countDown === 3 ? 'red-light' : 'grey-light']"></div>
      <div :class="[countDown === 2 ? 'yellow-light' : 'grey-light']"></div>
      <div :class="[countDown === 1 ? 'green-light' : 'grey-light']"></div>
    </div>
  </div>
</template>
<style scoped>
.counter-container {
  background-color: rgb(24, 24, 24);
  padding: 2%;
  margin: 2%;
  width: min-content;
  height: min-content;
  border-radius: 20px;
}
.traffic-light {
  display: flex;
  justify-content: space-evenly;
  width: 10em;
  height: 4em;
}
.green-light {
  background-color: green;
  border: black solid 2px;
  border-radius: 50%;
  height: 3em !important;
  width: 3em !important;
}
.yellow-light {
  background-color: yellow;
  border: black solid 2px;
  border-radius: 50%;
  height: 3em;
  width: 3em;
}
.red-light {
  background-color: red;
  border: black solid 2px;
  border-radius: 50%;
  height: 3em;
  width: 3em;
}
.grey-light {
  background-color: rgb(117, 112, 112);
  border: black solid 2px;
  border-radius: 50%;
  height: 3em;
  width: 3em;
}
</style>
