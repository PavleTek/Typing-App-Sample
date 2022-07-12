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
    const wpmSpeedMeasure = computed(() => store.getters.getWpm);
    const totalCharacters = computed(
      () => store.getters.getActiveFraseArray.length
    );
    const totalWords = computed(
      () => store.getters.getActiveFrase.split(" ").length
    );
    const correctlyTypedWordsAmount = computed(
      () => props.correctlyTypedWords.split(" ").length - 1
    );
    const remainingTypingTime = computed(
      () => store.getters.getTypingCountDown
    );
    const wpm = computed(() => {
      const minutesPassed = (90 - Number(remainingTypingTime.value)) / 60;
      const typedWords = Number(correctlyTypedWordsAmount.value);
      if (typedWords === 0) {
        return 0;
      } else {
        return ((typedWords - 1) / minutesPassed) % 1;
      }
    });
    const cpm = computed(() => {
      const minutesPassed = (90 - Number(remainingTypingTime.value)) / 60;
      return props.correctlyTypedCharacters / minutesPassed;
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
      totalCharacters,
      totalWords,
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
