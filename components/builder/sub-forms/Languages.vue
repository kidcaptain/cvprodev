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
import { Slider } from "@/components/ui/slider";

import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(255),
    type: z.string().min(2).max(255),
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
  type: props.item?.title,
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
  defaultValues.value.title = null;
});

const experience_fields = [
  {
    name: "title",
    label: "Language",
    placeholder: "Type your skill here",
    type: "text",
  },
  {
    name: "type",
    label: "Elementary level",
    placeholder: "Type your skill here",
    type: "radio",
    value: "Elementary level",
  },
  {
    name: "type",
    label: "Independent level",
    placeholder: "Type your skill here",
    type: "radio",
    value: "Independent level",
  },
  {
    name: "type",
    label: "Experienced level",
    placeholder: "Type your skill here",
    type: "radio",
    value: "Experienced level",
  },
];
</script>

<template>
  <form @submit="onSubmit">
    <div
      class="items-start w-full gap-6 p-2 space-y-6 border-l-2 md:space-y-0 md:flex border-secondary/50"
    >
      <template v-for="field in experience_fields">
        <FormField
          v-slot="{ componentField }"
          :name="field.name"
          :class="field.class"
          :value="defaultValues[field.name]"
        >
          <FormItem class="w-full" :class="field.class">
            <FormLabel
              >{{ field.label }}
              <span class="font-light" v-if="field.name == 'level'"></span>
            </FormLabel>
            <FormControl class="w-full">
              <!-- <Slider
                v-if="field.type == 'range'"
                :default-value="[33]"
                v-bind="componentField"
                :max="100"
                :step="1"
              /> -->
              <Input
                :value="field.value"
                required
                v-if="field.type == 'radio'"
                class="w-full size-5"
                :type="field.type ? field.type : 'text'"
                :placeholder="field.placeholder"
                v-bind="componentField"
              />
              <Input
                required
                v-else
                class="w-full"
                :type="field.type ? field.type : 'text'"
                :placeholder="field.placeholder"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </template>
      <div class="flex items-end">
        <Button type="submit" class="px-6 space-x-3">
          <Plus /> <span>Add</span>
        </Button>
      </div>
    </div>
  </form>
</template>
