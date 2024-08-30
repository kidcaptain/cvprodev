<script setup>
import { Plus } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";

import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(255),
    company: z.string().min(2).max(255),
    start_date: z.string(),
    end_date: z.string(),
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
  company: props.item?.company,
  start_date: props.item?.start_date,
  end_date: props.item?.end_date,
});

const onSubmit = handleSubmit((values) => {
  const date1 = new Date(values.start_date);
  const date2 = new Date(values.end_date);
  const tasksPerformed = tasks.value;
  if (date1 < date2) {
    messageError.value = "";
    emit("submit", {
      title: values.title,
      company: values.company,
      start_date: values.start_date,
      end_date: values.end_date,
      tasks: tasksPerformed,
    });
    tasks.value = [];
    const titleProject = document.getElementById("titleProject");
    const companyProject = document.getElementById("companyProject");
    const startDateProject = document.getElementById("startDateProject");
    const endDateProject = document.getElementById("endDateProject");
    startDateProject.value = "";
    endDateProject.value = "";
    companyProject.value = "";
    titleProject.value = "";
    defaultValues.value.title = null;
    defaultValues.value.company = null;
    defaultValues.value.start_date = null;
    defaultValues.value.end_date = null;
  } else {
    messageError.value = "The start date is greater than the end date";
  }
});

const projects_fields = [
  {
    name: "title",
    label: "Project Title",
    placeholder: "John",
    type: "text",
    id: "titleProject",
  },
  {
    name: "company",
    label: "Company Name",
    placeholder: "Doe",
    id: "companyProject",
  },
  {
    name: "start_date",
    label: "Starting Date",
    type: "month",
    id: "startDateProject",
  },
  {
    name: "end_date",
    label: "Ending Date",
    type: "month",
    id: "endDateProject",
  },
  {
    name: "tasks",
    label: "Tasks performed",
    type: "textarea",
    class: "col-span-2",
    id: "tasksProject",
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
const messageError = ref("");
</script>

<template>
  <form @submit="onSubmit">
    <span class="text-red-500">{{ messageError }}</span>
    <div
      class="w-full gap-6 p-2 space-y-6 border-l-2 md:grid md:grid-cols-2 md:space-y-0 border-secondary/50"
    >
      <template v-for="field in projects_fields">
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
                  class="w-full h-20 col-span-2 p-2 overflow-y-auto border border-black min-h-20 bg-gray-50"
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
                  class="space-x-3 text-xs border w-fit"
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
        <Button class="px-6 space-x-3">
          <Plus /> <span>Add expérience</span>
        </Button>
      </div>
    </div>
  </form>
</template>
