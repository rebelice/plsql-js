<script setup lang="ts">
import { computed, ref } from 'vue';
import { test as testAntlr4Ts } from './test-antlr4-ts';
import { test as testAntlr4Js } from './test-antlr4-js';
import { test as testAntlr4Java } from './test-java';
import { test as testAntlrTree } from './test-antlr4-full-tree';
import { test as testIntelligence } from './test-intelligence';

const rawInput = ref('select u.name, u.sex, u.age from sys.user u|');
const inputString = computed(() => {
  return rawInput.value.replace('|', '');
});
const caretIndex = computed(() => {
  const index = rawInput.value.indexOf('|') - 1;
  return Math.max(index, 0);
});
</script>

<template>
  <div>
    <textarea v-model="rawInput" style="width: 480px; height: 320px" />
  </div>
  <div style="display: flex; gap: 8px">
    <button @click="testAntlr4Js(inputString, caretIndex)">
      Test antlr4-js
    </button>
    <button @click="testAntlr4Ts(inputString, caretIndex)">
      Test antlr4-ts
    </button>
    <button @click="testAntlr4Java()">Test antlr4 Java Grammar</button>
    <button @click="testAntlrTree(inputString)">Test antlr4 parse full tree</button>
    <button @click="testIntelligence(inputString, caretIndex)">Test intelligence suggestion</button>
  </div>
  <div>Click test button and see what console says.</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
