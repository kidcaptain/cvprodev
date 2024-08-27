<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const BASE_URL = useRuntimeConfig().public.backendAPI;

const api = ref<CarouselApi>();

function setApi(val: CarouselApi) {
  api.value = val;
  console.log("uo gars");
}
const plugin = Autoplay({
  delay: 4000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});

const stop = watch(api, (api) => {
  if (!api) return;
  // Watch only once or use watchOnce() in @vueuse/core
  nextTick(() => stop());
  api.on("select", (api, envent) => {
    // Do something on select.
    api.slideNodes().forEach((node) => {
      node.querySelector(".templ")?.classList.add("scale-75");
    });
    const current = api.slideNodes()[api.selectedScrollSnap()];
    const templ = current.querySelector(".templ");
    templ?.classList.remove("scale-75");
  });
});

const temoignageData = [
  {
    name: "Paul cabi",
    time: "il y'a 1 semaine",
    message: "Accueillante et très compréhensible rapide dans les démarche...",
  },
  {
    name: "Paul cabi",
    time: "il y'a 1 semaine",
    message: "Accueillante et très compréhensible rapide dans les démarche...",
  },
  {
    name: "Paul cabi",
    time: "il y'a 1 semaine",
    message: "Accueillante et très compréhensible rapide dans les démarche...",
  },
  {
    name: "Paul cabi",
    time: "il y'a 1 semaine",
    message: "Accueillante et très compréhensible rapide dans les démarche...",
  },
  {
    name: "Paul cabi",
    time: "il y'a 1 semaine",
    message: "Accueillante et très compréhensible rapide dans les démarche...",
  },
  {
    name: "Paul cabi",
    time: "il y'a 1 semaine",
    message: "Accueillante et très compréhensible rapide dans les démarche...",
  },
  {
    name: "Paul cabi",
    time: "il y'a 1 semaine",
    message: "Accueillante et très compréhensible rapide dans les démarche...",
  },
];
</script>

<template>
  <Carousel
    class="relative container mx-auto"
    :opts="{ loop: true }"
    @init-api="setApi"
    :plugins="[plugin]"
    @mouseenter="plugin.stop"
    @mouseleave="[plugin.reset(), plugin.play()]"
  >
    <CarouselContent>
      <CarouselItem
        class="md:basis-1/4"
        v-for="(template, index) in temoignageData"
        :key="index"
      >
        <div class="p-5 px-0">
          <div
            class="transition-transform duration-500 rounded-lg bg-background templ group"
            :class="index != 0 ? 'scale-75' : ''"
          >
            <div>
              <div class="bg-primary text-white text-primary px-4 py-2">
                <h5 class="font-bold">{{ template.name }}</h5>
                <h6 class="text-xs">{{ template.time }}</h6>
              </div>
           
             <div class="bg-white px-6 py-4 ">
                <cite class=" text-stone-700 ">"{{ template.message }}"</cite>
             </div>
            </div>
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
