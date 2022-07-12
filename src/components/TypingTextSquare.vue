<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { store, useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { MutationType } from "../store/mutations";
import StartCounterVue from "./StartCounter.vue";

export default defineComponent({
  components: { StartCounterVue },
  setup() {
    // imports store
    const store = useStore();
    // computed values from getters that call the store
    const activeFraseArray = computed(() => store.getters.getActiveFraseArray);
    const startCountDown = computed(() => store.getters.getCountDown);

    // changes the active frase in the store
    function changeFrase() {
      store.dispatch(ActionTypes.ChangeActiveFrase, undefined);
    }
    function focusInput() {
      window.setTimeout(() => document.getElementById("input")?.focus(), 0);
    }
    function StartCountdDown() {
      store.commit(MutationType.SetCountDown, 3);
      document.getElementById("start-button")?.blur();
    }
    watch(startCountDown, (currentvalue, oldvalue) => {
      if (currentvalue === 0) {
        focusInput();
      }
    });
    return { changeFrase, StartCountdDown, activeFraseArray, startCountDown };
  },

  data() {
    //  input variables need for all the class and styling logic, color change on errros, only showing the last word on input, etc...
    const inputMessage = "";
    const backgroundInputMessage = "";
    const alreadyCorrectlyTypedWord = "";
    return {
      inputMessage,
      backgroundInputMessage,
      alreadyCorrectlyTypedWord,
    };
  },

  methods: {
    // sets everything related to the input to base state
    resetInputMessage: function() {
      this.inputMessage = "";
      this.backgroundInputMessage = "";
      this.alreadyCorrectlyTypedWord = "";
    },
    // changes the frase, and sets input values to base state
    changeFraseButton: function() {
      this.resetInputMessage();
      this.changeFrase();
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
          this.changeFraseButton();
        }
      }
    },
    // checker to see if the frase has been correctly type from the begginin to the last typed value
    checkIfCorrectValueSoFar: function() {
      for (let i = 0; i < this.backgroundInputMessage.length; i++) {
        if (this.backgroundInputMessage[i] !== this.activeFraseArray[i]) {
          return false;
        }
      }
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
  <div class="main-container">
    <div class="frase-and-button-container">
      <div class="active-frase">
        <span
          v-for="(character, index) in activeFraseArray"
          :key="index"
          :class="createClassForSpan(character, index)"
          >{{ character }}
        </span>
      </div>
      <button @click="StartCountdDown" class="start-button" id="start-button">
        Start
      </button>
    </div>
    <StartCounterVue v-if="startCountDown > 0" />
    <input
      v-if="startCountDown === 0"
      type="text"
      id="input"
      class="typing-input"
      :class="{ 'wrong-input-entered': !checkIfCorrectValueSoFar() }"
      :value="inputMessage"
      @input="setInputMessage($event)"
    />
    <input
      v-else
      type="text"
      class="typing-input"
      :class="{ 'wrong-input-entered': !checkIfCorrectValueSoFar() }"
      :value="inputMessage"
      ref="myinput"
      @input="setInputMessage($event)"
      disabled
    />
    <button @click="changeFraseButton" class="change-button">
      Change Frase
    </button>
  </div>
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
