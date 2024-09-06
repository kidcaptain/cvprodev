<script setup lang="ts">
import { useRouter } from "vue-router";
import BuilderStep1 from "~/components/builder/Step-1.vue";
import BuilderStep2 from "~/components/builder/Step-2.vue";
import BuilderStep3 from "~/components/builder/Step-3.vue";
import BuilderStep4 from "~/components/builder/Step-4.vue";

definePageMeta({
  layout: "builder",
});

const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);
const template = route.query.template_id;

const resolveComponent = () => {
  if (id == 1) return BuilderStep1;
  
  if (id == 2) return BuilderStep2;
  // if (id == 3) return BuilderStep3;
  // if (id == 4) return BuilderStep4;
};

const formSubmission = (event: any) => {
  console.log(route.query.template_id);
  if (id + 1 == 3) {
   
    router.push({
      name: "app-cv-builder-preview-id",
      params: { id: template?.toString() },
    });
  } else {
    router.push({ params: { id: id + 1 }, query: { template_id: template } });
  }
};

</script>

<template>
  <component :is="resolveComponent()" @submit="formSubmission"></component>
</template>
