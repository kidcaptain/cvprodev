<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ArrowLeft, Trash, Edit } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import * as z from "zod";
import Experience from "@/components/builder/sub-forms/Experience.vue";
import Skills from "@/components/builder/sub-forms/Skills.vue";
import Education from "@/components/builder/sub-forms/Education.vue";

const emit = defineEmits(["submit"]);

const { handleSubmit } = useForm({});

const onSubmit = handleSubmit(() => {
  const values: any[] = [];
  accordionItems.value.forEach((element) => {
    values.push({ title: element.title, data: element.datas });
  });
  window.localStorage.setItem("step_2", JSON.stringify(values));
  emit("submit");
});

const defaultValue = "item-1";

const accordionItems = ref([
  {
    value: "item-1",
    title: "PROFESSIONAL EXPERIENCE",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
    datas: Array<any>(),
    form: Experience,
  },
  {
    value: "item-2",
    title: "EDUCATION",
    datas: Array<any>(),
    content:
      "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    form: Education,
  },
  {
    value: "item-3",
    title: "PERSONAL SKILLS",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: Skills,
  },
  {
    value: "item-4",
    title: "PROFESSIONAL SKILLS",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: Skills,
  },
]);

const removeSaved = (item: number, index: number) => {
  accordionItems.value[item]?.datas.splice(index, 1);
};

const itemEditable = ref();

const editSave = (item: number, index: number) => {
  console.log(accordionItems.value[item]?.datas[index]);
};
</script>

<template>
  <form @submit="onSubmit" class="text-foreground">
    <Accordion
      type="single"
      class="w-full"
      collapsible
      :default-value="defaultValue"
    >
      <AccordionItem
        v-for="(item, itemIndex) in accordionItems"
        :key="item.value"
        :value="item.value"
      >
        <AccordionTrigger class="sticky font-bold">{{
          item.title
        }}</AccordionTrigger>
        <AccordionContent class="md:pl-5">
          <div class="space-y-2">
            <div
              v-for="(save, index) in item.datas"
              :key="index"
              
            >
              <div v-if="item.title == 'PROFESSIONAL EXPERIENCE' ">
                <component
                  :is="Experience"
                  @submit="(value: any) => console.log(value)"
                  :datas="item.datas"
                />
                <Button
                    @click="removeSaved(itemIndex, index)"
                    variant="outline"
                    class="p-1 border-none h-fit hover:text-secondary"
                    type="button"
                  ></Button>
              </div>
              <div v-else class="grid grid-cols-3 gap-5 p-3 border-l-2 cursor-pointer border-secondary bg-secondary/5 hover:bg-secondary/10">
                <h3 class="font-semibold border-r border-secondary/50">
                  {{ save.title }}
                </h3>
                <div
                  class="flex items-center justify-end px-2 border-r text-end border-secondary/50"
                >
                  <span>{{ save.company ?? " " }} {{ save.grade ?? " " }}</span>
                </div>
                <div class="flex items-center justify-end gap-5 text-end">
                  <Button
                    @click="removeSaved(itemIndex, index)"
                    variant="outline"
                    class="p-1 border-none h-fit hover:text-secondary"
                    type="button"
                  >
                    <Trash class="size-4" />
                  </Button>
                </div>
              </div>
            </div>
            <component
              :is="item.form"
              @submit="(value: any) => item?.datas?.push(value)"
              :datas="item.datas"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <div class="flex justify-between mt-5">
      <nuxt-link
        :to="{
          name: `app-cv-builder-step-id`,
          params: { id: parseInt(`${$route.params.id}`) - 1 },
          query: { template_id: $route.query.template_id },
        }"
      >
        <Button
          variant="outline"
          type="button"
          class="px-8 space-x-4"
          title="share"
        >
          <ArrowLeft />
          <span>Previous</span>
        </Button>
      </nuxt-link>
      <Button type="submit" class="px-12 space-x-4">
        <span>Next</span>
        <ArrowRight />
      </Button>
    </div>
  </form>
</template>
