<script setup>
import { Plus } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";

import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(255),
    position: z.string().min(2).max(255),
    references_name: z.string(),
    references_phone: z.string(),
    email: z.string().email(),
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
  position: props.item?.position,
  references_name: props.item?.references_name,
  references_phone: props.item?.references_phone,
  email: props.item?.email,
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
  const titleReference = document.getElementById("titleReference");
  const positionReference = document.getElementById("positionReference");
  const nameReference = document.getElementById("nameReference");
  const phoneReference = document.getElementById("phoneReference");
  const emailReference = document.getElementById("emailReference");
  phoneReference.value = "";
  nameReference.value = "";
  positionReference.value = "";
  titleReference.value = "";
  emailReference.value = "";
  defaultValues.value.title = null;
  defaultValues.value.position = null;
  defaultValues.value.references_name = null;
  defaultValues.value.references_phone = null;
  defaultValues.value.email = null;
});

const references_fields = [
  {
    name: "title",
    label: "Institution Name",
    placeholder: "Dev",
    type: "text",
    id: "titleReference",
  },
  {
    name: "position",
    label: "position Occupied",
    placeholder: "Doe",
    id: "positionReference",
  },
  {
    name: "references_name",
    label: "references's  name",
    placeholder: "John Doe",
    id: "nameReference",
  },
  {
    name: "references_phone",
    placeholder: "+237 12345679",
    label: "Reference's phone",
    id: "phoneReference",
  },
  {
    name: "email",
    label: "reference's Email",
    placeholder: "John@company.com",
    type: "email",
    id: "emailReference",
    class: "",
  },
];
</script>

<template>
  <form @submit="onSubmit">
    <div
      class="w-full gap-6 p-2 space-y-6 border-l-2 md:grid md:grid-cols-2 md:space-y-0 border-secondary/50"
    >
      <template v-for="field in references_fields">
        <FormField
          v-slot="{ componentField }"
          :name="field.name"
          :class="field.class"
          :value="defaultValues[field.name]"
        >
          <FormItem :class="field.class">
            <FormLabel class="capitalize">{{ field.label }}</FormLabel>
            <FormControl>
              <Textarea
                v-if="field.type == 'textarea'"
                class="w-full"
                v-bind="componentField"
                :placeholder="field.placeholder"
                :id="field.id"
              ></Textarea>
              <Input
                v-else
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
      <div class="col-span-2">
        <Button class="px-6 space-x-3">
          <Plus /> <span>Add expérience</span>
        </Button>
      </div>
    </div>
  </form>
</template>
