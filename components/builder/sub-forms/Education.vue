<script setup>
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";

import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(255),
    grade: z.string().min(2).max(255),
    city: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    field_of_study: z.string(),
    grade_obtained: z.string(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const emit = defineEmits(["submit"]);
const props = defineProps({
  item: {
    type: Object,
  },
});
const defaultValues = ref({
  title: props.item?.title,
  grade: props.item?.grade,
  start_date: props.item?.start_date,
  end_date: props.item?.end_date,
  city: props.item?.city,
  field_of_study: props.item?.field_of_study,
  grade_obtained: props.item?.grade_obtained,
});

const onSubmit = handleSubmit((values) => {
  const title = values.title;
  const grade = values.grade;
  const startDate = values.start_date;
  const endDate = values.end_date;
  const city = values.city;
  const fieldOfStudy = values.field_of_study;
  const gradeOfObtained = values.grade_obtained;
  const tasksPerformed = tasks.value;
  tasks.value = []; 
  emit("submit", {
    title: title,
    grade: grade,
    start_date: startDate,
    end_date: endDate,
    city: city,
    field_of_study: fieldOfStudy,
    grade_obtained: gradeOfObtained,
    tasks_performed: tasksPerformed
  });
  values.title = "";
  values.grade = "";
  values.start_date = "";
  values.end_date = "";
  values.city = "";
  values.field_of_study = "";
  values.grade_obtained = "";
  const titleEducation = document.getElementById("titleEducation");
  const gradeEducation = document.getElementById("gradeEducation");
  const startDateEducation = document.getElementById("startDateEducation");
  const endDateEducation = document.getElementById("endDateEducation");
  const cityEducation = document.getElementById("cityEducation");
  const gradeObtainedEducation = document.getElementById(
    "gradeObtainedEducation"
  );
  const fieldOfStudyEducation = document.getElementById(
    "fieldOfStudyEducation"
  );
  if (
    titleEducation &&
    gradeEducation &&
    startDateEducation &&
    endDateEducation &&
    cityEducation &&
    fieldOfStudyEducation &&
    gradeObtainedEducation
  ) {
    endDateEducation.value = "";
    startDateEducation.value = "";
    titleEducation.value = "";
    gradeEducation.value = "";
    cityEducation.value = "";
    fieldOfStudyEducation.value = "";
    gradeObtainedEducation.value = "";
  }

});

const experience_fields = [
  {
    name: "title",
    label: "Institution",
    placeholder: "University of XXXXX",
    type: "text",
    class: "col-span-2",
    id: "titleEducation",
    facultative: true,
    type: "text",
  },
  {
    name: "grade",
    label: "Diploma obtained",
    placeholder: "",
    class: "col-span-1",
    id: "gradeEducation",
    facultative: true,
    type: "text",
  },
  {
    name: "city",
    label: "City",
    placeholder: "",
    class: "col-span-1",
    id: "cityEducation",
    facultative: true,
    type: "text",
  },
  {
    name: "field_of_study",
    label: "Field of study",
    placeholder: "",
    class: "col-span-1",
    id: "fieldOfStudyEducation",
    facultative: true,
    type: "text",
  },
  {
    name: "grade_obtained",
    label: "Grade obtained",
    placeholder: "",
    class: "col-span-1",
    id: "gradeObtainedEducation",
    facultative: true,
    type: "text",
  },
  {
    name: "taskPerformed",
    label: "Tasks performed",
    placeholder: "",
    class: "col-span-2",
    type: "textarea",
    id: "taskPerformedEducation",
    facultative: true,
  },
  {
    name: "start_date",
    label: "Starting Date",
    class: "col-span-1",
    placeholder: "",
    type: "month",
    id: "startDateEducation",
    facultative: true,
  },
  {
    name: "end_date",
    label: "Ending Date",
    class: "col-span-1",
    placeholder: "",
    type: "month",
    id: "endDateEducation",
    facultative: true,
  },
];
const tasks = ref([]);
const indexToEdited = ref(0);
const isedited = ref(false);
const task = ref("");
const addTask = () => {
  let tab = [];
  tab = tasks.value;
  if (isedited.value) {
    tab[indexToEdited.value] = task.value;
    tasks.value = tab;
    task.value = "";
    isedited.value = false;
  } else {
    tab.push(task.value);
    tasks.value = tab;
    task.value = "";
  }
};
const getItem = (item, index) => {
  isedited.value = true;
  task.value = item;
  indexToEdited.value = index;
};
</script>

<template>
  <form @submit="onSubmit">
    <div
      class="w-full gap-6 p-2 space-y-6 border-l-2 md:grid md:grid-cols-2 md:space-y-0 border-secondary/50"
    >
      <template v-for="field in experience_fields">
        <FormField
          v-slot="{ componentField }"
          :name="field.name"
          :class="field.class"
          :value="defaultValues[field.name]"
        >
          <FormItem :class="field.class">
            <FormLabel>{{ field.label }}</FormLabel>
            <FormControl>
              <div v-if="field.type == 'textarea'">
                <ul
                  id="experienceExperienceEdit"
                  class="w-full h-20 overflow-y-auto col-span-2 min-h-20 bg-gray-50 p-2 border border-black"
                >
                  <li
                    class="cursor-pointer"
                    v-for="(tache, index) in tasks"
                    @click="getItem(tache, index)"
                    :key="index"
                  >
                    {{ tache }}
                  </li>
                </ul>
                <Input
                  placeholder="Add task"
                  type="text"
                  v-model="task"
                  class="my-1"
                />
                <Button
                  @click="addTask"
                  type="button"
                  size="sm"
                  variant="ghost"
                  class="w-fit border text-xs space-x-3"
                >
                  {{ !isedited ? "Add task" : "Edit task" }}
                </Button>
              </div>
              <Input
                v-else
                :id="field.id"
                :type="field.type ? field.type : 'text'"
                :placeholder="field.placeholder"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </template>
      <div>
        <Button type="submit" class="w-fit px-2">
          <Plus :size="15" /> <span>Add</span>
        </Button>
      </div>
    </div>
  </form>
</template>
