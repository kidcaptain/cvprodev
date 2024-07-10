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
import Certifications from "@/components/builder/sub-forms/Certifications.vue";
import Hobbies from "@/components/builder/sub-forms/Hobbies.vue";
import Languages from "@/components/builder/sub-forms/Languages.vue";
import Award from "./sub-forms/Award.vue";

const { handleSubmit } = useForm({});

const emit = defineEmits(["submit"]);

const onSubmit = handleSubmit(() => {
  const values: any[] = [];
  accordionItems.value.forEach((element) => {
    values.push({ title: element.title, data: element.datas });
  });
  window.localStorage.setItem("step_3", JSON.stringify(values));
  emit("submit");
});

const defaultValue = "item-1";

const accordionItems = ref([
  {
    value: "item-1",
    title: "Language",
    datas: Array<any>(),
    form: Languages,
  },
  {
    value: "item-2",
    title: "Hobbies and interests",
    datas: Array<any>(),
    form: Hobbies,
  },
  {
    value: "item-3",
    title: "Certifications",
    datas: Array<any>(),
    form: Certifications,
  }
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
        <AccordionTrigger class="sticky text-sm font-bold uppercase">{{
          item.title
        }}</AccordionTrigger>
        <AccordionContent class="md:pl-5">
          <div class="space-y-2">
            <div class="overflow-y-auto max-h-52 flex-col-reverse flex">
              <div
                v-for="(save, index) in item.datas"
                class="my-2 border-b gap-5 p-2 cursor-pointer border-secondary"
              >
                <div
                  v-if="itemIndex == 0"
                  class="bg-secondary/5 hover:bg-secondary/10"
                >
                  <h3
                    :class="
                      save.company || save.grade || save.type ? 'border-r' : ''
                    "
                    class="font-semibold border-secondary/50"
                  >
                    <span>Language:</span> {{ save.title }}
                  </h3>
                  <div
                    :class="
                      save.company || save.grade || save.type ? 'border-r' : ''
                    "
                    class="flex items-center justify-end px-2 text-end border-secondary/50"
                  >
                    <span>{{ save.company || save.grade || save.type }}</span>
                  </div>
                </div>
                <div
                  v-if="itemIndex == 2"
                  class="bg-secondary/5 hover:bg-secondary/10"
                >
                  <h3
                    :class="
                      save.company || save.grade || save.type ? 'border-r' : ''
                    "
                    class="border-secondary/50"
                  >
                    <span class="font-semibold">Institution:</span>
                    {{ save.title }}
                  </h3>
                  <h3
                    :class="
                      save.company || save.grade || save.type ? 'border-r' : ''
                    "
                    class="border-secondary/50"
                  >
                    <span class="font-semibold">
                      Degree obtained and grade:</span
                    >
                    {{ save.grade }}
                  </h3>
                  <h3
                    :class="
                      save.company || save.grade || save.type ? 'border-r' : ''
                    "
                    class="border-secondary/50"
                  >
                    <span class="font-semibold">
                      Period:</span
                    >
                    {{ save.start_date }} /  {{ save.start_date }}
                  </h3>
                  <!-- <div
                    :class="
                      save.company || save.grade || save.type ? 'border-r' : ''
                    "
                    class="flex items-center justify-end px-2 text-end border-secondary/50"
                  >
                    <span>{{ save.company || save.grade || save.type }}</span>
                  </div> -->
                </div>
                <div
                  v-if="itemIndex == 1"
                  class="bg-secondary/5 hover:bg-secondary/10"
                >
                 
                  <h3
                   
                    
                  >
                    <span class="font-semibold">Hobbies or interests:</span> {{  save.title || save.grade || save.type }}
                  </h3>
                
                </div>
                <div class="flex items-center justify-end gap-5 text-end">
               
                  <Button
                    @click="removeSaved(itemIndex, index)"
                    variant="outline"
                    class="p-1 bg-secondary hover:border-secondary h-fit hover:text-secondary"
                    type="button"
                  >
                    <Trash class="size-4 text-white hover:text-secondary" />
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
        <Button variant="outline" type="button" size="sm" class="text-xs" title="share">
          <ArrowLeft :size="14" />
          <span>Education and Experience</span>
        </Button>
      </nuxt-link>
      <Button type="submit" size="sm" class="text-xs">
        <span>Reference</span>
        <ArrowRight :size="14" />
      </Button>
    </div>
  </form>
</template>
