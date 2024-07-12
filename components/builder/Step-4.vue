<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ArrowLeft, Trash } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import * as z from "zod";
import Project from "@/components/builder/sub-forms/Project.vue";
import References from "@/components/builder/sub-forms/References.vue";
import Network from "./sub-forms/Network.vue";

const { handleSubmit } = useForm({});

const emit = defineEmits(["submit"]);

const onSubmit = handleSubmit(() => {
  const values: any[] = [];
  accordionItems.value.forEach((element) => {
    values.push({ title: element.title, data: element.datas });
  });
  window.localStorage.setItem("step_4", JSON.stringify(values));
  emit("submit");
});

const defaultValue = "item-1";

const accordionItems = ref([
  {
    value: "item-1",
    title: "REFEREnces",
    datas: Array<any>(),
    form: References,
  },
  {
    value: "item-2",
    title: "Project",
    datas: Array<any>(),
    form: Project,
  },
  {
    value: "item-3",
    title: "Social network",
    datas: Array<any>(),
    form: Network,
  },
]);

const removeSaved = (item: number, index: number) => {
  accordionItems.value[item]?.datas.splice(index, 1);
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
        <AccordionTrigger class="sticky font-bold uppercase">{{
          item.title
        }}</AccordionTrigger>
        <AccordionContent class="md:pl-5">
          <div class="space-y-2">
            <div
              v-for="(save, index) in item.datas"
            
            >
              <div v-if="itemIndex == 0" class="border-b">
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  <span class="font-bold">Title</span> {{ save.title }}
                </h3>
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  <span class="font-bold">position</span> {{ save.position }}
                </h3>
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  <span class="font-bold">references name</span>
                  {{ save.references_name }}
                </h3>
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  <span class="font-bold">references phone</span>
                  {{ save.references_phone }}
                </h3>
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  <span class="font-bold">email</span> {{ save.email }}
                </h3>
                <div
                  class="flex items-center justify-end px-2 border-r text-end border-secondary/50"
                >
                  <span>{{ save.company || save.grade }}</span>
                </div>
                <div
                  class="flex items-center justify-start gap-5 mt-2 text-end"
                >
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
              <div v-if="itemIndex == 1" class="border-b">
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  <span class="font-bold">Project Title</span> {{ save.title }}
                </h3>
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  <span class="font-bold">Company Name</span> {{ save.company }}
                </h3>
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  <span class="font-bold">Period</span>
                  {{ save.start_date }} / {{ save.end_date }}
                </h3>
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  <span class="font-bold">Tasks performed</span>
                  {{ save.tasks }}
                </h3>

                <div
                  class="flex items-center justify-start gap-5 mt-2 text-end"
                >
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
              <div v-if="itemIndex == 2" class="border-b">
                <h3 class="text-xs uppercase border-r border-secondary/50">
                  {{ save.title }}
                </h3>

                <div
                  class="flex items-center justify-start gap-5 mt-2 text-end"
                >
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
        <Button variant="outline" type="button" size="sm" title="share">
          <ArrowLeft />
          <span>Previous</span>
        </Button>
      </nuxt-link>
      <Button type="submit" size="sm">
        <span>Done</span>
        <ArrowRight />
      </Button>
    </div>
  </form>
</template>
