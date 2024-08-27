<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRoute as useNativeRoute } from "vue-router";
import { ArrowRight, ArrowLeft, Trash, Edit } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import Experience from "@/components/builder/sub-forms/Experience.vue";

import Skills from "@/components/builder/sub-forms/Skills.vue";
import Education from "@/components/builder/sub-forms/Education.vue";

const emit = defineEmits(["submit"]);

const { handleSubmit } = useForm({});
useHead({
  title: "Create CV Step2 - CV PRO",
});
const onSubmit = handleSubmit(() => {
  const values: any[] = [];
  accordionItems.value.forEach((element) => {
    if (element.title == "PROFESSIONAL EXPERIENCE") {
      element.datas = itemsEditable.value;
    }
    values.push({ title: element.title, data: element.datas });
  });
  // console.log(values);
  window.localStorage.setItem("step_2", JSON.stringify(values));
  emit("submit");
});
const route = useNativeRoute();

const router = useRouter();
const template = route.query.template_id;

const showPreview = () => {
  const values: any[] = [];
  accordionItems.value.forEach((element) => {
    if (element.title == "PROFESSIONAL EXPERIENCE") {
      element.datas = itemsEditable.value;
    }
    values.push({ title: element.title, data: element.datas });
  });
  // console.log(values);
  window.localStorage.setItem("step_2", JSON.stringify(values));
  router.push({
    name: "app-cv-builder-preview-id",
    params: { id: template?.toString() },
  });
};
onMounted(() => {
  const step2 = window.localStorage.getItem("step_2");
  console.log(step2);
  if (step2) {
    const etape2: {
      title: string;
      data: {
        title: string;
        company: string;
        start_date: string;
        end_date: string;
        experience: string;
        grade: string;
        type: string;
        professionalTasksPerformed: string;
        jobTitle: string;
        startDate: string;
        endDate: string;
      }[];
    }[] = JSON.parse(`${step2}`);
    var education: any[] = [];
    var professional: any[] = [];
    var experience: any[] = [];
    var personal: any[] = [];
    etape2.forEach((element) => {
      if (element.title == "EDUCATION") {
        education = element.data;
      }
      if (element.title == "PROFESSIONAL EXPERIENCE") {
        experience = element.data;
      }
      if (element.title == "PROFESSIONAL SKILLS") {
        professional = element.data;
      }
      if (element.title == "PERSONAL SKILLS") {
        personal = element.data;
      }
    });

    itemsEditable.value = experience;
    accordionItems.value[1].datas = education;
    accordionItems.value[2].datas = personal;
    accordionItems.value[3].datas = professional;
  }
});
const onEdit = (e: Event) => {
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

const removeSavedExperience = (index: number) => {
  itemsEditable.value.splice(index, 1);
};

const itemsEditable = ref<any[]>([]);

const itemEditable = ref<number>(0);
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
    <form @submit="onSubmit" class="relative text-foreground">
      <Button
        @click="showPreview"
        type="button"
        class="absolute top-0 right-0 text-lg bg-white rounded-full shadow-sm shadow-primary/20 text-primary"
        variant="ghost"
        size="sm"
      >
        Preview
      </Button>
      <Accordion
        type="single"
        class="w-full pt-5"
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
                <div
                  v-if="itemIndex == 0"
                  class="flex flex-col-reverse overflow-y-auto max-h-52"
                >
                  <div
                    v-for="(save, index) in itemsEditable"
                    :key="index"
                    class="border-b bg-secondary/5"
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
                    <div class="flex gap-2 pb-2 pl-4">
                      <Button
                        @click="editSave(save, index)"
                        variant="outline"
                        class="p-1 bg-secondary hover:border-secondary h-fit hover:text-secondary"
                        type="button"
                        size="sm"
                      >
                        <Edit class="text-white size-4 hover:text-secondary"
                      /></Button>
                      <Button
                        @click="removeSavedExperience(index)"
                        variant="outline"
                        class="p-1 bg-secondary hover:border-secondary h-fit hover:text-secondary"
                        type="button"
                      >
                        <Trash class="text-white size-4 hover:text-secondary" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col-reverse overflow-y-auto max-h-52">
                  <div
                    v-for="(save, index) in item.datas"
                    :key="index"
                    class="gap-5 border-b border-l-2 cursor-pointer border-secondary bg-secondary/5 hover:bg-secondary/10"
                  >
                    <div
                      v-if="itemIndex > 1"
                      class="px-3 border-t-8 border-white"
                    >
                      <h3 class="my-2 font-semibold">
                        <span class="font-bold uppercase">Skill:</span>
                        {{ save.title }}
                      </h3>
                    </div>

                    <div v-if="itemIndex == 1" class="p-3">
                      <h3
                        class="my-2 font-semibold border-r border-secondary/50"
                      >
                        <span class="font-bold uppercase">Institution:</span>
                        {{ save.title }}
                      </h3>
                      <h3
                        class="my-2 font-semibold border-r border-secondary/50"
                      >
                        <span class="font-bold uppercase"
                          >Degree obtained and grade:</span
                        >
                        {{ save.grade }}
                      </h3>
                      <h3
                        class="my-2 font-semibold border-r border-secondary/50"
                      >
                        <span class="font-bold uppercase">Starting Date:</span>
                        {{ save.start_date }}
                      </h3>
                      <h3
                        class="my-2 font-semibold border-r border-secondary/50"
                      >
                        <span class="font-bold uppercase">Ending Date:</span>
                        {{ save.end_date }}
                      </h3>
                    </div>

                    <div
                      class="flex items-center justify-start gap-3 p-4 text-end"
                    >
                      <Button
                        @click="removeSaved(itemIndex, index)"
                        variant="outline"
                        class="p-1 bg-secondary hover:border-secondary h-fit hover:text-secondary"
                        type="button"
                      >
                        <Trash class="text-white size-4 hover:text-secondary" />
                      </Button>
                    </div>
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
            class=""
            title="share"
            size="sm"
          >
            <ArrowLeft />
            <span>Previous</span>
          </Button>
        </nuxt-link>
        <Button type="submit" size="sm" class="">
          <span>Next</span>
          <ArrowRight />
        </Button>
      </div>
    </form>
    <div
      v-if="booll"
      class="fixed top-0 left-0 z-20 flex items-end justify-center w-full h-full md:items-center bg-black/20"
    >
      <div
        class="z-50 w-full p-5 mt-10 overflow-hidden bg-white rounded-md md:w-1/3 md:p-10"
      >
        <form @submit="onEdit">
          <h3 class="text-xl text-center">Edit Work Experience</h3>
          <div
            class="w-full gap-6 p-2 space-y-2 border-l-2 md:grid md:grid-cols-2 md:space-y-0 border-secondary/50"
          >
            <div>
              <label class="text-sm">Job Title</label>

              <Input
                name="titleExperienceEdit"
                id="titleExperienceEdit"
                type="text"
                placeholder="Accountant"
                v-model="jobTitle"
              />
            </div>

            <div>
              <label class="text-sm">Company Name</label>

              <Input
                id="companyExperienceEdit"
                type="text"
                name="companyExperienceEdit"
                placeholder="Exco cmr"
                v-model="company"
              />
            </div>

            <div>
              <label class="text-sm">Starting Date</label>

              <Input
                id="startDateExperienceEdit"
                v-model="startDate"
                name="startDateExperienceEdit"
                type="month"
              />
            </div>

            <div>
              <label class="text-sm">Ending Date</label>
              <Input
                name="endDateExperienceEdit"
                id="endDateExperienceEdit"
                v-model="endDate"
                type="month"
              />
            </div>

            <div class="w-full col-span-2">
              <label class="text-sm">Tasks & Job description</label>

              <textarea
                name="experienceExperienceEdit"
                id="experienceExperienceEdit"
                class="w-full col-span-2 p-1 border border-black rounded-md focus-within:outline-none focus-within:border"
                v-model="professionalTasksPerformed"
              ></textarea>
            </div>
          </div>
          <div class="flex items-center p-4">
            <Button
              type="submit"
              class="px-6 space-x-3 bg-stone-500 border-stone-300"
              size="sm"
            >
              <span><Edit /> </span>Edit
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
