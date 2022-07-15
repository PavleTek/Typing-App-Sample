<script lang="ts">
import { MutationType } from "@/store/mutations";
import { computed, defineComponent, onMounted } from "vue";
import {  useStore } from "../store";

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
        }, 500);
      }
    }
    onMounted(() => {
      countDownTimer();
    });
    return { countDown };
  },
  data() {
    const rValues = [6, 5, 4];
    const yValues = [3, 2];
    const gValues = [1, 0];
    return { rValues, yValues, gValues };
  },
});
</script>

<template>
  <div class="counter-container">
    <div class="traffic-light">
      <div
        :class="[rValues.includes(countDown) ? 'red-light' : 'grey-light']"
      ></div>
      <div
        :class="[yValues.includes(countDown) ? 'yellow-light' : 'grey-light']"
      ></div>
      <div
        :class="[gValues.includes(countDown) ? 'green-light' : 'grey-light']"
      ></div>
    </div>
  </div>
</template>
<style scoped>
.counter-container {
  background-color: rgb(24, 24, 24);
  margin: 2%;
  width: min-content;
  height: min-content;
  border-radius: 20px;
}
.traffic-light {
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  width: 8em;
  height: 3em;
}
.green-light {
  background-color: green;
  border: black solid 2px;
  border-radius: 50%;
  height: 2em;
  width: 2em;
}
.yellow-light {
  background-color: yellow;
  border: black solid 2px;
  border-radius: 50%;
  height: 2em;
  width: 2em;
}
.red-light {
  background-color: red;
  border: black solid 2px;
  border-radius: 50%;
  height: 2em;
  width: 2em;
}
.grey-light {
  background-color: rgb(117, 112, 112);
  border: black solid 2px;
  border-radius: 50%;
  height: 2em;
  width: 2em;
}
</style>
