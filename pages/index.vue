<script setup lang="ts">
import { Button } from "@/components/ui/button";
const BASE_URL = useRuntimeConfig().public.backendAPI;

const { user, signOut } = useAuth();
definePageMeta({
  middleware: "guest-only",
});

useHead({
  title: "Home - CV PRO",
  meta: [
    {
      name: "description",
      content: "Design stunning CVs that stand out, effortlessly.",
    },
  ],
});

const { data, pending, error, refresh } = await useAsyncData(
  "cv-templates-list",
  () => $fetch(BASE_URL + "templates/get/all")
);
const compteur = ref<number>(5230);

const sections = [
  {
    title: "Get your CV translated",
    img: "/img/pics/home/cv-translate-asset.png",
    text: `CV Pro includes a robust Translation Module designed to enhance
          accessibility and global reach for our users. This feature allows
          seamless translation of CV content between English and French,
          catering to diverse linguistic preferences and facilitating broader
          career opportunities.`,
    list: {
      title: "Key features :",
      items: [
        {
          title: "Bilingual Translation: ",
          text: "Effortlessly translate your CV content between English and French with just a few clicks, ensuring clarity and coherence across language barriers.",
        },
        {
          title: "Accurate Translations:",
          text: "Our advanced translation algorithm ensures high accuracy and fidelity in converting text, preserving the original meaning and tone of your CV content.",
        },
        {
          title: "Customization Options:",
          text: "Tailor the translation process to your specific needs with customizable options, such as language variants and formatting preferences, for a personalized user experience.",
        },
      ],
    },
    btn: {
      text: "Create CV",
      to: "/templates",
    },
  },
  {
    title: "CV Customization",
    img: "/img/pics/home/creat-CV.png",
    text: `Welcome to our user-friendly CV Creation Module, designed to simplify the process of crafting a professional CV with an intuitive step-by-step approach. `,
    list: {
      title: "Key features :",
      items: [
        {
          title: "Guided Workflow:",
          text: "Our intuitive step-by-step process guides you through each stage of CV creation, breaking down the daunting task into manageable steps for a stress-free experience.",
        },
        {
          title: "Interactive Templates:",
          text: "Choose from a diverse range of professionally designed templates tailored to various industries and career levels, each optimized for readability and visual appeal.",
        },
        {
          title: "Dynamic Editing Tools:",
          text: "Enjoy real-time editing capabilities with dynamic tools that allow you to customize text, formatting, and layout elements directly within the CV editor interface.",
        },
        {
          title: "Instant Previews:",
          text: "Preview your CV in real-time as you make changes, enabling you to visualize the final result and make adjustments on the fly for optimal presentation.",
        },
      ],
    },
    btn: {
      text: "Create-cv",
      to: "/templates",
    },
    reverse: true,
  },
  {
    title: "Easy Payment",
    img: "/img/pics/home/digital-payment.png",
    text: `Make your payments via Orange Money and Mtn Mobile Money and easily download your CVs in a few clicks.
Don't wait any longer, start now`,
    btn: {
      text: "Choosing your CV template",
      to: "/templates",
    },
    reverse: true,
  },
];
</script>

<template>
  <div class="pt-20">
    <section class="relative w-full min-h-screen">
      <img
        src="assets/img/shapes/home-shape-back.png"
        alt=""
        class="absolute w-full h-full opacity-20 md:opacity-100"
        srcset=""
      />
      <img
        src="assets/img/shapes/home-shape-front.png"
        alt=""
        class="absolute w-full h-full -top-20"
        srcset=""
      />
      <div
        class="container max-w-screen-2xl home-banner min-h-[calc(100dvh-90px)] grid grid-cols-1 md:grid-cols-5 pt-10 relative"
      >
        <div class="max-w-xl col-span-3 pt-8">
          <h5 class="mb-3 font">Build your future with ease!</h5>
          <h1 class="text-4xl font-bold text-pretty">
            Welcome to our CV PRO application, where your career path is just a
            click away.
          </h1>
          <p class="mt-3 text-lg">
            Design stunning CVs that stand out, effortlessly.
          </p>
          <ul class="mt-4 font">
            <li class="flex items-center gap-2 my-4">
              <div
                class="flex items-center justify-center w-8 h-8 p-2 font-bold text-center text-white rounded-full bg-stone-800"
              >
                1
              </div>
              <p>Choose a model</p>
            </li>
            <li class="flex items-center gap-2 my-4">
              <div
                class="flex items-center justify-center w-8 h-8 p-2 font-bold text-center text-white rounded-full bg-stone-800"
              >
                2
              </div>
              <p>Fill in your information</p>
            </li>
            <li class="flex items-center gap-2 my-4">
              <div
                class="flex items-center justify-center w-8 h-8 p-2 font-bold text-center text-white rounded-full bg-stone-800"
              >
                3
              </div>
              <p>Preview and download</p>
            </li>
          </ul>
          <div class="flex gap-4 mt-7">
            <nuxt-link class="w-fit" to="/templates">
              <Button class="px-4 w-fit">Create my CV</Button>
            </nuxt-link>
            <nuxt-link class="w-fit" to="/templates">
              <Button class="px-4 w-fit" variant="outline"> Edit my CV </Button>
            </nuxt-link>
          </div>
        </div>
        <div class="my-10 md:col-span-2 md:m-0">
          <div
            class="md:aspect-[150/207] w-fit text-right mx-auto max-w-96 rounded-sm"
          >
            <img
              src="@/assets/img/pics/home/example_template.png"
              class="object-cover h-full shadow-lg w-fit shadow-black/50"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 mt-20 border border-primary border-y-2 bg-secondary">
      <div class="items-end justify-center gap-4 text-center md:flex">
        <h1 class="text-2xl italic font-medium text-center text-black">
          Already
        </h1>
        <div class="text-2xl font-bold">
          <PartsCompteur :number="compteur"></PartsCompteur>
        </div>
        <div>
          <h1 class="text-2xl italic font-medium text-center text-black">
            CVs created
          </h1>
        </div>
      </div>
    </section>
    <section class="mt-40">
      <template v-for="section in sections">
        <PartsHomeSection
          :reverse="section.reverse"
          :img="section.img"
          :carousel="section.carousel"
          :title="section.title"
          :text="section.text"
          :btn="section.btn"
          :list="section.list"
          :variant="section.variant"
        />
      </template>
    </section>
    <section
      class="text-center bg-background px-10 md:p-24 rounded-t-[50px] md:rounded-t-[300px]"
    >
      <div class="max-w-[1048px] mx-auto">
        <h2 class="text-4xl font-bold mb-4 mx-auto max-w-[683px]">
          Customozable CV templates for any professional sector.
        </h2>
        <p class="">
          Customize templates to suit your specific needs, with the flexibility
          to adjust fonts, colors, sections, and formatting elements to create a
          personalized CV that stands out from the crowd
        </p>
      </div>
      <div class="w-full pt-12">
        <PartsHomeCarousel />
      </div>
    </section>
    <section class="py-20 bg-background">
      <h3 class="mb-8 text-3xl text-center">
        <span class="font-bold text-primary">CV PRO</span> is approved by job
        seekers and recruiters
      </h3>
      <PartsTemoignage />
    </section>
  </div>
</template>
