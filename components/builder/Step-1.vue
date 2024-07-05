<script setup lang="ts">
import { ArrowRight, Camera } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    title: z.string().min(2).max(50),
    experience: z.number().min(1).max(30),
    address: z.string().min(2).max(255),
    phone: z.string().min(8).max(9),
    email: z.string().min(8).max(255),
    website: z.string().min(0).max(255),
    objective: z.string().max(800).min(200)
}))

const emit = defineEmits(['submit'])

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    //on sauvegarde les données ici
    // et on passe à l'étape suivante.
    emit('submit')
})

const fields = [
    {
        name: "firstname",
        label: "First Name",
        placeholder: "John",
        type: 'text'
    },
    {
        name: "lastname",
        label: "Last Name",
        placeholder: "Doe"
    },
    {
        name: "title",
        label: "Title",
        placeholder: "Frontend Engeneer"
    },
    {
        name: "experience",
        label: "Years of experience",
        placeholder: "5",
        type: 'number'
    },
    { separator: true },
    {
        name: "address",
        label: "Address",
        placeholder: "135 montée jouvenve"
    },
    {
        name: "phone",
        label: "Phone Number",
        placeholder: "+237 600 00 00 00",
        type: "tel",
    },
    {
        name: "email",
        label: "Email",
        placeholder: "exemple@gmail.com",
        type: "email"
    },
    {
        name: "website",
        label: "Website",
        placeholder: "my-portfolio.com"
    },
    { separator: true },
    {
        name: "objective",
        label: "Objectif",
        type: "textarea",
        placeholder: "Objectif",
        class: "col-span-2"
    },
]

</script>

<template>
    <form @submit="onSubmit" class="text-foreground">
        <div class="w-fit mx-auto">
            <label for="avatar" class="mx-auto w-fit">
                <div
                    class="grid place-content-center bg-gray-200 border-gray-500 size-36 mb-2 border mx-auto rounded-full cursor-pointer">
                    <Camera class="size-16 text-white " />
                </div>
            </label>
            <Input id="avatar" type="file" />
        </div>
        <div class="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0 my-6">
            <template v-for="field in fields">
                <Separator v-if="field.separator" class="col-span-2 border-gray-300 bg-gray-300" />
                <FormField v-else v-slot="{ componentField }" :name="field.name" :class="field.class"> 
                    <FormItem :class="field.class">
                        <FormLabel>{{ field.label }}</FormLabel>
                        <FormControl>
                            <Textarea v-if="field.type =='textarea'" class="w-full" v-bind="componentField" :placeholder="field.placeholder" />
                            <Input v-else :type="field.type ? field.type : 'text'" :placeholder="field.placeholder"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage class='text-xs' />
                    </FormItem>
                </FormField>
            </template>
        </div>
        <div class="flex justify-end">
            <Button type="submit" class="px-12 space-x-4">
                <span>Next</span>
                <ArrowRight />
            </Button>
        </div>
    </form>
</template>