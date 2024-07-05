<script setup >
import { Plus } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Textarea } from '@/components/ui/textarea'

import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
    title: z.string().min(2).max(255),
    position: z.string().min(2).max(255),
    references_name: z.string(),
    refenreces_name: z.string(),
    email: z.string().email()
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})



const emit = defineEmits(['submit'])
const props = defineProps({
    item: {
        type: Object,
    }
})
const defaultValues = ref({
    title: props.item?.title,
    position: props.item?.position,
    references_name: props.item?.references_name,
    refenreces_name: props.item?.refenreces_name,
    email: props.item?.email,
})

const onSubmit = handleSubmit((values) => {
    emit('submit', values)

    defaultValues.value.title = null
    defaultValues.value.position = null
    defaultValues.value.references_name = null
    defaultValues.value.refenreces_name = null
    defaultValues.value.email = null
    
})

const references_fields = [
    {
        name: "title",
        label: "Institution Name",
        placeholder: "Dev",
        type: 'text',
    },
    {
        name: "position",
        label: "position Occupied",
        placeholder: "Doe",
    },
    {
        name: "references_name",
        label: "references's  name",
        placeholder: "John Doe",
    },
    {
        name: "refenreces_name",
        placeholder: "+237 12345679",
        label: "Reference's phone",
    },
    {
        name: "email",
        label: "reference's Email",
        placeholder: "John@company.com",
        type: 'email',
        class: "",
    },
]
</script>

<template>
    <form @submit="onSubmit">
        <div class="p-2 w-full md:grid md:grid-cols-2 gap-6 space-y-6 md:space-y-0 border-l-2 border-secondary/50 ">
            <template v-for="field in references_fields">
                <FormField v-slot="{ componentField }" :name="field.name" :class="field.class"
                    :value="defaultValues[field.name]">
                    <FormItem :class="field.class">
                        <FormLabel class=" capitalize">{{ field.label }}</FormLabel>
                        <FormControl>
                            <Textarea v-if="field.type == 'textarea'" class="w-full" v-bind="componentField"
                                :placeholder="field.placeholder" />
                            <Input v-else :type="field.type ? field.type : 'text'" :placeholder="field.placeholder"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage class='text-xs' />
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