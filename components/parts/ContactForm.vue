<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  })
);

const { handleSubmit, setErrors } = useForm({
  validationSchema: formSchema,
});
definePageMeta({
  layout: "auth",
  middleware: "guest-only",
});

const { signIn, signOut, session, status, cookies, getProviders } = useAuth();

interface FormDatas {
  [key: string]: any;
}

const formData = reactive<FormDatas>({});

const login = handleSubmit((values) => {
  signIn("credentials", values).catch((err) => {
    console.log("errur", err);
    setErrors({
      email: "Invalid Credentials",
    });
  });
});

const experience_fields = [
  {
    name: "firstname",
    label: "Firstname",
    placeholder: "Mark",
    type: "text",
    id:  "firstname"
  },
  {
    name: "lastname",
    label: "Lastname",
    placeholder: "Antoine",
    type: "lastname",
    id: "lastname",

  },
  {
    name: "email",
    label: "Email",
    placeholder: "John.doe@example.com",
    type: "email",
    id: "email",
    
  },
  {
    name: "sujet",
    label: "Sujet",
    type: "text",
    placeholder: "",
    id: "sujet",
    
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "",
    id: "message",
    
  },
];
</script>

<template>
  <form action="" class="p-4 py-6 space-y-5 " @submit.prevent="login" >
    <template v-for="field in experience_fields">
      <div class="grid w-full gap-3 text-xs">
        <FormField
          v-slot="{ componentField }"
          :name="field.name"
          :value="formData[field.name]"
        >
          <FormItem>
            <FormLabel class="font-normal">{{ field.label }}</FormLabel>
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
                class=""
                :type="field.type ? field.type : 'text'"
                :placeholder="field.placeholder"
                v-bind="componentField"
                :id="field.id"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </div>
    </template>
    <div class="space-y-3">
      <div class="w-full">
        <Button class="px-10 text-sm w-fit">
          Submit
        </Button>
      </div>
    
    </div>
  </form>
</template>
