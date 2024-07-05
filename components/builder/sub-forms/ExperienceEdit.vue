<script setup>
import { Plus } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";

import * as z from "zod";
import { type } from "os";

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(255),
    company: z.string().min(2).max(255),
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


const onSubmit = handleSubmit((values) => {
  const titleExperience = document.getElementById("titleExperience").value;
  const companyExperience = document.getElementById("companyExperience").value;
  const startDateExperience = document.getElementById(
    "startDateExperience"
  ).value;
  const endDateExperience = document.getElementById("endDateExperience").value;
  const experienceExperience = document.getElementById(
    "experienceExperience"
  ).value;

  emit("submit", {
    title: titleExperience,
    company: companyExperience,
    start_date: startDateExperience,
    end_date: endDateExperience,
    experience: experienceExperience,
  });
  if (
    titleExperience &&
    companyExperience &&
    startDateExperience &&
    endDateExperience &&
    experienceExperience
  ) {
    titleExperience.value = "";
    companyExperience.value = "";
    startDateExperience.value = "";
    endDateExperience.value = "";
    experienceExperience.value = "";
  }
  z;

  // values.start_date = "";
  // values.end_date = "";
  // values.experience = "";
});

const experience_fields = [
  {
    name: "title",
    label: "Job Title",
    placeholder: "Accountant",
    type: "text",
    id: "titleExperience",
    require: true,
  },
  {
    name: "company",
    label: "Company Name",
    placeholder: "Exco cmr",
    id: "companyExperience",
    require: true,
  },
  {
    name: "start_date",
    label: "Starting Date",
    type: "month",
    require: true,
    id: "startDateExperience",
  },
  {
    name: "end_date",
    label: "Ending Date",
    type: "month",
    require: true,
    id: "endDateExperience",
  },
  {
    name: "experience",
    label: "Tasks & Job description",
    type: "textarea",
    class: "col-span-2",
    require: true,
    id: "experienceExperience",
  },
];
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
          
        >
          <FormItem :class="field.class">
            <FormLabel>{{ field.label }}</FormLabel>
            <FormControl>
              <Textarea
                v-if="field.type == 'textarea'"
                class="w-full"
                v-bind="componentField"
                :placeholder="field.placeholder"
                :id="field.id"
              />
              <Input
                v-else
                :require="field.require"
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
        <Button v-if="!props.item?.isactived" type="submit" class="px-6 space-x-3">
          <Plus /> <span>Add expérience</span>
        </Button>
        <Button v-else class="px-6 space-x-3">
          <span>Save</span>
        </Button>
      </div>
    </div>
  </form>
</template>
