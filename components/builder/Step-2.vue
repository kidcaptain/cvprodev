<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, ArrowLeft, Trash } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import * as z from 'zod'
import Experience from '@/components/builder/sub-forms/Experience.vue'
import Skills from '@/components/builder/sub-forms/Skills.vue'
import Education from '@/components/builder/sub-forms/Education.vue'

const formSchema = toTypedSchema(z.object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    title: z.string().min(2).max(50),
    experience: z.number().min(1).max(30),
    address: z.string().min(2).max(255),
    phone: z.string().min(8).max(9),
    email: z.string().min(8).max(255),
    website: z.string().min(0).max(255),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    //on sauvegarde les données ici
    // et on passe à l'étape suivante.
    router.push({ query: { template_id: route.query.template_id, step: 1 + Number(route.query.step) } })
    //   toast({
    //     title: 'You submitted the following values:',
    //     description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
    //   })

})


const defaultValue = 'item-1'

const accordionItems = ref([
    {
        value: 'item-1',
        title: 'PROFESSIONAL EXPERIENCE',
        content: 'Yes. It adheres to the WAI-ARIA design pattern.',
        datas: Array<any>(),
        form: Experience
    },
    {
        value: 'item-2',
        title: 'EDUCATION',
        datas: Array<any>(),
        content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
        form: Education
    },
    {
        value: 'item-3',
        title: 'SKILLS',
        datas: Array<any>(),
        content: 'Yes! You can use the transition prop to configure the animation.',
        form: Skills
    },
])

const removeSaved = (item, index) => {
    accordionItems.value[item]?.datas.splice(index, 1)
}

</script>


<template>
    <form @submit="onSubmit" class="text-foreground">
        <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
            <AccordionItem v-for="(item, itemIndex) in accordionItems" :key="item.value" :value="item.value">
                <AccordionTrigger class="font-bold sticky ">{{ item.title }}</AccordionTrigger>
                <AccordionContent class=" md:pl-5 ">
                    <div class="space-y-2 ">
                        <div v-for="(save, index) in item.datas"
                            class="cursor-pointer border-secondary border-l-2 bg-secondary/5 hover:bg-secondary/10 p-2 grid grid-cols-3 gap-5 ">
                            <h3 class="border-r border-secondary/50 font-semibold"> {{ save.title }} </h3>
                            <div class="text-end flex items-center justify-end border-r border-secondary/50 px-2">
                                <span>{{ save.company || save.grade }}</span></div>
                            <div class="text-end flex justify-end items-center gap-5">
                                <NuxtTime v-if="save.start_date" data-testid="present" :datetime="save.start_date"
                                    second="numeric" month="long" day="numeric" />
                                <Button @click="removeSaved(itemIndex, index)" variant="outlin"
                                    class="p-1 h-fit border-none hover:text-secondary" type="button">
                                    <Trash class="size-4" />
                                </Button>
                            </div>
                        </div>
                        <component :is="item.form" @submit="(value: any) => item?.datas?.push(value)"
                            :datas="item.datas" />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <div class="flex justify-between mt-5">
            <nuxt-link
                :to="{ name: `app-cv-builder-step-id`, params: { id: ($route.params.id - 1) }, query: { template_id: $route.query.template_id } }">
                <Button variant="outline" type="button" class="  px-8 space-x-4" title="share">
                    <ArrowLeft />
                    <span>Previous</span>
                </Button>
            </nuxt-link>
            <Button type="submit" class="px-12 space-x-4">
                <span>Next</span>
                <ArrowRight />
            </Button>
        </div>
    </form>
</template>