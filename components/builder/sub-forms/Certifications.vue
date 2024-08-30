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
  grade: props.item?.grade,
  start_date: props.item?.start_date,
  end_date: props.item?.end_date,
});

const onSubmit = handleSubmit((values) => {
  const date1 = new Date(values.start_date);
  const date2 = new Date(values.end_date);
  if (date1 < date2) {
    messageError.value = ""

    emit("submit", values);
    const titleCertification = document.getElementById("titleCertification");
    const gradeCertification = document.getElementById("gradeCertification");
    const startDateCertification = document.getElementById(
      "startDateCertification"
    );
    const endingDateCertification = document.getElementById(
      "endingDateCertification"
    );

    titleCertification.value = "";
    gradeCertification.value = "";
    startDateCertification.value = "";
    endingDateCertification.value = "";

    defaultValues.value.title = null;
    defaultValues.value.grade = null;
    defaultValues.value.start_date = null;
    defaultValues.value.end_date = null;
  }else{
    messageError.value = "The start date is greater than the end date"
  }
});

const experience_fields = [
  {
    name: "title",
    label: "Institution",
    placeholder: "University of XXXXX",
    type: "text",
    class: "col-span-2",
    id: "titleCertification",
  },
  {
    name: "grade",
    label: "Degree obtained and grade",
    placeholder: "XXXXXX degree in XXXXXXXX",
    class: "col-span-2",
    id: "gradeCertification",
  },
  {
    name: "start_date",
    label: "Starting Date",
    type: "text",
    placeholder: "e.g 2024-01-20",
    id: "startDateCertification",
  },
  {
    name: "end_date",
    label: "Ending Date",
    type: "text",
    placeholder: "e.g 2024-02-20",
    id: "endingDateCertification",
  },
];
const messageError = ref("");
</script>

<template>
  <form @submit="onSubmit">
    <span class="text-red-500">{{ messageError }}</span>
    <div
      class="grid w-full grid-cols-2 gap-6 p-2 border-l-2 bg- border-secondary/50"
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
             
              <Input
                
                :type="field.type ? field.type : 'text'"
                :placeholder="field.placeholder"
                v-bind="componentField"
                :id="field.id"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </template>
      <div>
        <Button class="px-6 space-x-3"> <Plus /> <span>Add </span> </Button>
      </div>
    </div>
  </form>
</template>
