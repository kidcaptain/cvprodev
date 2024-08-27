<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
const route = useRoute();

definePageMeta({
  layout: "pricings",
});

useHead({
  title: "Pricings - CV PRO",
  meta: [
    {
      name: "description",
      content: "Our price rates compared to our packages",
    },
  ],
});

const offers = [
  {
    title: "Basic",
    pricing: 1000,
    id: 1,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf.",
      },
    ],
  },
  {
    title: "Classic",
    pricing: 3000,
    id: 2,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf.",
      },
    ],
  },
  {
    title: "Premium",
    pricing: 5000,
    id: 3,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf.",
      },
    ],
  },
];
const item = ref<{
  title: string;
  pricing: number;
  id: number;
  options: {
    available: boolean;
    text: string;
  }[];
}>();
const isClosed = ref<boolean>(false);
const options = [
  {
    title: "",
    available: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "CV + traduction automatique",
  },
  {
    title: "",
    available: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "5 telechargements max pour ce jour",
  },
  {
    title: "",
    available: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "Modèles de lettres de motivations",
  },
  {
    title: "",
    available: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "Conseils entretien d’embauche",
  },
  {
    title: "",
    available: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "3 téléchargements / jour pendant 1 mois",
  },
  {
    title: "",
    available: [3, 4, 5, 6, 7, 8, 9, 10],
    text: "Relecture et corrections cv (à la  demande de l’utilisateur)",
  },
  {
    title: "",
    available: [3, 4, 5, 6, 7, 8, 9, 10],
    text: "10 téléchargements/ jour pendant 1  mois",
  },
  {
    title: "",
    available: [4, 5, 6, 7, 8, 9, 10],
    text: "Rédaction professionnelle de cv (à la  demande de l’utilisateur)",
  },
  {
    title: "",
    available: [4, 5, 6, 7, 8, 9, 10],
    text: "Access aux cours en ligne gratuitement  pendant 1 mois",
  },
  {
    available: [4, 5, 6, 7, 8, 9, 10],
    title: "",
    text: "Téléchargements illimités",
  },
  {
    title: "",
    available: [5, 6, 7, 8, 9, 10],
    text: "Access aux cours en ligne à vie",
  },
];

const onClick = (items: any) => {
  isClosed.value = true;
  item.value = items;
  console.log(item);
  console.log(items);
};
</script>

<template>
  <div class="relative">
    <section class="grid p-4 md:grid-cols-2 lg:grid-cols-3 md:p-0">
      <div class="p-5" v-for="offer in offers">
        <div
          class="border border-white bg-primary rounded-xl relative md:max-h-[600px] max-h-[300px] overflow-hidden hover:shadow-md hover:shadow-white"
        >
          <div class="sticky top-0 px-3 py-3 bg-primary md:px-5">
            <div class="text-center">
              <h2 class="text-lg md:text-xl">{{ offer.title }}</h2>
              <p class="text-lg font-medium uppercase md:text-3xl">
                {{ offer.pricing }} fcfa
              </p>
              <div class="flex justify-center gap-2">
                <Button variant="ternary" class="mt-1 text-sm md:mt-3" size="sm"
                  >Upgrade</Button
                >
                <Button
                  @click="onClick(offer)"
                  variant="secondary"
                  class="block mt-1 text-ternary md:hidden md:mt-3"
                  size="sm"
                  >See</Button
                >
              </div>
            </div>
            <hr class="mt-2 border-white" />
          </div>
          <ul class="p-3 px-5 space-y-3 font-semibold">
            <li class="mt-0 space-x-3" v-for="option in options">
              <nuxtImg
                class="size-4 inline-table"
                :src="
                  option.available.indexOf(offer.id) != -1
                    ? 'img/icons/checkbox.png'
                    : 'img/icons/checkbox-invalid.png'
                "
                alt=""
                srcset=""
              />
              <span
                :class="
                  option.available.indexOf(offer.id) != -1
                    ? ' text-sm mt-1'
                    : 'text-secondary text-sm mt-1'
                "
              >
                {{ option.text }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section
      v-if="isClosed"
      class="fixed top-0 left-0 flex items-center justify-center w-full h-full p-10 bg-black/30"
    >
      <ScrollArea
        class="border border-white w-full bg-primary rounded-xl overflow-y-auto overflow-x-hidden relative md:max-h-[600px] max-h-[500px] hover:shadow-md hover:shadow-white"
      >
        <div>
          <Button
            @click="isClosed = false"
            class="sticky top-0 left-0 z-10 -translate-x-1 -translate-y-1 bg-white text-primary"
            size="sm"
            >Close</Button
          >
        </div>
        <div class="sticky top-0 px-3 py-3 bg-primary md:px-5">
          <div class="text-center">
            <h2 class="text-lg md:text-xl">{{ item?.title }}</h2>
            <p class="mt-1 text-lg font-bold uppercase md:text-3xl md:mt-4">
              {{ item?.pricing }} fcfa
            </p>
            <Button variant="ternary" class="mt-1 md:mt-3" size="sm"
              >Upgrade</Button
            >
          </div>
          <hr class="mt-2 border-white" />
        </div>
        <ul class="p-3 px-5 space-y-3 font-semibold">
          <li class="mt-0 space-x-3" v-for="option in options">
            <nuxtImg
              class="size-4 inline-table"
              :src="
                option.available.indexOf(parseInt(`${item?.id}`)) != -1
                  ? 'img/icons/checkbox.png'
                  : 'img/icons/checkbox-invalid.png'
              "
              alt=""
              srcset=""
            />
            <span
              :class="
                option.available.indexOf(parseInt(`${item?.id}`)) != -1
                  ? 'text-xs mt-1'
                  : 'text-secondary text-xs mt-1'
              "
            >
              {{ option.text }}
            </span>
          </li>
        </ul>
      </ScrollArea>
    </section>
  </div>
</template>
