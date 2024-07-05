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

import Experience from "@/components/builder/sub-forms/Experience.vue";
import ExperienceEdit from "@/components/builder/sub-forms/ExperienceEdit.vue";
import Skills from "@/components/builder/sub-forms/Skills.vue";
import Education from "@/components/builder/sub-forms/Education.vue";

const emit = defineEmits(["submit"]);

const { handleSubmit } = useForm({});

const onSubmit = handleSubmit(() => {
  const values: any[] = [];
  accordionItems.value.forEach((element) => {
    if (element.title == "PROFESSIONAL EXPERIENCE") {
      element.data = itemsEditable.value;
    }
    values.push({ title: element.title, data: element.datas });
  });
  window.localStorage.setItem("step_2", JSON.stringify(values));
  emit("submit");
});

const onEdit = (e) => {
  e.preventDefault();
  const data = {
    jobTitle: jobTitle.value,
    company: company.value,
    startDate: startDate.value,
    endDate: endDate.value,
    professionalTasksPerformed: professionalTasksPerformed.value,
  };

  var tab: any[] = itemsEditable.value;
  tab[itemEditable.value] = data;
  itemsEditable.value = tab;
  // itemsEditable.value = tab;
  booll.value = false;
};
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

const itemsEditable = ref([]);

const itemEditable = ref<number>();
const booll = ref<boolean>(false);
const jobTitle = ref<string>();
const company = ref<string>();
const startDate = ref<string>();
const endDate = ref<string>();
const professionalTasksPerformed = ref<string>();

const editSave = (item: any, index: number) => {
  itemEditable.value = index;
  jobTitle.value = item.jobTitle;
  company.value = item.company;
  startDate.value = item.startDate;
  endDate.value = item.endDate;
  professionalTasksPerformed.value = item.professionalTasksPerformed;
  booll.value = true;
};
</script>

<template>
  <div class="">
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
              <div>
                <div v-if="itemIndex == 0" class="overflow-y-auto max-h-52">
                  <div
                    v-for="(save, index) in itemsEditable"
                    :key="index"
                    class="border-b bg-secondary/5 "
                  >
                    <div class="p-4">
                      <h2 class="my-2 text-md">
                        <span class="font-bold uppercase">JobTitle:</span>
                        {{ save.jobTitle }}
                      </h2>
                      <h2 class="my-2 text-md">
                        <span class="font-bold uppercase">Company:</span>
                        {{ save.company }}
                      </h2>
                      <h2 class="my-2 text-md">
                        <span class="font-bold uppercase">Period:</span>
                        {{ save.startDate }} -{{ save.endDate }}
                      </h2>
                      <h2 class="my-2 text-md">
                        <span class="font-bold uppercase"
                          >Tasks & Job description:</span
                        >
                      </h2>
                      <p class="p-1">{{ save.professionalTasksPerformed }}</p>
                    </div>
                    <Button
                      @click="editSave(save, index)"
                      variant="outline"
                      class="p-1 border-none h-fit hover:text-secondary"
                      type="button"
                    >
                      <Edit class="size-4"
                    /></Button>
                  </div>
                </div>
                <div
                  v-for="(save, index) in item.datas"
                  :key="index"
                  class="grid grid-cols-3 gap-5 p-3 border-l-2 cursor-pointer border-secondary bg-secondary/5 hover:bg-secondary/10"
                >
                  <h3 class="font-semibold border-r border-secondary/50">
                    {{ save.title }}
                  </h3>
                  <div
                    class="flex items-center justify-end px-2 border-r text-end border-secondary/50"
                  >
                    <span
                      >{{ save.company ?? " " }} {{ save.grade ?? " " }}</span
                    >
                  </div>
                  <div class="flex items-center justify-end gap-3 text-end">
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
                @submit="(value: any) => {   if (item.title == 'PROFESSIONAL EXPERIENCE') {
                itemsEditable.push(value); console.log(value)
              }else{ 
              item?.datas?.push(value);}
              }"
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
    <div
      v-if="booll"
      class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/20"
    >
      <div class="z-50 w-1/3 p-10 mt-10 overflow-hidden bg-white rounded-md">
        <form @submit="onEdit">
          <h3 class="text-xl text-center">Edit Work Experience</h3>
          <div
            class="w-full gap-6 p-2 space-y-6 border-l-2 md:grid md:grid-cols-2 md:space-y-0 border-secondary/50"
          >
            <div>
              <label>Job Title</label>

              <Input
                name="titleExperienceEdit"
                id="titleExperienceEdit"
                type="text"
                placeholder="Accountant"
                v-model="jobTitle"
              />
            </div>

            <div>
              <label>Company Name</label>

              <Input
                :id="companyExperienceEdit"
                type="text"
                :name="companyExperienceEdit"
                placeholder="Exco cmr"
                v-model="company"
              />
            </div>

            <div>
              <label>Starting Date</label>

              <Input
                id="startDateExperienceEdit"
                v-model="startDate"
                name="startDateExperienceEdit"
                type="month"
              />
            </div>

            <div>
              <label>Ending Date</label>
              <Input
                name="endDateExperienceEdit"
                id="endDateExperienceEdit"
                v-model="endDate"
                type="month"
              />
            </div>

            <div class="w-full col-span-2">
              <label>Tasks & Job description</label>

              <textarea
                :name="experienceExperienceEdit"
                :id="experienceExperienceEdit"
                class="w-full col-span-2 p-1 border border-black rounded-md focus-within:outline-none focus-within:border"
                v-model="professionalTasksPerformed"
              ></textarea>
            </div>
          </div>
          <div class="p-4">
            <Button
              type="submit"
              class="px-6 space-x-3 bg-stone-500 border-stone-300"
              size="sm"
            >
              <span>Save</span>
            </Button>
            <Button
              type="button"
              class="px-6 space-x-3 bg-stone-500 border-stone-300"
              size="sm"
              @click="booll = false"
            >
              <span>Close</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
