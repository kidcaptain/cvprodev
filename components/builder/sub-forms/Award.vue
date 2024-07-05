<script setup >
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Textarea } from '@/components/ui/textarea'

import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
    title: z.string().min(2).max(255),
    award: z.string().min(2).max(255),
    start_date: z.string().date(),
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
    award: props.item?.award,
    start_date: props.item?.start_date,
})

const onSubmit = handleSubmit((values) => {
    emit('submit', values)

    defaultValues.value.title = null
    defaultValues.value.award = null
    defaultValues.value.start_date = null
})

const experience_fields = [
    {
        name: "title",
        label: "Institution or Company",
        placeholder: "Company name",
        type: 'text',
        class:"col-span-1"
    },
    {
        name: "start_date",
        label: "Date",
        type: 'date',
         class:"col-span-1"
    },
    {
        name: "award",
        label: "Award or honor obtained",
        placeholder: "Best employee of the year",
        class:"col-span-2"
    },
 

]
</script>

<template>
    <form @submit="onSubmit">
        <div class="grid w-full grid-cols-2 gap-6 p-2 border-l-2 bg- border-secondary/50 ">
            <template v-for="field in experience_fields">
                <FormField v-slot="{ componentField }" :name="field.name" :class="field.class"
                    :value="defaultValues[field.name]">
                    <FormItem :class="field.class">
                        <FormLabel>{{ field.label }}</FormLabel>
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
            <div>
                <Button class="px-6 space-x-3">
                    <Plus /> <span>Add </span>
                </Button>
            </div>
        </div>
    </form>
</template>