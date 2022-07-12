<script lang="ts">
import { computed, defineComponent } from "vue";
import { store, useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { MutationType } from "@/store/mutations";

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const activeFraseArray = computed(() => store.getters.getActiveFraseArray);
    function changeFrase() {
      store.dispatch(ActionTypes.ChangeActiveFrase, undefined);
    }
    function correctlyTypedCharacter(character: string, index: number) {
      const functionActiveFraseArray = store.getters.getActiveFrase;
      return functionActiveFraseArray[index] === character;
    }
    return { changeFrase, activeFraseArray, correctlyTypedCharacter };
  },

  data() {
    const theFrase = computed(() => store.getters.getActiveFrase);
    const inputMessage = "";
    const backgroundInputMessage = "";
    const alreadyCorrectlyTypedWord = "";
    return {
      theFrase,
      inputMessage,
      backgroundInputMessage,
      alreadyCorrectlyTypedWord,
    };
  },
  methods: {
    resetInputMessage: function() {
      this.inputMessage = "";
    },
    changeFraseButton: function() {
      this.resetInputMessage();
      this.changeFrase();
    },
    setInputMessage: function(event: any) {
      const inputValue = event.target.value;
      this.inputMessage = inputValue;
      this.backgroundInputMessage = this.alreadyCorrectlyTypedWord + inputValue;
      const lastChar = inputValue[inputValue.length - 1];
      if (lastChar === " " && this.checkIfCorrectValueSoFar()) {
        this.alreadyCorrectlyTypedWord = this.backgroundInputMessage;
        this.inputMessage = "";
      }
    },
    checkIfCorrectValueSoFar: function() {
      for (let i = 0; i < this.backgroundInputMessage.length; i++) {
        if (this.backgroundInputMessage[i] !== this.activeFraseArray[i]) {
          return false;
        }
      }
      return true;
    },
    createClassForSpan: function(character: string, index: number): string {
      let classString = "";
      if (character === this.backgroundInputMessage[index]) {
        classString += "correct-input-letter ";
      } else if (
        character !== this.backgroundInputMessage[index] &&
        this.backgroundInputMessage.length > index
      ) {
        classString += "incorrect-input-letter ";
      }
      if (this.backgroundInputMessage.length === index) {
        classString += "current-letter-being-typed";
      }
      return classString;
    },
  },
});
</script>

<template>
  <div class="main-container">
    <div class="active-frase">
      <span
        v-for="(character, index) in activeFraseArray"
        :key="index"
        :class="createClassForSpan(character, index)"
        >{{ character }}</span
      >
    </div>
    <input
      type="text"
      class="typing-input"
      :value="inputMessage"
      @input="setInputMessage($event)"
    />
    <button @click="changeFraseButton" class="change-button">
      Change Frase
    </button>
  </div>
</template>
<style>
.main-container {
  display: flex;
  flex-direction: column;
  background-color: rgb(48, 46, 45);
  height: 40vh;
  align-self: center;
  justify-self: center;
  border-radius: 5px;
}
.active-frase {
  margin: 2%;
  padding: 1%;
  font-size: large;
  font-weight: 500;
  border-radius: "100px";
  color: white;
}
.typing-input {
  margin: 2%;
  padding: 1%;
  color: white;
  border-radius: 3px;
  background-color: rgb(78, 76, 74);
}
.change-button {
  margin: 2%;
  align-content: flex-start;
  background-color: white;
  align-self: flex-start;
}
.correct-input-letter {
  color: rgb(103, 221, 103);
}
.incorrect-input-letter {
  color: rgb(0, 0, 0);
  background-color: rgb(216, 63, 63);
}
.current-letter-being-typed {
  border-left: solid 1px blue;
}
</style>
