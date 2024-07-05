<script setup lang="ts">
import { LayoutDashboard, Mails, FileText, PlusCircle } from "lucide-vue-next";
const BASE_URL = useRuntimeConfig().public.backendAPI;

const { user, session } = useAuth();
definePageMeta({
  middleware: "auth", //
});

const router = useRouter();

const stats = ref([
  {
    text: "CV Créés",
    stat: 27,
    icon: FileText,
    route: "app-cv",
  },
  {
    stat: 27,
    text: "Lettres de motivations",
    icon: Mails,
    route: "app-letter",
  },
  {
    text: "Fichiers récupérés",
    stat: 27,
    icon: LayoutDashboard,
    route: "app",
  },
]);


  const data = await $fetch(BASE_URL + "cv/get/all");



// address: "dee";
// certificationInformation: null;
// certifications: "null";
// createdAt: "2024-05-15 04:45:29";
// cvId: null;
// cvsUuid: "f271ce6b-8b74-4def-b912-aec7fcb31a0b";
// education: '[{"institution":"Istag","degree":"licence","year_of_graduation":"5","grade":"1"}]';
// email: "dev@gmail.com";
// fullName: null;
// goal: "Goal";
// hobbies: "null";
// id: 1;
// isDeleted: false;
// language: "null";
// languageInformation: null;
// name: "paul";
// personalSkills: "null";
// phone: "645454";
// picturePath: null;
// professionalSkills: "null";
// projectInformation: null;
// projects: "null";
// referenceInformation: null;
// references: "null";
// status: "COMPLITED";
// templateDescription: null;
// templateId: "1";
// templateImagePath: "api.ticketvivi.com/cvpro/storage/app/public/production/f8TWDkwASqvBoitmHzqLFaOlWgkfafqDVvd2zba8.png";
// templateName: null;
// templateUuid: "d6be0bb5-2fed-4e4b-b98c-7d0b10dec356";
// templateViewPath: null;
// title: "dev";
// updatedAt: "2024-07-02 13:06:56";
// userEmail: "text3@gmail.com";
// userId: "10";
// website: "siteduezro.com";
// yearsOfExperience: "4";
// const data = await [];
const show = (item: any) => {

  const profileInformation = {
    firstname: item.name,
    address: item.address,
    website: item.website,
    email: item.email,
    title: item.title,
    yearsOfExperience: item.experience,
    phone: item.phone,
    goal: item.goal,
  };


  window.localStorage.setItem("step_1", JSON.stringify(profileInformation));
  window.localStorage.setItem("step_2", JSON.stringify([item.professionalExperience, item.personalSkills, item.professionalSkills ]));
  window.localStorage.setItem("step_3", JSON.stringify([item.language, item.hobbies, item.certifications ]));
  window.localStorage.setItem("step_4", JSON.stringify([item.references]));

  router.push({
      name: "app-cv-builder-preview-id",
      params: { id: item.templateUuid },
    });

};
</script>

<template>
  <div class="container py-20">
    <div
      class="flex justify-start gap-6 py-10 max-sm:flex-col max-sm:flex max-sm:justify-center"
    >
      <div
        class="border rounded-full max-sm:m-auto size-24 bg-background border-secondary"
      ></div>
      <div class="max-lg:text-center">
        <h1 class="text-4xl font-semibold">
          Welcome back,
          <span class="text-secondary" v-if="user">{{ user.name }}</span> !
        </h1>
        <p class="mt-3">W've missed you a lot !</p>
        <p class="">let us continue where we had stoped!</p>
      </div>
    </div>
  </div>
  <div class="px-4">
    <div class="container mb-3 bg-pink-100 py-9 rounded-3xl">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl text-center max-sm:text-xl">Your documents</h2>
        <nuxt-link to="/templates" class="hidden md:inline-block">
          <Button class="">Create new </Button>
        </nuxt-link>
      </div>
      <div 
        v-if="data?.cvs"
        class="relative grid grid-cols-4 gap-10 py-12 max-sm:grid-cols-1 max-lg:grid-cols-2"
      >
        <div
          class="aspect-[210/297] overflow-hidden hover:shadow-lg relative border-none hover: rounded-3xl"
          v-for="i in data?.cvs"
          :class="i.userUuid == session?.uid ? 'flex' : 'hidden'"
        >
          <div
            class="relative z-10 flex flex-col items-center justify-center w-full h-full m-auto max-w-72"
          >
            <h1
              class="my-8 font-semibold text-center text-black max-lg:text-xl"
            >
              Create at {{ i.createdAt }}
            </h1>
            <!-- 
            <NuxtLink
              :to="{
                name: `app-cv-builder-preview-id`,
                params: { id: i.templateUuid },
              }"
            > -->
            <Button
              @click="show(i)"
              class="text-black border-2 border-secondary hover:bg-white bg-white/70 hover:text-secondary hover:border-2 hover:border-white"
              >View preview</Button
            >
            <!-- </NuxtLink> -->
          </div>
          <div class="absolute top-0 left-0 z-0 w-full h-full opacity-80">
            <img
              :src="'https://' + i.templateImagePath"
              class="w-full h-full border-none rounded-3xl"
            />
          </div>
        </div>
        <div
          class="aspect-[210/297] relative overflow-hidden bg-primary rounded-3xl"
        >
          <div
            class="relative z-10 flex flex-col items-center justify-center w-full h-full m-auto max-w-72"
          >
            <h1 class="my-8 font-bold text-center text-white max-lg:text-xl">
              offert your a PREMIUM plan to change level.
            </h1>
            <h6
              class="mt-4 mb-10 text-sm font-semibold text-white max-lg:text-sm"
            >
              unlock premium templates of all sorts
            </h6>

            <Button
              class="text-black border-none bg-white/70 hover:text-white hover:bg-white/20 hover:border-2 hover:border-white"
              >Go to premium!</Button
            >
          </div>
          <div class="absolute top-0 left-0 z-0 w-full h-full opacity-10">
            <img
              src="/assets/img/pics/cv template 3.png"
              class="w-full h-full"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
      <div v-else>
        <h3>No data yet</h3>
      </div>
      <nuxt-link to="/pricing" class="hidden max-sm:block">
        <Button class="w-full">Create new </Button>
      </nuxt-link>
    </div>
  </div>
  <div v-if="false" class="flex flex-col h-full gap-12 pt-8 mb-12">
    <div class="grid grid-cols-4 gap-6">
      <nuxt-link
        :to="{ name: info.route }"
        class="relative p-5 pt-4 duration-300 border rounded shadow h-fit text-muted-foreground bg-muted group overflow-clip hover:bg-muted/30"
        v-for="info in stats"
      >
        <h2>
          <span
            class="text-6xl font-bold align-middle duration-300 group-hover:text-secondary"
            >{{ info.stat }}</span
          >
        </h2>
        <span class="text-sm">{{ info.text }}</span>
        <div
          class="absolute top-0 right-0 grid h-full p-6 duration-300 scale-75 rotate-45 aspect-square bg-primary place-content-center group-hover:bg-secondary rounded-xl group-hover:scale-95"
        >
          <component
            :is="info.icon"
            class="text-white transition-transform duration-300 delay-200 size-8 group-hover:scale-150 group-hover:-rotate-45"
          />
        </div>
      </nuxt-link>
      <div
        class="grid p-2 text-center border border-dashed cursor-pointer group place-content-center"
      >
        <div class="flex items-center gap-3">
          <PlusCircle
            class="size-8 group-hover:scale-[200%] group-hover:text-secondary transition-[height, width] duration-300 delay-100"
          />
          <div
            class="transition-transform duration-300 group-hover:w-0 group-hover:overflow-clip"
          >
            Nouvelle création
          </div>
        </div>
      </div>
    </div>

    <template v-for="j in 2">
      <div class="">
        <div class="flex justify-between mb-24 font-semibold">
          <h2 class="text-4xl" v-if="j != 2">Curiculum Vitae</h2>
          <h2 class="text-4xl" v-if="j == 2">Lettres de motivation</h2>
          <div>s</div>
        </div>
        <div class="grid grid-cols-5 gap-10 mt-5">
          <div class="p-6">
            <div
              class="text-center aspect-[210/297] border-dashed border p-2 grid place-content-center cursor-pointer"
            >
              <div>
                <div class="text-6xl">+</div>
                <div>Nouveau CV</div>
              </div>
            </div>
          </div>
          <div v-for="i in 4" class="p-4 group">
            <div
              class="p-2 bg-primary aspect-[210/297] border relative cursor-pointer border-r-0 rounded-[2px]"
            >
              <div
                class="h-full w-1/3 bg-primary absolute -top-12 -left-1 rounded-bl-lg -skew-y-[60deg] shadow rounded grid place-content-center border border-r-0 group-hover:-skew-y-[90deg] transition-transform duration-300"
              >
                <h3 class="font-serif text-3xl font-semibold text-white">CV</h3>
              </div>
              <div class="h-full bg-white">sdfsd</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="j != 2" class="border opacity-20"></div>
    </template>
  </div>
</template>
