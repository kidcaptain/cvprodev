<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
}))

const { handleSubmit, setErrors  } = useForm({
  validationSchema: formSchema,
})
definePageMeta({
  layout: 'auth',
  middleware: "guest-only"
})

const { signIn, signOut, session, status, cookies, getProviders } = useAuth()

interface FormDatas {
  [key: string]: any;
}

const formData = reactive<FormDatas>({})

const login = handleSubmit((values) => {
  signIn("credentials", values).catch((err) => {
    console.log('errur', err)
    setErrors({
      email: 'Invalid Credentials'
    })
  })
})

const experience_fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "John.doe@example.com",
    type: 'email',
  },
  {
    name: "password",
    label: "Password",
    type: 'password',
    placeholder: "***********",
  },
]
</script>

<template >
  <form action="" class="space-y-5 " @submit.prevent="login">
    <template v-for="field in experience_fields">
      <div class="grid w-full items-center gap-3">
        <FormField v-slot="{ componentField }" :name="field.name" :value="formData[field.name]" >
          <FormItem>
            <FormLabel>{{ field.label }}</FormLabel>
            <FormControl>
              <Input :type="field.type ? field.type : 'text'" :placeholder="field.placeholder"
                v-bind="componentField" />
            </FormControl>
            <FormMessage class='text-xs' />
          </FormItem>
        </FormField>
      </div>
    </template>
    <div class="space-y-3">
      <div class="flex text-sm items-center justify-between">
        <span @click="">Forgoten password ?</span>
        <span>

          <Button as-child variant="link" class="p-0">
            <nuxt-link to="/">
              Get it back.
            </nuxt-link>
          </Button>
        </span>
      </div>
      <div class="w-full">
        <Button class=" w-full ">
          <Mail class="w-4 h-4 mr-2" /> Log in with Email
        </Button>
      </div>
      <div class="flex text-sm items-center  gap-3 ustify-between">
        <span>Dont have an account ?</span>
        <span>

          <Button as-child variant="link" class="p-0">
            <nuxt-link :to="{ name: 'auth-register' }">
              Get one !
            </nuxt-link>
          </Button>
        </span>
      </div>
    </div>
  </form>
</template>