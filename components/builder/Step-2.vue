<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRoute as useNativeRoute } from "vue-router";
import {
  ArrowRight,
  ArrowLeft,
  Trash,
  Edit,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-vue-next";
import { useForm } from "vee-validate";

import Experience from "@/components/builder/sub-forms/Experience.vue";

import Skills from "@/components/builder/sub-forms/Skills.vue";
import Education from "@/components/builder/sub-forms/Education.vue";
import Languages from "@/components/builder/sub-forms/Languages.vue";
import Hobbies from "@/components/builder/sub-forms/Hobbies.vue";
import Award from "@/components/builder/sub-forms/Award.vue";
import Certifications from "@/components/builder/sub-forms/Certifications.vue";
import Project from "@/components/builder/sub-forms/Project.vue";
import References from "@/components/builder/sub-forms/References.vue";

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
    description:
      "List your positions in chronological order, starting with the most recent position held.",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
    datas: Array<any>(),
    form: Experience,
  },
  {
    value: "item-2",
    title: "EDUCATION",
    description:
      "List all the schools/institutions you have studied in. Mention anything that is relevant to the position you are applying for.",
    datas: Array<any>(),
    content:
      "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    form: Education,
  },
  {
    value: "item-3",
    title: "PERSONAL SKILLS",
    description:
      "List the skills that are worth mentioning in relation to the position you are applying for.",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: Skills,
  },
  {
    value: "item-4",
    title: "PROFESSIONAL SKILLS",
    description:
      "List the skills that are worth mentioning in relation to the position you are applying for.",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: Skills,
  },
  {
    value: "item-5",
    title: "LANGUAGES",
    description:
      "List the languages ​​you are proficient in that are relevant to the position you are applying for.",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: Languages,
  },
  {
    value: "item-6",
    title: "HOBBIES/INTERESTS",
    description: "List your hobbies and interests",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: Hobbies,
  },
  {
    value: "item-7",
    title: "CERTIFICATIONS",
    description: "List your certifications.",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: Certifications,
  },
  {
    value: "item-8",
    title: "AWARD & DISTINCTIONS",
    description: "List your recognitions",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: Award,
  },
  {
    value: "item-9",
    title: "REFERENCES",
    description:
      "Mention major references that are relevant to the position you are applying for.",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: References,
  },
  {
    value: "item-10",
    title: "PROJECTS",
    description:
      "Mention major references that are relevant to the position you are applying for.",
    datas: Array<any>(),
    content: "Yes! You can use the transition prop to configure the animation.",
    form: Project,
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
const upTab = (item: any, index: number, list: any[]) => {
  let tab = list;
  if (index + 1 < tab.length) {
    tab[index] = tab[index + 1];
    tab[index + 1] = item;
  } else {
  }
};

const downTab = (item: any, index: number, list: any[]) => {
  let tab = list;
  if (index - 1 >= 0) {
    tab[index] = tab[index - 1];
    tab[index - 1] = item;
  }
};
const setState = (str: string) => {
  document.execCommand(str, false);
  const editor = document.getElementById("experienceExperienceEdit");
  if (editor) {
    editor.focus();
  }
};
const Undo = ref(false);
const redo = ref(false);
const hr = ref(false);
const bold = ref(false);
const italic = ref(false);
const underline = ref(false);
const strikeThrough = ref(false);
const justifyLeft = ref(false);
const justifyRight = ref(false);
const justifyFull = ref(false);
const indent = ref(false);
const outdent = ref(false);
const subscript = ref(false);
const superscript = ref(false);
const onChangeEditor = () => {
  const tache = document.getElementById("experienceExperienceEdit");
  if (tache) {
    if (tache.innerHTML == "") {
      bold.value = false;
      italic.value = false;
      underline.value = false;
    }
  }
};
const editSave = (item: any, index: number) => {
  booll.value = true;
  setTimeout(() => {
    itemEditable.value = index;
    jobTitle.value = item.jobTitle;
    company.value = item.company;
    startDate.value = item.startDate;
    endDate.value = item.endDate;
    professionalTasksPerformed.value = item.professionalTasksPerformed;
  }, 2000);
};
</script>
<style scoped>
.elt::first-letter {
  text-transform: uppercase !important;
}
.btn-item:hover .icon {
  color: brown;
}

.editor-2 {
  min-height: 150px;
  width: 100%;
  border: 1px solid black;
}
.element-editor {
  background-color: white;
  border: 1px solid silver;
  padding: 8px;
}
</style>
<template>
  <div class="">
    <form @submit="onSubmit" class="relative text-foreground">
      <Accordion
        type="single"
        class="w-full pt-8"
        collapsible
        :default-value="defaultValue"
      >
        <AccordionItem
          v-for="(item, itemIndex) in accordionItems"
          :key="item.value"
          :value="item.value"
        >
          <AccordionTrigger class="sticky font-bold"
            >{{ item.title }}
          </AccordionTrigger>

          <AccordionContent class="md:pl-5">
            <p class="mb-3">
              {{ item.description }}
            </p>
            <div class="space-y-2">
              <div>
                <div
                  v-if="itemIndex == 0"
                  class="flex flex-col-reverse p-2 overflow-y-auto max-h-64"
                >
                  <div
                    v-for="(save, index) in itemsEditable"
                    :key="index"
                    class="my-1 border border-stone-200"
                  >
                    <div class="p-4 text-white bg-primary">
                      Experience ({{ index + 1 }})
                    </div>
                    <div>
                      <div class="border-b border-b-stone-200 text-md">
                        <h3 class="px-4 py-2 font-bold uppercase bg-stone-100">
                          Job Title
                        </h3>
                        <p class="px-4 py-2 elt">{{ save.jobTitle }}</p>
                      </div>
                      <div class="border-b text-md border-b-stone-200">
                        <h3 class="px-4 py-2 font-bold uppercase bg-stone-100">
                          Company
                        </h3>
                        <p class="px-4 py-2 elt">{{ save.company }}</p>
                      </div>
                      <div class="border-b text-md border-b-stone-200">
                        <h3 class="px-4 py-2 font-bold uppercase bg-stone-100">
                          Period
                        </h3>
                        <p class="px-4 py-2 font-semibold elt">
                          {{ save.startDate }} - {{ save.endDate }}
                        </p>
                      </div>
                      <div class="border-b text-md border-b-stone-200">
                        <h3 class="px-4 py-2 font-bold uppercase bg-stone-100">
                          Tasks performed:
                        </h3>
                        <div
                          v-html="save.professionalTasksPerformed"
                          class="px-4 py-2"
                        ></div>
                      </div>
                      <div class="flex gap-2 px-4 py-2">
                        <Button
                          @click="downTab(save, index, itemsEditable)"
                          variant="outline"
                          class="flex gap-2 p-1 px-2 text-white btn-item bg-primary item-center hover:border-secondary h-fit hover:text-secondary"
                          type="button"
                          size="sm"
                        >
                          <ArrowBigDown
                            class="text-white icon size-4 hover:text-secondary"
                        /></Button>
                        <Button
                          @click="upTab(save, index, itemsEditable)"
                          variant="outline"
                          class="flex gap-2 p-1 px-2 text-white btn-item bg-primary item-center hover:border-secondary h-fit hover:text-secondary"
                          type="button"
                          size="sm"
                        >
                          <ArrowBigUp
                            class="text-white icon size-4 hover:text-secondary"
                        /></Button>
                        <Button
                          @click="editSave(save, index)"
                          variant="outline"
                          class="flex gap-2 p-1 px-2 text-white bg-yellow-500 btn-item item-center hover:border-secondary h-fit hover:text-secondary"
                          type="button"
                          size="sm"
                        >
                          <Edit
                            class="text-white icon size-4 hover:text-secondary"
                          />Edit</Button
                        >
                        <Button
                          @click="removeSavedExperience(index)"
                          variant="outline"
                          class="flex gap-2 p-1 px-2 text-white bg-red-500 btn-item item-center hover:border-secondary h-fit hover:text-secondary"
                          type="button"
                        >
                          <Trash
                            class="text-white icon size-4 hover:text-secondary"
                          />Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col-reverse p-2 overflow-y-auto max-h-64">
                  <div
                    v-for="(save, index) in item.datas"
                    :key="index"
                    class="gap-5 mt-1 border border-stone-200"
                  >
                    <div
                      v-if="itemIndex == 2 || itemIndex == 3 || itemIndex == 5"
                      class="flex gap-4 p-2 font-semibold list-decimal"
                      :class="
                        index % 2 == 0
                          ? 'bg-gray-400 text-black'
                          : 'bg-gray-50 text-stone-800'
                      "
                    >
                      <div
                        class="flex items-center justify-center text-xs bg-white rounded-full shadow-xl text-primary size-6"
                      >
                        {{ 1 + index }}
                      </div>
                      <p class="elt">{{ save.title }}</p>
                    </div>
                    <div
                      v-if="itemIndex == 4"
                      class="flex gap-4 p-2 font-semibold list-decimal"
                    >
                      <p class="elt">
                        <span class="font-bold text-primary">{{
                          save.title
                        }}</span>
                        (<span class="text-stone-700">{{ save.level }}</span
                        >)
                      </p>
                    </div>

                    <div v-if="itemIndex == 6">
                      <h2 class="p-4 text-white bg-primary">
                        certifications ({{ index + 1 }})
                      </h2>
                      <div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Institution
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.title }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Degree obtained and grade
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.grade }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Starting Date
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.start_date }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Ending Date
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.end_date }}</p>
                        </div>
                      </div>
                    </div>
                    <div v-if="itemIndex == 7">
                      <h2 class="p-4 text-white bg-primary">
                        Award And Distinctions ({{ index + 1 }})
                      </h2>
                      <div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Institution/Company
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.title }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Award or honor obtained
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.award }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Date
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.start_date }}</p>
                        </div>
                      </div>
                    </div>
                    <div v-if="itemIndex == 8">
                      <h2 class="p-4 text-white bg-primary">
                        Reference ({{ index + 1 }})
                      </h2>
                      <div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Institution Name
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.title }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Position Occupied
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.position }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            References's name
                          </h3>
                          <p class="px-4 py-2 elt">
                            {{ save.references_name }}
                          </p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Reference's phone
                          </h3>
                          <p class="px-4 py-2 elt">
                            {{ save.references_phone }}
                          </p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            reference's Email
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.email }}</p>
                        </div>
                      </div>
                    </div>
                    <div v-if="itemIndex == 9">
                      <h2 class="p-4 text-white bg-primary">
                        Project ({{ index + 1 }})
                      </h2>
                      <div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Project Title
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.title }}</p>
                        </div>

                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Company Name
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.company }}</p>
                        </div>

                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Starting Date
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.start_date }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Ending Date
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.end_date }}</p>
                        </div>
                        <div
                          v-if="save.tasks"
                          class="border-b text-md border-b-stone-200"
                        >
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Tasks performed:
                          </h3>
                          <div v-html="save.tasks" class="px-4 py-2"></div>
                        </div>
                      </div>
                    </div>
                    <div v-if="itemIndex == 1">
                      <h2 class="p-4 text-white bg-primary">
                        schools/institutions ({{ index + 1 }})
                      </h2>
                      <div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Institution
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.title }}</p>
                        </div>
                        <div
                          v-if="save.city && save.city != ''"
                          class="border-b border-b-stone-200 text-md"
                        >
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            City
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.city }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Diploma obtained
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.grade }}</p>
                        </div>
                        <div
                          v-if="
                            save.field_of_study && save.field_of_study != ''
                          "
                          class="border-b border-b-stone-200 text-md"
                        >
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Field of study
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.field_of_study }}</p>
                        </div>
                        <div
                          v-if="
                            save.grade_obtained && save.grade_obtained != ''
                          "
                          class="border-b border-b-stone-200 text-md"
                        >
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Grade obtained
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.grade_obtained }}</p>
                        </div>

                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Starting Date
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.start_date }}</p>
                        </div>
                        <div class="border-b border-b-stone-200 text-md">
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Ending Date
                          </h3>
                          <p class="px-4 py-2 elt">{{ save.end_date }}</p>
                        </div>
                        <div
                          v-if="save.tasks_performed"
                          class="border-b text-md border-b-stone-200"
                        >
                          <h3
                            class="px-4 py-2 font-bold uppercase bg-stone-100"
                          >
                            Tasks performed:
                          </h3>
                          <div
                            v-html="save.tasks_performed"
                            class="px-4 py-2"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-end gap-2 px-4 py-2 bg-white">
                      <Button
                        @click="downTab(save, index, item.datas)"
                        variant="outline"
                        class="flex gap-2 p-1 px-2 text-white btn-item bg-primary item-center hover:border-secondary h-fit hover:text-secondary"
                        type="button"
                        size="sm"
                      >
                        <ArrowBigDown
                          class="text-white icon size-4 hover:text-secondary"
                      /></Button>
                      <Button
                        @click="upTab(save, index, item.datas)"
                        variant="outline"
                        class="flex gap-2 p-1 px-2 text-white btn-item bg-primary item-center hover:border-secondary h-fit hover:text-secondary"
                        type="button"
                        size="sm"
                      >
                        <ArrowBigUp
                          class="text-white icon size-4 hover:text-secondary"
                      /></Button>
                      <Button
                        @click="removeSaved(itemIndex, index)"
                        variant="outline"
                        class="flex gap-2 p-1 px-2 text-white bg-red-500 btn-item item-center hover:border-secondary h-fit hover:text-secondary"
                        type="button"
                      >
                        <Trash
                          class="text-white icon size-4 hover:text-secondary"
                        />Delete
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

            <div class="col-span-2">
              <div class="editor-commands">
                <ul class="flex gap-2 flex-wrap">
                  <li>
                    <button
                      type="button"
                      @click="() => setState('undo')"
                      class="cursor-pointer"
                    >
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M4 7H15C16.8692 7 17.8039 7 18.5 7.40193C18.9561 7.66523 19.3348 8.04394 19.5981 8.49999C20 9.19615 20 10.1308 20 12C20 13.8692 20 14.8038 19.5981 15.5C19.3348 15.9561 18.9561 16.3348 18.5 16.5981C17.8039 17 16.8692 17 15 17H8.00001M4 7L7 4M4 7L7 10"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g></svg
                      ><span class="hidden">Undo</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      @click="() => setState('redo')"
                      class="cursor-pointer"
                    >
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M16.8701 18.3101H8.87012C6.11012 18.3101 3.87012 16.0701 3.87012 13.3101C3.87012 10.5501 6.11012 8.31006 8.87012 8.31006H19.8701"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M17.5701 10.8099L20.1301 8.24994L17.5701 5.68994"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g></svg
                      ><span class="hidden">Redo</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      @click="() => setState('insertHorizontalRule')"
                      class="cursor-pointer p-2"
                    >
                      hr
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      @click="
                        () => {
                          setState('bold');
                          bold = !bold;
                        }
                      "
                      :class="bold ? 'activate' : ''"
                      class="cursor-pointer font-bold"
                    >
                      <span>B</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      @click="
                        () => {
                          setState('italic');
                          italic = !italic;
                        }
                      "
                      :class="italic ? 'activate' : ''"
                    >
                      <span class="italic">i</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      @click="
                        () => {
                          setState('underline');
                          underline = !underline;
                        }
                      "
                      :class="underline ? 'activate' : ''"
                      class="cursor-pointer underline"
                    >
                      U
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      @click="
                        () => {
                          setState('justifyLeft');
                          justifyLeft = !justifyLeft;
                        }
                      "
                      class="cursor-pointer"
                    >
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M5 7H19"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M5 12L14 12"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M5 17L19 17"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g></svg
                      ><span class="hidden">justify left</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      @click="
                        () => {
                          setState('justifyCenter');
                        }
                      "
                      class="cursor-pointer"
                    >
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M5 7H19"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M8 12L16 12"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M5 17L19 17"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                      </svg>
                      <span class="hidden">justify center</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      @click="
                        () => {
                          setState('justifyRight');
                          justifyRight = !justifyRight;
                        }
                      "
                      class="cursor-pointer"
                    >
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M5 7H19"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M10 12L19 12"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M5 17L19 17"
                            stroke="#000000"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                      </svg>
                      <span class="hidden">justify right</span>
                    </button>
                  </li>

                  <li>
                    <button
                      data-command="indent"
                      type="button"
                      @click="
                        () => {
                          setState('indent');
                          indent = !indent;
                        }
                      "
                      class="cursor-pointer"
                    >
                      <svg
                        width="64px"
                        height="64px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.5 6C10.9477 6 10.5 6.44772 10.5 7C10.5 7.55228 10.9477 8 11.5 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H11.5ZM15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H15ZM12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H12ZM7.70711 8.29289C7.31658 7.90237 6.68342 7.90237 6.29289 8.29289C5.90237 8.68342 5.90237 9.31658 6.29289 9.70711L7.58579 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H7.58579L6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071C6.68342 16.0976 7.31658 16.0976 7.70711 15.7071L10.7071 12.7071C11.0976 12.3166 11.0976 11.6834 10.7071 11.2929L7.70711 8.29289Z"
                            fill="#000000"
                          ></path>
                        </g>
                      </svg>
                      <span class="hidden"></span>
                    </button>
                  </li>
                  <li>
                    <button
                      @click="
                        () => {
                          setState('outdent');
                          outdent = !outdent;
                        }
                      "
                      type="button"
                      class="cursor-pointer"
                    >
                      <svg
                        width="64px"
                        height="64px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11 6C10.4477 6 10 6.44772 10 7C10 7.55228 10.4477 8 11 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H11ZM15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13L20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L15 11ZM11 16C10.4477 16 10 16.4477 10 17C10 17.5523 10.4477 18 11 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H11ZM7.70711 9.70711C8.09763 9.31658 8.09763 8.68342 7.70711 8.29289C7.31658 7.90237 6.68342 7.90237 6.29289 8.29289L3.29289 11.2929C2.90237 11.6834 2.90237 12.3166 3.29289 12.7071L6.29289 15.7071C6.68342 16.0976 7.31658 16.0976 7.70711 15.7071C8.09763 15.3166 8.09763 14.6834 7.70711 14.2929L6.41421 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6.41421L7.70711 9.70711Z"
                            fill="#000000"
                          ></path>
                        </g>
                      </svg>
                      <span class="hidden">outdent</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="cursor-pointer"
                      @click="
                        () => {
                          setState('subscript');
                          subscript = !subscript;
                        }
                      "
                    >
                      <svg
                        fill="#000000"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M19,3V5a1,1,0,0,1-2,0V4H12V16h2a1,1,0,0,1,0,2H8a1,1,0,0,1,0-2h2V4H5V5A1,1,0,0,1,3,5V3A1,1,0,0,1,4,2H18A1,1,0,0,1,19,3Zm1.555,14.832A1,1,0,0,0,21,17V15a1,1,0,0,0-1-1H17a1,1,0,0,0,0,2h2v.465l-2.555,1.7A1,1,0,0,0,16,19v2a1,1,0,0,0,1,1h3a1,1,0,0,0,0-2H18v-.465Z"
                          ></path>
                        </g>
                      </svg>
                      <span class="hidden">subscript</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="cursor-pointer"
                      @click="
                        () => {
                          setState('superscript');
                          superscript = !superscript;
                        }
                      "
                    >
                      <svg
                        fill="#000000"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M1,10V8A1,1,0,0,1,2,7H16a1,1,0,0,1,1,1v2a1,1,0,0,1-2,0V9H10V21h2a1,1,0,0,1,0,2H6a1,1,0,0,1,0-2H8V9H3v1a1,1,0,0,1-2,0ZM22,1H19a1,1,0,0,0,0,2h2v.465l-2.555,1.7A1,1,0,0,0,18,6V8a1,1,0,0,0,1,1h3a1,1,0,0,0,0-2H20V6.535l2.555-1.7A1,1,0,0,0,23,4V2A1,1,0,0,0,22,1Z"
                          ></path>
                        </g>
                      </svg>
                      <span class="hidden">superscript</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div
                class="editor mt-8 p-2"
                id="experienceExperienceEdit"
                contenteditable="true"
                @keyup="onChangeEditor"
              ></div>
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
