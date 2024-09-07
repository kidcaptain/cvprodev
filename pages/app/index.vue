<script setup lang="ts">
import {
  LayoutDashboard,
  Mails,
  FileText,
  PlusCircle,
  Eye,
  Trash,
} from "lucide-vue-next";
const BASE_URL = useRuntimeConfig().public.backendAPI;
import axios from "axios";

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

const getData = ref<any[]>();

const data = await $fetch<any>(BASE_URL + "cv/get/all")
  .then((val) => {
    var tab: any[] = [];
    val.cvs.forEach((element: any) => {
      if (session) {
        if (element.userUuid == session.value?.uid) {
          tab.push(element);
        }
      }
    });
    getData.value = tab;
  })
  .catch((err) => {
    console.log(err);
  });
import image1 from "assets/img/pics/model1.png";
import image2 from "assets/img/pics/model2.png";
import image3 from "assets/img/pics/model3.png";
import image4 from "assets/img/pics/model4.png";
import image5 from "assets/img/pics/model5.png";
import image6 from "assets/img/pics/model6.png";
import image7 from "assets/img/pics/model7.png";
import image8 from "assets/img/pics/model8.png";
import image9 from "assets/img/pics/model9.png";
import image11 from "assets/img/pics/model11.png";
import image12 from "assets/img/pics/model12.png";
import image13 from "assets/img/pics/model13.png";
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
  {
    id: "3",
    title: "Professional and Structured",
    description:
      "A well-organized and easy-to-read layout, showcasing your experience clearly and concisely. Suitable for all types of positions.",
    img: image3 ,
    type: "with"
  },
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

  
];
const deleteCv = async (val: any) => {
  if (confirm("Do you want to delete this CV?")) {
    const cvData = {
      userId: session.value?.uid,
      templateId: val.templateUuid,
      picturePath: "",
      profileInformations: JSON.stringify({
        name: val.name,
        title: val.title,
        yearsOfExperience: val.yearsOfExperience,
        phone: val.phone,
        address: val.address,
        email: val.email,
        goal: val.goal,
        website: val.website,
      }),
      educations: JSON.stringify([
        {
          institution: "Istag",
          degree: "licence",
          yearOfGraduation: "2024-02 - 2024-10",
          grade: null,
        },
      ]),
      tmpKey: null,
      isDeleted: "1",
      cvId: val.cvsUuid,
    };

    try {
      const response = await axios.post(BASE_URL + "cv/save", cvData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.isSaved) {
        alert("Record delete successfully");
        await $fetch<any[]>(BASE_URL + "cv/get/all")
          .then((val) => (getData.value = val))
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.error("Error submitting CV:", error);
    }
  }
};
const reload = () => {
  window.location.reload();
};
const stringToArray = (str: string)=>{
  const array : string[]= JSON.parse(str);
  return array[1]
}
</script>

<template>
  <div class="container py-20">
    <div
      class="flex justify-start gap-6 py-10 max-sm:flex-col max-sm:flex max-sm:justify-center"
    >
      <div
        class="relative overflow-hidden rounded-full max-sm:m-auto size-24 bg-background"
      >
        <img
          class="relative z-10 mb-8 scale-75"
          src="@/assets/img/logo-white-theme.svg"
          alt=""
        />
        <div
          class="absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm"
        ></div>
      </div>
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
        v-if="getData?.length > 0"
        class="relative grid grid-cols-4 gap-10 p-4 py-12 max-sm:grid-cols-1 max-lg:grid-cols-2"
      >
        <div
          class="relative p-5 overflow-hidden bg-white border-none hover:shadow-lg hover: rounded-xl"
          v-for="i in getData"
        >
          <div
            class="relative z-10 flex flex-col items-center justify-center w-full h-full m-auto max-w-72"
          >
            <h1
              class="font-semibold text-center text-black max-lg:text-xl"
            >
              Create at {{ i?.createdAt }}
            </h1>

            <div class="flex gap-4">
              <NuxtLink
                class="p-2 text-black border-2 rounded-md border-secondary hover:bg-white bg-white/70 hover:text-secondary hover:border-2 hover:border-white"
                :to="{
                  name: `app-cv-builder-preview-id`,
                  params: { id:  i.yearsOfExperience},
                }"
              >
                <Eye :size="14" />
              </NuxtLink>
              <Button
                class="p-2 text-black border-2 rounded-md border-secondary hover:bg-white bg-white/70 hover:text-secondary hover:border-2 hover:border-white"
                @click="deleteCv(i)"
              >
                <Trash :size="14" />
              </Button>
            </div>
          </div>
          <!-- <div class="absolute top-0 left-0 z-0 w-full h-full opacity-80">
            <img
              :src="'https://' + i?.templateImagePath"
              class="w-full h-full border-none rounded-3xl"
            />
          </div> -->
        </div>
        <!-- <div
          class="aspect-[210/297] relative overflow-hidden bg-primary rounded-3xl"
        >
          <div
            class="relative z-10 flex flex-col items-center justify-center w-full h-full m-auto text-center"
            style="max-width: 70%"
          >
            <h1 class="my-8 text-white uppercase text- center max-lg:text-xl">
              offert your a PREMIUM plan to change level.
            </h1>
            <h6
              class="mt-4 mb-10 text-sm font-semibold text-white max-lg:text-sm"
            >
              Unlock premium templates of all sorts
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
        </div> -->
      </div>
      <div v-else class="p-2">
        <h3 class="text-xl font-semibold">No documents saved</h3>
        <Button type="button" class="mt-4" @click="reload">Reload</Button>
      </div>
      <!-- <nuxt-link to="/pricing" class="hidden max-sm:block">
        <Button class="w-full">Create new </Button>
      </nuxt-link> -->
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
              <div class="h-full bg-white">=</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="j != 2" class="border opacity-20"></div>
    </template>
  </div>
</template>
