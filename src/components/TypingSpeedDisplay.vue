<script lang="ts">
import { MutationType } from "@/store/mutations";
import { tsConstructSignatureDeclaration } from "@babel/types";
import { computed, defineComponent, onMounted } from "vue";
import { store, useStore } from "../store";

export default defineComponent({
  components: {},
  props: {
    correctlyTypedCharacters: { type: Number, required: true },
    correctlyTypedWords: { type: String, required: true },
  },
  setup(props) {
    const store = useStore();
    const wpmSpeedMeasure = computed(() => store.getters.getWpmSetting);
    const correctlyTypedWordsAmount = computed(
      () => props.correctlyTypedWords.split(" ").length - 1
    );
    const remainingTypingTime = computed(
      () => store.getters.getTypingCountDown
    );
    const wpm = computed(() => {
      const minutesPassed = (90 - Number(remainingTypingTime.value)) / 60;
      const typedWords = Number(correctlyTypedWordsAmount.value);
      let wpmSpeed = 0;
      if (typedWords !== 0) {
        wpmSpeed = Number(((typedWords - 1) / minutesPassed).toFixed());
        store.commit(MutationType.SetCurrentWPM, wpmSpeed);
      }
    });
    const cpm = computed(() => {
      const minutesPassed = (90 - Number(remainingTypingTime.value)) / 60;
      const cpmSpeed = Number(
        (props.correctlyTypedCharacters / minutesPassed).toFixed()
      );
      store.commit(MutationType.SetCurrentCPM, cpmSpeed);
      return cpmSpeed;
    });
    function countDownTimer() {
      if (Number(remainingTypingTime.value) > 0) {
        const remainingTime = Number(remainingTypingTime.value);
        setTimeout(() => {
          store.commit(MutationType.SetTypingCountDown, remainingTime - 1);
          countDownTimer();
        }, 1000);
      } else {
        store.commit(MutationType.SetCountDown, -1);
      }
    }
    onMounted(() => {
      store.commit(MutationType.SetTypingCountDown, 90);
      countDownTimer();
    });
    return {
      wpmSpeedMeasure,
      correctlyTypedWordsAmount,
      remainingTypingTime,
      wpm,
      cpm,
    };
  },
});
</script>

<template>
  <div class="info-panel">
    <div>{{ remainingTypingTime }} Seconds Left</div>
    <div v-if="wpmSpeedMeasure">{{ wpm }} WPM</div>
    <div v-else>{{ cpm }} CPM</div>
  </div>
</template>
<style scoped>
.info-panel {
  display: flex;
  flex-direction: column;
  color: white;
  width: 12em;
  padding: 2%;
}
</style>
