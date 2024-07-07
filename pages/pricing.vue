
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
const route = useRoute();

definePageMeta({
  layout: "pricings",
});

const offers = [
  {
    title: "T1",
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
    title: "T2",
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
    title: "T3",
    pricing: 5000,
    id: 3,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf.",
      },
    ],
  },
  {
    title: "T4",
    pricing: 5000,
    id: 3,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf.",
      },
    ],
  },
  {
    title: "T5",
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
    <section class="grid md:grid-cols-3 gap-10 md:p-0 p-4">
      <div
        v-for="offer in offers"
         class="border border-white bg-primary rounded-xl relative md:max-h-[600px] max-h-[300px] overflow-hidden hover:shadow-md hover:shadow-white"
      >
        <div class="sticky top-0 bg-primary px-3 md:px-5 py-3">
          <div class="text-center">
            <h2 class="md:text-xl text-lg">{{ offer.title }}</h2>
            <p class="md:text-3xl text-lg uppercase mt-1 md:mt-4 font-bold">
              {{ offer.pricing }} fcfa
            </p>
            <div class="flex gap-2 justify-center">
              <Button variant="ternary" class="mt-1 md:mt-3" size="sm"
                >Upgrade</Button
              >
              <Button
                @click="onClick(offer)"
                variant="secondary"
                class="mt-1 text-ternary block md:hidden md:mt-3"
                size="sm"
                >See</Button
              >
            </div>
          </div>
          <hr class="border-white mt-2" />
        </div>
        <ul class="space-y-3 font-semibold p-3 px-5">
          <li class="space-x-3 mt-0" v-for="option in options">
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
                  ? 'md:text-lg text-sm mt-1'
                  : 'text-secondary md:text-lg text-sm mt-1'
              "
            >
              {{ option.text }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section
      v-if="isClosed"
      class="w-full h-full p-10 flex justify-center items-center bg-black/30 fixed top-0 left-0"
    >
      <ScrollArea
        class="border border-white w-full bg-primary rounded-xl overflow-y-auto overflow-x-hidden relative md:max-h-[600px] max-h-[500px] hover:shadow-md hover:shadow-white"
      >
        <div>
          <Button
            @click="isClosed = false"
            class="bg-white text-primary sticky top-0 left-0 z-10 -translate-x-1 -translate-y-1"
            size="sm"
            >Close</Button
          >
        </div>
        <div class="sticky top-0 bg-primary px-3 md:px-5 py-3">
          <div class="text-center">
            <h2 class="md:text-xl text-lg">{{ item?.title }}</h2>
            <p class="md:text-3xl text-lg uppercase mt-1 md:mt-4 font-bold">
              {{ item?.pricing }} fcfa
            </p>
            <Button variant="ternary" class="mt-1 md:mt-3" size="sm"
              >Upgrade</Button
            >
          </div>
          <hr class="border-white mt-2" />
        </div>
        <ul class="space-y-3 font-semibold p-3 px-5">
          <li class="space-x-3 mt-0" v-for="option in options">
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
