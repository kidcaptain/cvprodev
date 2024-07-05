<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const BASE_URL = useRuntimeConfig().public.backendAPI


const api = ref<CarouselApi>()

function setApi(val: CarouselApi) {
    api.value = val

    console.log('uo gars')
}
const plugin = Autoplay({
    delay: 2000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
})

const stop = watch(api, (api) => {
    if (!api) return

    // Watch only once or use watchOnce() in @vueuse/core
    nextTick(() => stop())

    api.on('select', (api, envent) => {
        // Do something on select.

        api.slideNodes().forEach(node => {
            node.querySelector(".templ")?.classList.add('scale-75')
        })
        const current = api.slideNodes()[api.selectedScrollSnap()];
        const templ = current.querySelector('.templ')
        templ?.classList.remove('scale-75')
        console.log('selected: ', templ)

    })
})

const { data, pending, error, refresh } = await useAsyncData(
  'cv-templates-list',
  () => $fetch(BASE_URL+'templates/get/all')
)

</script>

<template>
    <Carousel class="relative w-full  mx-auto" :opts="{ loop: true, }" @init-api="setApi" :plugins="[plugin]"
        @mouseenter="plugin.stop" @mouseleave="[plugin.reset(), plugin.play()];">
        <CarouselContent>
            <CarouselItem class="md:basis-1/3" v-for="(template, index) in  data?.templates" :key="index">
                <div class="p-5 px-0">
                    <div class="templ rounded-lg shadow-lg  transition-transform duration-500 group"
                        :class="index != 0 ? 'scale-75' : ''">
                        <div class="flex md:aspect-[210/297] items-center justify-center p-0 border-none relative">
                            <nuxt-img class="w-full h-full object-cover " :src="'https://'+template.templateImagePath "
                                :placeholder="[50, 25]" alt="" />
                            <div
                                class="h-full w-full bg-secondary/90 absolute z-40 top-0 left-0 transition-opacity duration-300 delay-300 opacity-0 group-hover:opacity-100 grid place-content-center ">
                                <div class="flex gap-8">
                                    <nuxt-link class="flex-1" disabled
                                        :to="{ name: 'templates-id', params: { id: template.templateId } }">
                                        <Button type="submit" variant="outline" class="w-full">
                                            See in preview
                                        </Button>
                                    </nuxt-link>
                                    <nuxt-link class="flex-1 "
                                        :to="{ name: `app-cv-builder-step-id`, params: { id: 1 }, query: { template_id: template.templateId } }">
                                        <Button type="submit" class="w-full hover:border-white">
                                            Use this template
                                        </Button>
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CarouselItem>
        </CarouselContent>
    </Carousel>
</template>