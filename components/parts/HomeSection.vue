<script setup lang="ts">
const props = defineProps({
    reverse: {
        type: Boolean,
        required: false,
        default: () => false
    },
    img: {
        type: String,
        required: false
    },
    carousel: {
        type: Object,
        required: false,
    },
    title: {
        type: String,
        required: false,
        default: () => false
    },
    text: {
        type: String,
        required: false,
        default: () => false
    },
    list: {
        type: Object,
        required: false,
        default: () => false
    },
    btn: {
        type: Object,
        required: false,
        default: () => false
    },
    variant: {
        type: Number,
        required: false,
        default: () => 1
    }
})
import Autoplay from 'embla-carousel-autoplay'
import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
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
            node.querySelector(".templ")?.classList.add('scale-90')
        })
        const current = api.slideNodes()[api.selectedScrollSnap()];
        const templ = current.querySelector('.templ')
        templ?.classList.remove('scale-90')
        console.log('selected: ', templ)

    })
})
</script>


<template>
    <section class="min-h-dvh my-28 md:my-0">
        <div class="container md:flex items-center" :class="` ${reverse ? 'flex-row-reverse' : ''} `">
            <div class=" flex-1 md:mx-12  overflow-clip shadow-xl bg-background w-full">
                <div v-if="img" class="aspect-[4/3] rounded-3xl ">
                    <nuxt-img class="w-full h-full" :src="img || ''" :placeholder="[50, 25]" alt="" />
                </div>
                <div v-if="carousel" class=" aspect-[4/3] rounded-3xl  w-full p-6">
                    <Carousel class="relative w-full  mx-auto" :opts="{ loop: true, }" @init-api="setApi"
                        :plugins="[plugin]" @mouseenter="plugin.stop" @mouseleave="[plugin.reset(), plugin.play()];">
                        <CarouselContent>
                            <CarouselItem class="md:basis-1/2" v-for="(template, index) in carousel" :key="index">
                                <div class="p-5 px-0">
                                    <div class="templ rounded-lg shadow-lg  transition-transform duration-500"
                                        :class="index != 0 ? 'scale-90' : ''">
                                        <nuxt-img class="w-full h-full object-cover" :src="'https://'+template.templateImagePath || '/img/pics/cv-template.png'"
                                            :placeholder="[50, 25]" alt="" />
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
            <div class="flex-1 py-12 px-5">
                <h2 class="text-4xl text-primary font-bold mb-6" v-if="title"> {{ title }} </h2>
                <div v-html="text ? text : ''"></div>
                <hr class="mt-4 mb-9 border-2 rounded-full border-muted">
                <h5 class="font-bold">{{ list.title }}</h5>
                <ul class="space-y-3 mt-5" v-if="list?.items?.length">
                    <li class=" flex gap-3"  v-for="item in list?.items">
                        <svg v-if="variant != 2" width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.2956 0H8.71935C3.25662 0 0 3.25662 0 8.71934V21.2806C0 26.7583 3.25662 30.015 8.71935 30.015H21.2806C26.7433 30.015 29.9999 26.7583 29.9999 21.2956V8.71934C30.015 3.25662 26.7583 0 21.2956 0ZM22.1811 11.5558L13.6718 20.065C13.4617 20.2751 13.1766 20.3952 12.8764 20.3952C12.5763 20.3952 12.2911 20.2751 12.081 20.065L7.8339 15.8179C7.39869 15.3827 7.39869 14.6623 7.8339 14.2271C8.26912 13.7919 8.98948 13.7919 9.4247 14.2271L12.8764 17.6788L20.5903 9.96496C21.0255 9.52975 21.7458 9.52975 22.1811 9.96496C22.6163 10.4002 22.6163 11.1055 22.1811 11.5558Z" fill="#B04964"/>
                        </svg>
                        <div class="flex-1">
                            <strong class="text-secondary">{{ item.title }}</strong> <br v-if="variant == 2"> <span
                                :class="`${variant == 2 ? 'text-secondary' : ''}`" v-html="item.text"></span>
                        </div>
                    </li>
                </ul>
                <div class="mt-8" v-if="btn">
                    <nuxt-link :to="btn.to">
                        <Button class="px-9" :variant="carousel ? 'outline' : ''">{{ btn.text }}</Button>
                    </nuxt-link>
                </div>

            </div>
        </div>
    </section>
</template>