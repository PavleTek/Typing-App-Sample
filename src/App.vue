<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "./store";
import TypingTextSquareVue from "./components/TypingTextSquare.vue";
import { ActionTypes } from "./store/actions";
import OptionsButtonsVue from "./components/OptionsButtons.vue";

export default defineComponent({
  components: { TypingTextSquareVue, OptionsButtonsVue },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch(ActionTypes.SetInitialFrases);
    });
  },
});
</script>

<template>
  <div class="container mx-auto mt-3">
    <h1
      class="is-size-2 has-text-centered p-1 has-text-weight-bold has-text-info"
    >
      PavleTek Typing App
    </h1>
    <TypingTextSquareVue />
    <OptionsButtonsVue />
  </div>
</template>
<style>
@import "~bulma/css/bulma.css";

sub {
  display: block;
}
</style>
