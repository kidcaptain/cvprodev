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
    })
})

const { data, pending, error, refresh } = await useAsyncData(
  'cv-templates-list',
  () => $fetch(BASE_URL+'templates/get/all')
)
import image1 from 'assets/img/pics/model1.png'
import image2 from 'assets/img/pics/model2.png'
import image3 from 'assets/img/pics/model3.png'
import image4 from 'assets/img/pics/model4.png'
import image5 from 'assets/img/pics/model5.png'
import image6 from 'assets/img/pics/model6.png'
import image7 from 'assets/img/pics/model7.png'
import image8 from 'assets/img/pics/model8.png'
import image9 from 'assets/img/pics/model9.png'
import image11 from 'assets/img/pics/model11.png'
import image12 from 'assets/img/pics/model12.png'
import image13 from 'assets/img/pics/model13.png'
const cvs = [
  {
    id: "1",
    title: "Classic Elegant (blue)",
    description:
      " A timeless and sophisticated design, highlighting your experience and skills with a touch of modernity. Perfect for positions in conservative industries",
    img: image1,
    type: "with"
  },
  {
    id: "2",
    title: "Modern Minimalist",
    description:
      " A clean and contemporary style, emphasizing essential information. Ideal for creative candidates and positions in technology companies.",
    img: image2 ,
    type: "with"
  },
  // {
  //   id: "3",
  //   title: "Professional and Structured",
  //   description:
  //     "A well-organized and easy-to-read layout, showcasing your experience clearly and concisely. Suitable for all types of positions.",
  //   img: image3 ,
  //   type: "with"
  // },
  {
    id: "4",
    title: "Skills-Based",
    description:
      "A design highlighting your technical skills and accomplishments. Ideal for candidates in IT, engineering, and scientific fields.",
    img: image4 ,
    type: "without"
  },
  {
    id: "5",
    title: "Functional",
    description:
      "A flexible template allowing you to customize each section to your needs. Ideal for candidates with varied work experiences.",
    img: image6 ,
    type: "with"
  },
  {
    id: "6",
    title: "Clean and Bright:",
    description:
      "An airy and visually appealing design, highlighting your key information. Perfect for candidates looking to make a positive first impression.",
    img: image7 ,
    type: "with"
  },
  {
    id: "7",
    title: "Nature-Inspired",
    description:
      "Template Juila Manson ",
    img: image8 ,
    type: "without"
  },
  {
    id: "8",
    title: "Juila Manson",
    description:
      "Template Juila Manson ",
    img: image9 ,
    type: "without"
  },
  {
    id: "12",
    title: "Classic Elegant (Primary)",
    description:
      "A timeless and sophisticated design, highlighting your experience and skills with a touch of modernity. Perfect for positions in conservative industries",
    img: image12 ,
    type: "with"
  },
  {
    id: "13",
    title: "Modern Minimalist (blue)",
    description:
      "A clean and contemporary style, emphasizing essential information. Ideal for creative candidates and positions in technology companies.",
    img: image13 ,
    type: "with"
  },

  {
    id: "10",
    title: "Modern Minimalist",
    description:
      "A clean and contemporary style, emphasizing essential information. Ideal for creative candidates and positions in technology companies.",
    img: image11 ,
    type: "with"
  },
]
</script>

<template>
    <Carousel class="relative w-full mx-auto" :opts="{ loop: true, }" @init-api="setApi" :plugins="[plugin]"
        @mouseenter="plugin.stop" @mouseleave="[plugin.reset(), plugin.play()];">
        <CarouselContent>
            <CarouselItem class="md:basis-1/4" v-for="(template, index) in  cvs" :key="index">
                <div class="p-5 px-0">
                    <div class="transition-transform duration-500 rounded-lg shadow-lg templ group"
                        :class="index != 0 ? 'scale-75' : ''">
                        <div class="flex w-full items-center justify-center p-0 border-none relative">
                            <img class="object-cover w-full h-full " :src="template.img"
                                 alt="" />
                            <div
                                class="absolute top-0 left-0 z-40 grid w-full h-full transition-opacity duration-300 delay-300 opacity-0 bg-secondary/90 group-hover:opacity-100 place-content-center ">
                                <div class="flex gap-8">
                                    <nuxt-link class="flex-1" disabled
                                        :to="{ name: 'templates-template-id', params: { id: template.id } }">
                                        <Button type="submit" variant="outline" class="w-full">
                                            See in preview
                                        </Button>
                                    </nuxt-link>
                                    <nuxt-link class="flex-1 "
                                        :to="{ name: `app-cv-builder-step-id`, params: { id: 1 }, query: { template_id: template.id } }">
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