<script setup>
import { Edit } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
const BASE_URL = useRuntimeConfig().public.backendAPI;
import * as z from "zod";
const { user, signOut, session } = useAuth();
definePageMeta({
  middleware: "auth", //
});
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(255),
    email: z.string().min(2).max(255),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const emit = defineEmits(["submit"]);

const defaultValues = ref({
  name: user.value.name,
  email: user.value.email,
});

const onSubmit = handleSubmit(async (values) => {
  // console.log(values);
  try {
    const response = await axios.post(BASE_URL + `user/save`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("CV submitted successfully:", response.data);
  } catch (error) {
    console.error("Error submitting CV:", error);
  }
});



const experience_fields = [
  {
    name: "name",
    label: "User Name",
    placeholder: "John",
    type: "text",
  },
  {
    name: "email",
    label: "User Email",
    placeholder: "Doe@gmail.com",
  },
];
</script>

<template>
  <div class="container min-h-screen">
    <Accordion
      type="single"
      class="w-full"
      collapsible
      :default-value="defaultValue"
    >
      <AccordionItem
        value="item"
      >
        <AccordionTrigger class="sticky font-bold">
         sdsd
        </AccordionTrigger>
        <AccordionContent class="md:pl-5">
          <div class="space-y-2">
         
          s
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item"
      >
        <AccordionTrigger class="sticky font-bold">
         sdsd
        </AccordionTrigger>
        <AccordionContent class="md:pl-5">
          <div class="space-y-2">
         
          s
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item"
      >
        <AccordionTrigger class="sticky font-bold">
         sdsd
        </AccordionTrigger>
        <AccordionContent class="md:pl-5">
          <div class="space-y-2">
         
          s
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
