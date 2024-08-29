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
    title: z.string().max(255),
    level: z.string(),
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
  level: props.item?.title,
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
  const titleLanguage = document.getElementById("titleLanguage");
  titleLanguage.value = "";
  const type = document.getElementById("levelLanguage");
  type.value = "2";

  defaultValues.value.title = null;
  defaultValues.value.type = null;
});

const experience_fields = [
  {
    name: "title",
    label: "Language",
    placeholder: "Type your skill here",
    type: "text",
    id: "titleLanguage",
    class: "col-span-1",
  },
  {
    name: "level",
    label: "Language level",
    placeholder: "Pick your language level",
    type: "select",
    values: ["Pick your language level", "Elementary level", "Independent level", "Experienced level"],
    id: "levelLanguage",
    class: "col-span-1",
  },
];
</script>

<template>
  <form @submit="onSubmit">
    <div
      class="w-full gap-6 p-2 space-y-6 border-l-2 md:space-y-0 border-secondary/50"
    >
      <div class="grid mb-4 grid-cols-1 gap-4 md:grid-cols-2">
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
                <select
                  name="identifiant"
                  id="identifiant"
                  v-if="field.type == 'select'"
                  class="py-2.5 px-2 text-white rounded-md bg-primary"
                  :id="field.id"
                  required
                  :name="field.name"
                  v-bind="componentField"
                >
                  <option
                    v-for="(level, indexlevel) in field.values"
                    :key="indexlevel"
                    :value="level"
                  >
                    {{ level }}
                  </option>
                </select>
                <Input
                  required
                  v-else
                  class="w-full py-2 basis-full"
                  :type="field.type ? field.type : 'text'"
                  :placeholder="field.placeholder"
                  v-bind="componentField"
                  :id="field.id"
                  :name="field.name"
                />
              </FormControl>
              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </template>
      </div>
      <div class="flex my-4 items-end">
        <Button type="submit" class="w-fit px-2">
          <Plus :size="15" /> <span>Add</span>
        </Button>
      </div>
    </div>
  </form>
</template>
