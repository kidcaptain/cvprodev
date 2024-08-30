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
    award: z.string().min(2).max(255),
    start_date: z.string(),
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
  award: props.item?.award,
  start_date: props.item?.start_date,
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
  const titleAward = document.getElementById("titleAward");
  const startDateAward = document.getElementById("startDateAward");
  const awardAward = document.getElementById("awardAward");
  titleAward.value = "";
  startDateAward.value = "";
  awardAward.value = "";
  defaultValues.value.title = null;
  defaultValues.value.award = null;
  defaultValues.value.start_date = null;
});

const experience_fields = [
  {
    name: "title",
    label: "Institution or Company",
    placeholder: "Company name",
    type: "text",
    class: "col-span-1",
    id: "titleAward",
  },
  {
    name: "start_date",
    label: "Date",
    placeholder: "e.g 2024-02-03 or 2024-03 or 2024",
    type: "text",
    class: "col-span-1",
    id: "startDateAward",
  },
  {
    name: "award",
    label: "Award or honor obtained",
    placeholder: "Best employee of the year",
    class: "col-span-2",
    id: "awardAward",
  },
];
</script>

<template>
  <form @submit="onSubmit">
    <div
      class="grid items-end w-full grid-cols-2 gap-6 p-2 border-l-2 bg- border-secondary/50"
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
        <Button type="submit" class="px-2 w-fit"><Plus /> <span>Add </span> </Button>
      </div>
    </div>
  </form>
</template>
