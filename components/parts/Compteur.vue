<style></style>
<script setup lang="ts">
const props = defineProps<{ number: number }>();

const compteur = ref<string[]>();
const nombre = ref<number>(10);

const transformNumber = (nbr: number) => {
  let text: string[] = [];
  let nbrToText = nbr.toString();
  switch (nbrToText.length) {
    case 4:
      text[0] = nbrToText.charAt(0);
      text[1] = nbrToText.charAt(1) + nbrToText.charAt(2) + nbrToText.charAt(3);
      break;
    case 5:
      text[0] = nbrToText.charAt(0) + nbrToText.charAt(1);
      text[1] = nbrToText.charAt(2) + nbrToText.charAt(3) + nbrToText.charAt(4);
      break;
    case 6:
      text[0] = nbrToText.charAt(0) + nbrToText.charAt(1) + nbrToText.charAt(2);
      text[1] = nbrToText.charAt(3) + nbrToText.charAt(4) + nbrToText.charAt(5);
      break;
    case 7:
      text[0] = nbrToText.charAt(0) + nbrToText.charAt(1) + nbrToText.charAt(2);
      text[1] = nbrToText.charAt(3) + nbrToText.charAt(4) + nbrToText.charAt(5);
      text[2] = nbrToText.charAt(6);
      break;
    case 8:
      text[0] = nbrToText.charAt(0) + nbrToText.charAt(1) + nbrToText.charAt(2);
      text[1] = nbrToText.charAt(3) + nbrToText.charAt(4) + nbrToText.charAt(5);
      text[2] = nbrToText.charAt(6) + nbrToText.charAt(7);
      break;
    case 9:
      text[0] = nbrToText.charAt(0) + nbrToText.charAt(1) + nbrToText.charAt(2);
      text[1] = nbrToText.charAt(3) + nbrToText.charAt(4) + nbrToText.charAt(5);
      text[2] = nbrToText.charAt(6) + nbrToText.charAt(7) + nbrToText.charAt(8);
      break;
    case 10:
      text[0] = nbrToText.charAt(0) + nbrToText.charAt(1) + nbrToText.charAt(2);
      text[1] = nbrToText.charAt(3) + nbrToText.charAt(4) + nbrToText.charAt(5);
      text[2] = nbrToText.charAt(6) + nbrToText.charAt(7) + nbrToText.charAt(8);
      text[3] = nbrToText.charAt(9);
      break;

    default:
      text[0] = nbrToText;
      break;
  }
  return text;
};

// const A = "1500";
// if (nombre.value < props.number) {
//   setInterval(() => {
//     nombre.value += 100;
//   }, 1000);
// }
compteur.value = transformNumber(props.number);
</script>

<template>
  <div class="flex gap-2 transition-all justify-center italic" >
    <template v-for="(nbr, index) in compteur" :key="index">
      <div
        v-for="elt of nbr"
        class=" p-2 rounded-md bg-white "
        :key="index + nbr"
      >
        {{ elt }}
      </div>
      <span v-if="index != compteur.length - 1" class="text-white">,</span>
    </template>
  </div>
</template>
