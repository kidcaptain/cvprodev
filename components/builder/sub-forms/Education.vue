<script setup >
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Textarea } from '@/components/ui/textarea'

import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
    title: z.string().min(2).max(255),
    grade: z.string().min(2).max(255),
    start_date: z.string().date(),
    end_date: z.string().date(),
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
    grade: props.item?.grade,
    start_date: props.item?.start_date,
    end_date: props.item?.end_date,
})

const onSubmit = handleSubmit((values) => {
    emit('submit', values)

    defaultValues.value.title = null
    defaultValues.value.grade = null
    defaultValues.value.start_date = null
    defaultValues.value.end_date = null
})

const experience_fields = [
    {
        name: "title",
        label: "Institution",
        placeholder: "University of XXXXX",
        type: 'text',
        class:"col-span-2"
    },
    {
        name: "grade",
        label: "Degree obtained and grade",
        placeholder: "XXXXXX degree in XXXXXXXX",
        class:"col-span-2"
    },
    {
        name: "start_date",
        label: "Starting Date",
        type: 'date',
    },
    {
        name: "end_date",
        label: "Ending Date",
        type: 'date',
    },

]
</script>

<template>
    <form @submit="onSubmit">
        <div class="p-2 w-full md:grid md:grid-cols-2 gap-6 space-y-6 md:space-y-0  border-l-2 border-secondary/50 ">
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