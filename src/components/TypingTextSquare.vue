<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { MutationType } from "../store/mutations";
import TrafficLight from "./TrafficLight.vue";
import TypingSpeedDisplayVue from "./TypingSpeedDisplay.vue";
import TypingResumeVue from "./TypingResume.vue";
import { getters } from "@/store/getters";
export default defineComponent({
  components: { TrafficLight, TypingSpeedDisplayVue, TypingResumeVue },
  setup() {
    // imports store
    const store = useStore();
    // computed values from getters that call the store
    const activeFraseArray = computed(() => store.getters.getActiveFraseArray);
    const startCountDown = computed(() => store.getters.getCountDown);
    const resumeOn = computed(() => store.getters.getResumeOn);
    const cheatDeleteSetting = computed(
      () => store.getters.getCheatDeleteSetting
    );
    // changes the active frase in the store
    function changeFrase() {
      store.commit(MutationType.SetRandomActiveFrase, undefined);
    }
    function focusInput() {
      window.setTimeout(() => document.getElementById("input")?.focus(), 0);
    }
    function StartCountdDown() {
      store.commit(MutationType.SetCountDown, 6);
      document.getElementById("start-button")?.blur();
    }
    function setInitialCoolDown() {
      store.commit(MutationType.SetCountDown, -1);
    }
    function setInitialTypingCountDown() {
      store.commit(MutationType.SetTypingCountDown, 0);
    }
    watch(startCountDown, (currentvalue, oldvalue) => {
      if (currentvalue === 0) {
        focusInput();
      }
    });
    return {
      changeFrase,
      StartCountdDown,
      setInitialCoolDown,
      setInitialTypingCountDown,
      activeFraseArray,
      resumeOn,
      cheatDeleteSetting,
      startCountDown,
      store,
    };
  },

  data() {
    //  input variables need for all the class and styling logic, color change on errros, only showing the last word on input, etc...
    const inputMessage = "";
    const backgroundInputMessage = "";
    const alreadyCorrectlyTypedWord = "";
    const correctlyTypedCharactersAmount = 0;
    const allCurrentlyCorrectlyTyped = "";
    const correctlyTypedWords = computed(() => {
      return alreadyCorrectlyTypedWord.split(" ").length;
    });
    return {
      inputMessage,
      backgroundInputMessage,
      alreadyCorrectlyTypedWord,
      correctlyTypedCharactersAmount,
      allCurrentlyCorrectlyTyped,
      correctlyTypedWords,
    };
  },

  methods: {
    // sets everything related to the input to base state
    resetInputMessage: function() {
      this.inputMessage = "";
      this.backgroundInputMessage = "";
      this.alreadyCorrectlyTypedWord = "";
    },
    resetCorrectlyTypedData: function() {
      this.correctlyTypedCharactersAmount = 0;
      this.allCurrentlyCorrectlyTyped = "";
      this.alreadyCorrectlyTypedWord = "";
    },
    // changes the frase, and sets input values to base state
    changeFraseButton: function() {
      this.resetInputMessage();
      this.changeFrase();
      this.setInitialCoolDown();
      this.setInitialTypingCountDown();
    },
    // used instead of v-model in order to be able to only display the last word on input
    setInputMessage: function(event: any) {
      const inputValue = event.target.value;
      this.inputMessage = inputValue;
      this.backgroundInputMessage = this.alreadyCorrectlyTypedWord + inputValue;
      const lastChar = inputValue[inputValue.length - 1];
      if (this.checkIfCorrectValueSoFar()) {
        if (lastChar === " ") {
          this.alreadyCorrectlyTypedWord = this.backgroundInputMessage;
          this.inputMessage = "";
        }
        if (
          this.backgroundInputMessage.length === this.activeFraseArray.length
        ) {
          this.store.dispatch(ActionTypes.FinishTyping);
        }
      } else {
        if (
          this.cheatDeleteSetting &&
          event.inputType === "deleteContentBackward" &&
          !this.checkIfCorrectValueSoFar()
        ) {
          const lastCorrectlyTypedWordArray = this.allCurrentlyCorrectlyTyped.split(
            " "
          );
          const lastWordCorrectlyTypedChars =
            lastCorrectlyTypedWordArray[lastCorrectlyTypedWordArray.length - 1];
          console.log(this.allCurrentlyCorrectlyTyped);
          this.inputMessage = lastWordCorrectlyTypedChars;
          this.backgroundInputMessage =
            this.alreadyCorrectlyTypedWord + lastWordCorrectlyTypedChars;
        }
      }
    },
    // checker to see if the frase has been correctly type from the begginin to the last typed value
    checkIfCorrectValueSoFar: function() {
      let newCorrectlyTypedChars = "";
      for (let i = 0; i < this.backgroundInputMessage.length; i++) {
        if (this.backgroundInputMessage[i] !== this.activeFraseArray[i]) {
          this.correctlyTypedCharactersAmount = i;
          return false;
        } else {
          newCorrectlyTypedChars += this.backgroundInputMessage[i];
        }
      }
      this.correctlyTypedCharactersAmount = this.backgroundInputMessage.length;
      this.allCurrentlyCorrectlyTyped = newCorrectlyTypedChars;
      return true;
    },
    // makes the html cleaner, creates the string class name for the main frase element
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
      if (this.backgroundInputMessage.length === index && index !== 0) {
        classString += "current-letter-being-typed";
      } else if (this.backgroundInputMessage.length === 0 && index === 0) {
        classString += "first-letter-being-typed";
      }
      return classString;
    },
  },
});
</script>

<template>
  <div class="main-container" v-if="!resumeOn">
    <div class="frase-and-button-container">
      <div class="active-frase">
        <span
          v-for="(character, index) in activeFraseArray"
          :key="index"
          :class="createClassForSpan(character, index)"
          >{{ character }}
        </span>
      </div>
      <button
        @click="StartCountdDown"
        class="start-button"
        id="start-button"
        v-show="startCountDown === -1"
      >
        Start
      </button>
      <TrafficLight v-if="startCountDown > 0" />
      <TypingSpeedDisplayVue
        v-if="startCountDown === 0"
        :correctly-typed-characters="correctlyTypedCharactersAmount"
        :correctly-typed-words="alreadyCorrectlyTypedWord"
      />
    </div>
    <input
      v-if="startCountDown === 0"
      type="text"
      id="input"
      class="typing-input"
      :class="{ 'wrong-input-entered': !checkIfCorrectValueSoFar() }"
      :value="inputMessage"
      @input="setInputMessage($event)"
    />
    <input v-else type="text" class="typing-input" disabled />
    <button @click="changeFraseButton" class="change-button">
      Change Frase
    </button>
  </div>
  <TypingResumeVue
    v-else
    @reset-input-values="
      () => {
        resetInputMessage();
        resetCorrectlyTypedData();
      }
    "
  />
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  background-color: rgb(48, 46, 45);
  height: min-content;
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
  margin-right: auto;
}
.frase-and-button-container {
  display: flex;
  width: 100%;
}
.start-button {
  height: 3em;
  align-self: center;
  margin-right: 2%;
  margin-left: auto;
}
.typing-input {
  margin: 2%;
  padding: 1%;
  color: white;
  border-radius: 3px;
  background-color: rgb(78, 76, 74);
}
.wrong-input-entered {
  background-color: rgb(218, 116, 116) !important;
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
@-webkit-keyframes fade {
  from {
    border-left: solid 1px blue;
  }
  to {
    border-left: solid 1px rgba(0, 0, 255, 0);
  }
}

@keyframes fade {
  from {
    border-left: solid 1px rgba(0, 0, 255, 0);
  }
  to {
    border-left: solid 1px blue;
  }
}
.current-letter-being-typed {
  border-left: solid 1px blue;
}
.first-letter-being-typed {
  animation: fade 0.5s infinite 100ms;
}
</style>
