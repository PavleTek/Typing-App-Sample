<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import TaskList from "./components/TaskList.vue";
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
    return {};
  },
});
</script>

<template>
  <div class="container mx-auto mt-3">
    <h1
      class="is-size-2 has-text-centered p-1 has-text-weight-bold has-text-info"
    >
      Typing App Sample
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
