<script setup lang="ts">
import { useRouter } from "vue-router";
import BuilderStep1Edit from "~/components/builder/Step-1-Edit.vue";
import BuilderStep2Edit from "~/components/builder/Step-2Edit.vue";
import BuilderStep3Edit from "~/components/builder/Step-3Edit.vue";
import BuilderStep4Edit from "~/components/builder/Step-4Edit.vue";

definePageMeta({
  layout: "builder",
});

const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);
const template = route.query.template_id;

const resolveComponent = () => {
  if (id == 1) return BuilderStep1Edit;
  if (id == 2) return BuilderStep2Edit;
  if (id == 3) return BuilderStep3Edit;
  if (id == 4) return BuilderStep4Edit;
};

const formSubmission = (event: any) => {
  if (id + 1 == 5) { 
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
  <BuilderStep1Edit></BuilderStep1Edit>
</template>
