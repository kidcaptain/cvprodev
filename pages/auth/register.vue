<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
const BASE_URL = useRuntimeConfig().public.backendAPI;
const formSchema = toTypedSchema(
  z
    .object({
      name: z
        .string({ required_error: "User name is required" })
        .min(5, "User name is required"),
      email: z
        .string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
      password: z
        .string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
      confirm_password: z
        .string({ required_error: "Password is required" })
        .min(1, "Password is required"),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
    })
);

definePageMeta({
  layout: "auth",
  middleware: "guest-only",
});

const { handleSubmit, setErrors } = useForm({
  validationSchema: formSchema,
});

const { signIn } = useAuth();

interface FormDatas {
  [key: string]: any;
}

// {
//   name: 'Hermann',
//   email: 'hera@gmail.com',
//   password: 'azerty@123',
//   confirm_password: 'azerty@123'
// }

const formData = reactive<FormDatas>({});

const register = handleSubmit(async (values) => {
  console.log("les trucs", values);
  const { data, pending, error, refresh } = await useFetch(
    BASE_URL + "user/save",
    {
      method: "POST",
      body: { ...values },
    }
  );
  if (data.value) {
    signIn("credentials", values).catch((err) => {
      setErrors({
        email: "This Email is already used",
      });
    });
  }
  if (error.value) {
    console.log("erro", error.value);
  }
});

const experience_fields = [
  {
    name: "name",
    label: "Name",
    placeholder: "John Doe",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "John.doe@example.com",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "*****************",
    type: "password",
  },
  {
    name: "confirm_password",
    label: "Confirm password",
    placeholder: "*******************",
    type: "password",
  },
];
</script>

<template>
  <form action="" class="space-y-5" @submit.prevent="register">
    <template v-for="field in experience_fields">
      <div class="grid w-full items-center gap-3">
        <FormField
          v-slot="{ componentField }"
          :name="field.name"
          :value="formData[field.name]"
        >
          <FormItem>
            <FormLabel>{{ field.label }}</FormLabel>
            <FormControl>
              <Input
                :type="field.type ? field.type : 'text'"
                :placeholder="field.placeholder"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </div>
    </template>
    <div class="space-y-3">
      <div class="w-full">
        <Button class="w-full">
          <Mail class="w-4 h-4 mr-2" /> Register with Email
        </Button>
      </div>
      <div class="flex text-sm items-center gap-3 ustify-between">
        <span>Already have an account ?</span>
        <span>
          <Button as-child variant="link" class="p-0">
            <nuxt-link :to="{ name: 'auth-login' }"> Just sign in ! </nuxt-link>
          </Button>
        </span>
      </div>
    </div>
  </form>
</template>
