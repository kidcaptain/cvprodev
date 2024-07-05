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
    }
]
const current_state  = computed(() => route.params.id)

</script>

<template>
    <div class="flex flex-col text-white min-h- overflow-">
        <header class="sticky top-0 z-10 bg-gradient-to-l bg-background">
            <div class="container mx-auto max-w-screen-2xl">
                <header class="relative items-center pt-4">
                    <ScrollArea class="max-w-3xl p-3 mx-auto bg-white shadow-lg md:p-8 rounded-xl">
                        <Button variant="outline" size="sm" @click="$router.back()" class="mb-4 space-x-2 bg-white rounded-full shadow-sm border-stone-100 shadow-primary/20 hover:text-white hover:bg-primary">
                            <ArrowLeft  />
                            <!-- <span class="font-thin">Back</span> -->
                        </Button>
                        <div class="flex justify-between w-full gap-3 ">
                            <template v-for="step in steps">
                                <nuxt-link
                                    :to="parseInt(current_state.toString()) < step.id ? false : { name: `app-cv-builder-step-id`, params: { id: step.id }, query: { template_id: template_id } }"
                                    class="group" :class="`
                                            ${parseInt(current_state.toString()) == step.id ? 'text-secondary' : 'text-gray-400'}
                                            ${parseInt(current_state.toString()) > step.id ? '!text-primary' : ''}
                                        `">
                                    <div class="p-1 transition-transform duration-200 border rounded-full size-20 group-hover:scale-105"
                                        :class="`
                                            ${parseInt(current_state.toString()) == step.id ? 'border-secondary' : 'border-gray-200'}
                                            ${parseInt(current_state.toString()) > step.id ? '!border-primary' : ''}
                                        `">
                                        <div class="grid w-full h-full p-3 border rounded-full place-content-center"
                                            :class="`
                                            ${parseInt(current_state.toString()) == step.id ? 'bg-secondary border-secondary text-white' : 'bg-transparent border-gray-200'}
                                            ${parseInt(current_state.toString()) > step.id ? '!bg-primary !border-primary text-white' : ''}
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
                                    :class="`${parseInt(current_state.toString()) > step.id ? '!bg-primary' : ''}`"
                                    v-if="step.id != steps.length">
                                    <div class="h-full rounded-full bg-secondary"
                                        :class="`${parseInt(current_state.toString()) == step.id ? 'w-1/2' : 'w-0'}`"></div>
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
                <div class="max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-xl text-foreground">
                    <slot></slot>
                </div>
            </div>
        </main>
    </div>
</template>