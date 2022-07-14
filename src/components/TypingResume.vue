<script lang="ts">
import { MutationType } from "@/store/mutations";
import {
  stringTypeAnnotation,
  tsConstructSignatureDeclaration,
} from "@babel/types";
import { computed, defineComponent, onMounted } from "vue";
import { store, useStore } from "../store";

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
  },
});
</script>

<template>
  <div class="resume-container">
    <div>HELLO</div>
  </div>
</template>
<style scoped>
.resume-container {
  display: flex;
  flex-direction: column;
  background-color: rgb(48, 46, 45);
  height: min-content;
  align-self: center;
  justify-self: center;
  border-radius: 5px;
}
</style>
