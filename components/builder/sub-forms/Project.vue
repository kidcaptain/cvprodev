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
    tasks: z.string().min(8),
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
  tasks: props.item?.tasks,
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
  const titleProject = document.getElementById("titleProject");
  const companyProject = document.getElementById("companyProject");
  const startDateProject = document.getElementById("startDateProject");
  const tasksProject = document.getElementById("tasksProject");
  const endDateProject = document.getElementById("endDateProject");
  tasksProject.value = "";
  startDateProject.value = "";
  endDateProject.value = "";
  companyProject.value = "";
  titleProject.value = "";
  defaultValues.value.title = null;
  defaultValues.value.company = null;
  defaultValues.value.start_date = null;
  defaultValues.value.end_date = null;
  defaultValues.value.tasks = null;
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
</script>

<template>
  <form @submit="onSubmit">
    <div
      class="p-2 w-full md:grid md:grid-cols-2 gap-6 space-y-6 md:space-y-0 border-l-2 border-secondary/50"
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
              <Textarea
                v-if="field.type == 'textarea'"
                class="w-full"
                v-bind="componentField"
                :placeholder="field.placeholder"
              ></Textarea>
              <Input
                v-else
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
