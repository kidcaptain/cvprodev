<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowLeft, Cable, ClipboardList, View, Languages, NotebookPen } from 'lucide-vue-next'
import { computed } from 'vue';
import { useRoute as useNativeRoute } from 'vue-router' // par ce que le useRoute de Nuxt ne s'actualise pas dans les Layout
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const route = useNativeRoute()
const router = useRouter()

const template_id = route.query?.template_id

if (!template_id) {
    navigateTo('/templates')
}

const steps = [
    {
        id: 1,
        title: "profile details",
        icon: NotebookPen
    },
    {
        id: 2,
        title: "professionnal...",
        icon: ClipboardList
    },
    {
        id: 3,
        title: "language...",
        icon: Languages
    },
    {
        id: 4,
        title: "Reference...",
        icon: Cable
    },
    {
        id: 5,
        title: "Preview",
        icon: View
    },
]
const current_state = computed(() => route.params.id)

</script>

<template>
    <div class=" min-h- overflow- text-white flex flex-col">
        <header class=" z-10 sticky top-0 bg-gradient-to-l bg-background">
            <div class="container max-w-screen-2xl mx-auto">
                <header class=" justify- items-center pt-4 relative">
                    <div>
                        <Button variant="outline" @click="$router.back()" class="absolute rounded-full space-x-2">
                            <ArrowLeft />
                            <span class="font-bold">Back</span>
                        </Button>
                    </div>
                    <ScrollArea class="p-3 mx-auto max-w-3xl md:p-8 bg-white  rounded-xl shadow-lg">
                        <div class=" w-full flex justify-between gap-3 ">
                            <template v-for="step in steps">
                                <nuxt-link
                                    :to="current_state < step.id ? false : { name: `app-cv-builder-step-id`, params: { id: step.id }, query: { template_id: template_id } }"
                                    class="group" :class="`
                                            ${current_state == step.id ? 'text-secondary' : 'text-gray-400'}
                                            ${current_state > step.id ? '!text-primary' : ''}
                                        `">
                                    <div class="size-20 rounded-full border p-1 group-hover:scale-105 transition-transform duration-200"
                                        :class="`
                                            ${current_state == step.id ? 'border-secondary' : 'border-gray-200'}
                                            ${current_state > step.id ? '!border-primary' : ''}
                                        `">
                                        <div class=" rounded-full h-full w-full p-3 grid place-content-center border"
                                            :class="`
                                            ${current_state == step.id ? 'bg-secondary border-secondary text-white' : 'bg-transparent border-gray-200'}
                                            ${current_state > step.id ? '!bg-primary !border-primary text-white' : ''}
                                        `">
                                            <component :is="step.icon" />
                                        </div>
                                    </div>
                                    <div class="mt-2 text-center ">
                                        <h4 class="font-semibold uppercase"> Step {{ step.id }} </h4>
                                        <p class="text-sm capitalize "> {{ step.title }} </p>
                                    </div>
                                </nuxt-link>
                                <div class="flex-1 h-1.5 rounded-full bg-gray-200 mt-9"
                                    :class="`${current_state > step.id ? '!bg-primary' : ''}`"
                                    v-if="step.id != steps.length">
                                    <div class="bg-secondary h-full rounded-full"
                                        :class="`${current_state == step.id ? 'w-1/2' : 'w-0'}`"></div>
                                </div>
                            </template>
                            <ScrollBar orientation="horizontal" />
                        </div>
                    </ScrollArea>
                </header>
            </div>
        </header>
        <main class="bg-background">
            <div class="container py-5">
                <div class="mx-auto max-w-3xl bg-white p-8 rounded-xl shadow-lg text-foreground">
                    <slot></slot>
                </div>
            </div>
        </main>
    </div>
</template>