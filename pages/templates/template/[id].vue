<script setup lang="ts">
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "template-preview",
});

const BASE_URL = useRuntimeConfig().public.backendAPI;
const route = useRoute();
// const { data } = await useAsyncData(
//   "cv-templates-list",
//   () =>
//     $fetch(
//       "https://api.ticketvivi.com/cvpro/src/Template/Infrastructure/views/template_1714927354.blade.php",
//       { mode: "no-cors" }
//     ),
//   { lazy: true }
// );

const template = ref();
// const htmlToBlobToPdf = async () => {

//   console.log(data)
// };
const { data } = await useAsyncData<any>("cv-templates-list", () =>
  $fetch(`${BASE_URL}template/get/one/${route.params.id.toString()}`)
);
// htmlToBlobToPdf();s

const replaceUrl = (str: string) => {
  const url = str.replace("\/home\/ticketvi", "https:\/");
  return url;
};
// console.log(data.value)
// const { data } = await useAsyncData(
//   "https://api.ticketvivi.com/cvpro/src/Template/Infrastructure/views/template_1714927354.blade.php",
// );

// console.log(data?.value.template);
</script>

<template>
  <section class="container min-h-screen p-10">
    <h1 class="my-4 text-3xl font-semibold text-center">
      Reference template
    </h1>
    <div class="grid h-full  gap-8">

        <iframe
          :src="replaceUrl(data?.template?.templateViewPath)"
          class="w-full h-full min-h-screen"
          width="580px"
          height="480px"
        ></iframe>
      
    </div>
  </section>
</template>
