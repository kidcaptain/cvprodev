<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
const route = useRoute()

definePageMeta({
  layout: 'pricings',
})

const offers = [
  {
    title: "T1",
    pricing: 1000,
    id: 1,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf."
      }
    ]
  },
  {
    title: "T2",
    pricing: 3000,
    id: 2,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf."
      }
    ]
  },
  {
    title: "T3",
    pricing: 5000,
    id: 3,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf."
      },
    ]
  },
  {
    title: "T4",
    pricing: 5000,
    id: 3,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf."
      },
    ]
  },
  {
    title: "T5",
    pricing: 5000,
    id: 3,
    options: [
      {
        available: false,
        text: "lorem dfs fsdfs dfsdsfdf sdflskdjf sdf sdfosdjf skdf."
      },
    ]
  },

]

const options = [
  {
    title: '',
    available: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "CV + traduction automatique"
  },
  {
    title: '',
    available: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "5 telechargements max pour ce jour"
  },
  {
    title: '',
    available: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "Modèles de lettres de motivations"
  },
  {
    title: '',
    available: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "Conseils entretien d’embauche"
  },
  {
    title: '',
    available: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    text: "3 téléchargements / jour pendant 1 mois"
  },
  {
    title: '',
    available: [3, 4, 5, 6, 7, 8, 9, 10],
    text: "Relecture et corrections cv (à la  demande de l’utilisateur)"
  },
  {
    title: '',
    available: [3, 4, 5, 6, 7, 8, 9, 10],
    text: "10 téléchargements/ jour pendant 1  mois"
  },
  {
    title: '',
    available: [4, 5, 6, 7, 8, 9, 10],
    text: "Rédaction professionnelle de cv (à la  demande de l’utilisateur)"
  },
  {
    title: '',
    available: [4, 5, 6, 7, 8, 9, 10],
    text: "Access aux cours en ligne gratuitement  pendant 1 mois"
  },
  {
    available: [4, 5, 6, 7, 8, 9, 10],
    title: '',
    text: "Téléchargements illimités"
  },
  {
    title: '',
    available: [5, 6, 7, 8, 9, 10],
    text: "Access aux cours en ligne à vie"
  },
]

</script>

<template>
  <section class="grid md:grid-cols-3 gap-10">
    <ScrollArea v-for="offer in offers" class="border border-white bg-primary rounded-xl relative max-h-[600px] overflow-auto hover:shadow-md hover:shadow-white">
      <div class="sticky top-0 bg-primary  p-5 "> 
        <div class="text-center">
          <h2 class="text-xl">{{ offer.title }}</h2>
          <p class="text-3xl uppercase mt-4  font-bold">{{ offer.pricing }} fcfa</p>
          <Button variant="ternary" class="mt-3">Upgrade</Button>
        </div>
        <hr class="border-white mt-6">
      </div>
      <ul class="space-y-3 font-semibold  p-5 ">
        <li class="space-x-3" v-for="option in options">
          <nuxtImg class="size-5 inline-table"
            :src="option.available.indexOf(offer.id) != -1 ? 'img/icons/checkbox.png' : 'img/icons/checkbox-invalid.png'"
            alt="" srcset="" />
          <span :class="option.available.indexOf(offer.id) != -1 ? '' : 'text-secondary'"> {{ option.text }} </span>
        </li>
      </ul>
    </ScrollArea>
  </section>
</template>
