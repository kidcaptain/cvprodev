<script setup lang="ts">
import { Button } from '@/components/ui/button'
const BASE_URL = useRuntimeConfig().public.backendAPI

const { user, signOut } = useAuth()
definePageMeta({
  middleware: "guest-only"
})

const { data, pending, error, refresh } = await useAsyncData(
  'cv-templates-list',
  () => $fetch(BASE_URL+'templates/get/all')
)

const sections = [
  {
    title: 'Get your CV translated',
    img: '/img/pics/home/cv-translate-asset.png',
    text: `CV Pro includes a robust Translation Module designed to enhance 
          accessibility and global reach for our users. This feature allows 
          seamless translation of CV content between English and French, 
          catering to diverse linguistic preferences and facilitating broader 
          career opportunities.`,
    list: {
      title: 'Key features :',
      items: [
        {
          title: 'Bilingual Translation: ',
          text: 'Effortlessly translate your CV content between English and French with just a few clicks, ensuring clarity and coherence across language barriers.'
        },
        {
          title: 'Accurate Translations:',
          text: 'Our advanced translation algorithm ensures high accuracy and fidelity in converting text, preserving the original meaning and tone of your CV content.'
        },
        {
          title: 'Customization Options:',
          text: 'Tailor the translation process to your specific needs with customizable options, such as language variants and formatting preferences, for a personalized user experience.'
        }
      ]
    },
    btn: {
      text: 'Create CV',
      to: '/templates'
    }

  },
  {
    title: "CV Customization",
    img: '/img/pics/home/creat-CV.png',
    text: `Welcome to our user-friendly CV Creation Module, designed to simplify the process of crafting a professional CV with an intuitive step-by-step approach. `,
    list: {
      title: 'Key features :',
      items: [
        {
          title: 'Guided Workflow:',
          text: 'Our intuitive step-by-step process guides you through each stage of CV creation, breaking down the daunting task into manageable steps for a stress-free experience.'
        },
        {
          title: 'Interactive Templates:',
          text: 'Choose from a diverse range of professionally designed templates tailored to various industries and career levels, each optimized for readability and visual appeal.'
        },
        {
          title: 'Dynamic Editing Tools:',
          text: 'Enjoy real-time editing capabilities with dynamic tools that allow you to customize text, formatting, and layout elements directly within the CV editor interface.'
        },
        {
          title: 'Instant Previews:',
          text: 'Preview your CV in real-time as you make changes, enabling you to visualize the final result and make adjustments on the fly for optimal presentation.'
        }
      ]
    },
    btn: {
      text: 'Create-cv',
      to: '/templates'
    },
    reverse: true,
  },
  {
    title: "Design Ease",
    text: "Explore Our CV Examples and TemplatesUnlock the potential of your CV with our curated collection of examples and templates designed to inspire and elevate your professional profile. Discover the perfect layout, design, and content structure to showcase your skills and experiences effectively.",
    variant: 2,
    list: {
      items: [
        {
          title: 'Sample CVs:',
          text: 'Explore a diverse range of sample CVs crafted by industryexperts and career professionals. From entry-level resumesto executive portfolios, our collection covers various careerstages and fields, offering valuable insights into successful CV formatting and content strategies.'
        },
        {
          title: 'Professionally Designed Templates:',
          text: 'Browse through our extensive library of professionally designed CV templates, meticulously crafted to impress recruiters and employers. Choose from modern, minimalist, creative, and traditional styles, each customizable to reflect your unique personality and career aspirations.'
        }
      ]
    },
    carousel: data.value?.templates,
    btn: {
      text: 'View templates',
      to: '/templates'
    },
  }

]
</script>

<template>
  <section class="w-full relative ">
    <img src="assets/img/shapes/home-shape-back.png" alt="" class="absolute opacity-20 md:opacity-100 object-contain"
      rcset="">
    <img src="assets/img/shapes/home-shape-front.png" alt="" class="absolute -top-20 object-contain" srcset="">
    <div
      class=" container max-w-screen-2xl home-banner min-h-[calc(100dvh-90px)] grid grid-cols-1 md:grid-cols-5 pt-10 relative">
      <div class="pt-8 max-w-xl  col-span-3">
        <h5 class="mb-3 font">Build your future with ease!</h5>
        <h1 class="font-bold text-3xl text-pretty">Welcome to our CV PRO application, where
          your career path is just a click away. </h1>
        <p class="mt-3">
          Design stunning CVs that stand out, effortlessly.
        </p>
        <div class="flex gap-5 mt-7 ">
          <nuxt-link class="flex-1" to="/templates">
            <Button class="w-full">Create CV</Button>
          </nuxt-link>
          <nuxt-link class="flex-1" to="/templates">
            <Button class=" w-full" variant="outline"> Get Templates </Button>
          </nuxt-link>
        </div>
      </div>
      <div class="md:col-span-2 my-10 md:m-0">
        <div class="md:aspect-[210/297] mx-auto max-w-lg rounded-sm shadow-primary shadow-lg">
          <img src="@/assets/img/pics/cv-template.png" class="w-full h-full object-cover" alt="">
        </div>
      </div>
    </div>
  </section>
  <template v-for="section in sections">
    <PartsHomeSection :reverse="section.reverse" :img="section.img" :carousel="section.carousel" :title="section.title"
      :text="section.text" :btn="section.btn" :list="section.list" :variant="section.variant" />
  </template>

  <section class="text-center bg-background p-10 md:p-24 rounded-t-[50px] md:rounded-t-[300px] ">
    <div class="max-w-[1048px] mx-auto">
      <h2 class="text-4xl font-bold mb-4 mx-auto max-w-[683px]"> Customozable CV templates for any professional sector.
      </h2>
      <p class="text-xl">Customize templates to suit your specific needs, with the flexibility to adjust fonts, colors,
        sections,
        and formatting elements to create a personalized CV that stands out from the crowd</p>
    </div>
    <div class="w-full pt-12">
      <PartsHomeCarousel />
    </div>
  </section>
</template>