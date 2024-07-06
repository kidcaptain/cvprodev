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
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
  const hobbie = document.getElementById("hobbie");
  hobbie.value = "";
  defaultValues.value.title = null;
});

const experience_fields = [
  {
    name: "title",
    label: "Edit Skill",
    placeholder: "Type your skill here",
    type: "text",
    id: "hobbie",
  },
];
</script>

<template>
  <form @submit="onSubmit">
    <div class="p-2 w-full flex gap-6 bg- border-l-2 border-secondary/50">
      <template v-for="field in experience_fields">
        <FormField
          v-slot="{ componentField }"
          :name="field.name"
          :class="field.class"
          :value="defaultValues[field.name]"
        >
          <FormItem class="w-full" :class="field.class">
            <FormLabel>{{ field.label }}</FormLabel>
            <FormControl class="w-full">
              <Input
                class="w-full"
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
      <div class="flex items-end">
        <Button class="px-6 space-x-3"> <Plus /> <span>Add </span> </Button>
      </div>
    </div>
  </form>
</template>
