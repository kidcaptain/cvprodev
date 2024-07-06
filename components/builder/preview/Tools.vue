<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Download,
  Save,
  LanguagesIcon,
  Share2,
  ArrowDown,
  ArrowUp,
  Image,
  Copy,
  ImageDownIcon,
} from "lucide-vue-next";
import axios from "axios";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { SelectArrow } from "radix-vue";
const { session, user } = useAuth();
const BASE_URL = useRuntimeConfig().public.backendAPI;
const tab1 = ref(false);
const tab2 = ref(true);
const tab3 = ref(false);
const tab4 = ref(false);

const route = useRoute();

useHead({
  script: [
    {
      src: "https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v20.0",
      async: true,
      crossorigin: "anonymous",
      defer: true,
      nonce: "PDLfjnl4",
    },
  ],
});

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(255),
    company: z.string().min(2).max(255),
    start_date: z.string().date(),
    end_date: z.string().date(),
    experience: z.string().min(8),
  })
);
const language = ref<string>("");
const props = defineProps<{ templateId: string | string[] }>();
const typeBinding = ref<string>("PDF");
const currentLanguage = ref<string>("en");

const defaultValues = ref<any>({
  name: "mon cv",
});
const download_field = [
  {
    name: "name",
    label: "File name",
    placeholder: "Mon cv ",
    type: "text",
  },
  {
    name: "type",
    label: "File type",
    type: "select",
    options: [
      { text: "PDF", value: "pdf" },
      { text: "DOCX", value: "docx" },
    ],
  },
];
const translateDocument = async () => {
  const content = document.getElementById("content");
  var option = {
    q: "",
    source: "en",
    target: "es",
    format: "html",
  };
  if (content) {
    option.q = content.innerHTML;
    switch (currentLanguage.value) {
      case "fr":
        option.source = "en";
        option.target = "fr";
        break;
      case "en":
        option.source = "fr";
        option.source = "en";
        break;
      default:
        option.source = "en";
        option.source = "es";
        break;
    }
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify(option),
      headers: { "Content-Type": "application/json" },
    });
    console.log(await res.json());
  }
};
const submitCV = async () => {
  const step1 = window.localStorage.getItem("step_1");
  const step2 = window.localStorage.getItem("step_2");
  const step3 = window.localStorage.getItem("step_3");
  const step4 = window.localStorage.getItem("step_4");
  const image = window.localStorage.getItem("profileimage");

  if (step1 && step2 && step3 && step4 && image) {
    const etape1: {
      firstname: string;
      lastname: string;
      title: string;
      experience: string;
      address: string;
      phone: string;
      email: string;
      website: string;
      objective: string;
    } = JSON.parse(step1);
    const etape2: {
      title: string;
      data: {
        title: string;
        company: string;
        start_date: string;
        end_date: string;
        experience: string;
        grade: string;
        type: string;
      }[];
    }[] = JSON.parse(step2);
    const etape3: {
      title: string;
      data: any[];
    }[] = JSON.parse(step3);
    const etape4: {
      title: string;
      data: any[];
    }[] = JSON.parse(step4);
    const educations: {
      institution: string;
      degree: string;
      yearOfGraduation: string;
    }[] = [];
    etape2[1].data.forEach((e) => {
      educations.push({
        institution: e.title,
        degree: e.grade,
        yearOfGraduation: e.start_date + " - " + e.end_date,
      });
    });
    const references: {
      institutionName: string;
      referenceFunction: string;
      referenceName: string;
      referenceNumber: string;
      referenceEmail: string;
    }[] = [];
    etape4[0].data.forEach((e) => {
      references.push({
        institutionName: e.title,
        referenceFunction: e.position,
        referenceName: e.references_name,
        referenceNumber: e.refenreces_phone,
        referenceEmail: e.email,
      });
    });
    const languages: {
      language: string;
      abilityLevel: string;
    }[] = [];
    etape3[0].data.forEach((e) => {
      languages.push({
        language: e.language,
        abilityLevel: e.abilityLevel,
      });
    });
    const cvData = {
      userId: session.value?.uid,
      templateId: props.templateId,
      picture: null, // Replace with the actual file or file path
      profileInformations: JSON.stringify({
        name: `${etape1.firstname} ${etape1.lastname}`,
        title: etape1.title,
        yearsOfExperience: etape1.experience,
        phone: etape1.phone,
        address: etape1.address,
        email: etape1.email,
        goal: "",
        website: etape1.website,
        objective: etape1.objective,
      }),
      educations:
        JSON.stringify(educations) ??
        `[{"institution":" ","degree":"","yearOfGraduation":"","grade":""}]`,
      references: JSON.stringify(references),
      personalSkills: etape2[1].data.toString(),
      professionalSkills: etape2[2].data.toString(),
      professionalExperience: etape2[0].data.toString(),
      certifications: etape3[2].data.toString(),
      projects: etape3[1].data.toString(),
      languages: languages.toString(),
      hobbies: etape3[1].data.toString(),
      cvId: "",
      tmpKey: null,
    };
    console.log(cvData);
    try {
      const response = await axios.post(BASE_URL + "cv/save", cvData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      console.log("CV submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting CV:", error);
    }
  }
};
const optionBackground = ref<string>("");
const optionBackgroundPosition = ref<string>("");

const print = async () => {
  if (typeBinding.value == "pdf") {
    const download = document.getElementById("download-pdf");
    if (download) {
      download.addEventListener("click", () => {
        const element = document.getElementById("content");
        const options = {
          filename: defaultValues.value.name,
          margin: 0,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: {
            unit: "in",
            format: "letter",
            orientation: "portrait",
          },
        };
        // @ts-ignore
        const html = html2pdf().set(options).from(element).save();
        console.log(html);
      });
      download.click();
    } else {
    }
  } else {
    alert("Indisponible pour l'instant");
    // var o = {
    //     filename: 'test.doc'
    // };
    // $(document.getElementById("main")).googoose(o);
  }
};
// const props = defineProps<{ html: string; disabled: boolean }>();
const divAction = ref();
const showDivAction = ref<boolean>(false);
onMounted(() => {
  document.querySelector(".tweet")?.addEventListener("click", function (event) {
    var width = 575,
      height = 400,
      url =
        "https://twitter.com/share?text=<?= $datas['title']; ?>&hashtags=Blog",
      opts =
        "status=1" +
        ",width=" +
        width +
        ",height=" +
        height +
        ",top=" +
        top +
        ",left=" +
        400;

    window.open(url, "twitter", opts);
    return false;
  });
});
const backgroundOptionPosition = () => {
  const image_profil = document.getElementById("image_profil");
  if (image_profil) {
    image_profil.style.backgroundPosition = optionBackgroundPosition.value;
  }
};
const backgroundOption = () => {
  const image_profil = document.getElementById("image_profil");
  if (image_profil) {
    image_profil.style.backgroundSize = optionBackground.value;
  }
};
const navigatorGet = (textToCopy: string) => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Text copied successfully.");
    })
    .catch((err) => {
      alert("Copy Failed");
    });
};
</script>

<template>
  <div
    class="flex items-center justify-between p-4 px-6 bg-white shadow-md rounded-2xl"
  >
    <h2 class="text-xl font-semibold">Tools</h2>
    <Button
      class="text-black border-none hover:bg-pink-50 bg-inherit"
      @click="
        () => {
          if (!showDivAction) {
            divAction.querySelector('.tab-content').style.display = 'none';
          } else {
            divAction.querySelector('.tab-content').style.display = 'block';
          }
          showDivAction = !showDivAction;
        }
      "
      size="sm"
      ><ArrowDown :size="20" v-if="showDivAction" />
      <ArrowUp :size="20" v-if="!showDivAction" />
    </Button>
  </div>
  <div
    ref="divAction"
    class="mt-4 overflow-hidden bg-white shadow-md rounded-2xl"
  >
    <div class="px-6 py-4">
      <ul class="flex justify-between text-xl font-semibold text-pink-800">
        <li class="flex justify-center py-1 basis-1/3">
          <Button
            :class="tab1 ? '' : 'text-stone-400'"
            @click="
              () => {
                tab2 = false;
                tab1 = true;
                tab3 = false;
                tab4 = false;
              }
            "
            variant="ghost"
            class="p-2 m-auto"
            size="icon"
          >
            <LanguagesIcon :size="20" />
          </Button>
        </li>
        <li class="flex justify-center py-1 basis-1/3">
          <Button
            :class="tab2 ? '' : 'text-stone-400'"
            @click="
              () => {
                tab2 = true;
                tab1 = false;
                tab3 = false;
                tab4 = false;
              }
            "
            variant="ghost"
            size="icon"
          >
            <Download :size="20" />
          </Button>
        </li>
        <li class="flex justify-center py-1 basis-1/3">
          <Button
            :class="tab3 ? '' : 'text-stone-400'"
            @click="
              () => {
                tab2 = false;
                tab3 = true;
                tab1 = false;
                tab4 = false;
              }
            "
            variant="ghost"
            size="icon"
          >
            <Share2 :size="20" />
          </Button>
        </li>
        <li class="flex justify-center py-1 basis-1/3">
          <Button
            :class="tab4 ? '' : 'text-stone-400'"
            @click="
              () => {
                tab2 = false;
                tab3 = false;
                tab1 = false;
                tab4 = true;
              }
            "
            variant="ghost"
            size="icon"
          >
            <Image :size="20" />
          </Button>
        </li>
      </ul>
      <div
        class="relative flex items-center justify-between h-1 overflow-hidden bg-stone-100 rounded-2xl"
      >
        <div
          class="h-1 basis-1/3 rounded-2xl"
          :class="tab1 ? 'bg-pink-800' : 'bg-stone-200'"
        ></div>
        <div
          class="h-1 basis-1/3 rounded-2xl"
          :class="tab2 ? 'bg-pink-800' : 'bg-stone-200'"
        ></div>
        <div
          class="h-1 basis-1/3 rounded-2xl"
          :class="tab3 ? 'bg-pink-800' : 'bg-stone-200'"
        ></div>
        <div
          class="h-1 basis-1/3 rounded-2xl"
          :class="tab4 ? 'bg-pink-800' : 'bg-stone-200'"
        ></div>
      </div>
    </div>
    <div class="px-6 py-4 tab-content bg-stone-50">
      <div v-if="tab1">
        <FormField name="language" :value="language">
          <FormItem class="mb-4 text-sm text-left">
            <FormLabel>Documents Language</FormLabel>
            <FormControl>
              <select
                v-model="currentLanguage"
                class="w-full p-2 mt-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 ring-pink-900"
              >
                <option value="fr">French</option>
                <option value="en">English</option>
              </select>
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <Button size="sm" class="mt-2" @click="translateDocument"
          >Translate</Button
        >
      </div>
      <div v-if="tab2">
        <template v-for="field in download_field">
          <FormField
            v-slot="{ componentField }"
            name="download"
            class="w-full p-2 mt-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 ring-pink-900"
            :value="defaultValues[field.name]"
          >
            <FormItem class="mb-4 text-sm text-left">
              <FormLabel>{{ field.label }}</FormLabel>
              <FormControl>
                <FormControl>
                  <select
                    class="w-full p-2 mt-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 ring-pink-900"
                    v-if="field.type == 'select'"
                    v-model="typeBinding"
                  >
                    <option
                      v-for="item in field.options"
                      :value="item.value.toString()"
                    >
                      {{ item.text.toString() }}
                    </option>
                    <!-- <option value="en">English</option> -->
                  </select>
                  <Input
                    v-else
                    :type="field.type ? field.type : 'text'"
                    :placeholder="field.placeholder"
                    v-bind="componentField"
                  />
                </FormControl>
              </FormControl>
              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </template>
        <Button size="sm" @click="print()">Télécharger en pdf</Button>
      </div>
      <div v-if="tab3">
        <div class="flex items-center w-full gap-2 p-2 bg-white">
          <input
            type="url"
            value="http://localhost:3000/app/cv/builder/preview-9b01ff62-ea56-457e-97a9-ab9c03e3b8f6"
            id="link"
            class="max-w-full overflow-hidden text-sm text-slate-400 focus-visible:outline-none bg-inherit"
          />
          <Button
            title="copy"
            size="sm"
            @click="navigatorGet(route.fullPath)"
            class="text-black border-none hover:bg-pink-50 bg-inherit"
            ><Copy :size="16"
          /></Button>
        </div>
        <div class="flex flex-wrap items-center">
          <div>
            <div id="fb-root"></div>
            <div
              class="w-12 h-12 overflow-hidden rounded-full fb-share-button"
              data-href="https://cv-pro-client.vercel.app/app/cv/builder/preview-"
              data-layout=""
              data-size=""
            >
              <NuxtLink
                target="_blank"
                to="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcv-pro-client.vercel.app%2Fapp%2Fcv%2Fbuilder%2Fpreview-&amp;src=sdkpreparse"
                class="fb-xfbml-parse-ignore"
              >
                <img
                  src="assets/img/icons/facebook-svgrepo-com.svg"
                  alt=""
                  class="w-full h-full rounded-full"
                  srcset=""
                />
              </NuxtLink>
            </div>
          </div>
          <div>
            <a
              class="tweet size-5"
              target="_blank"
              href="https://twitter.com/share?text=<?= $datas['title']; ?>&hashtags=Blog"
            >
              <span class="fa-stack size-5 fa-lg">
                <i class="tw fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-twitter fa-stack-1x fa-inverse"></i> </span
            ></a>
          </div>
        </div>
      </div>
      <div v-if="tab4">
        <div>
          <label for="optionBackground">Size</label>
          <select
            class="w-full p-2 mt-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 ring-pink-900"
            v-model="optionBackground"
            @change="backgroundOption"
            name="optionBackground"
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <!-- <option value="en">English</option> -->
          </select>
        </div>
        <div>
          <label for="optionBackgroundPosition">Position</label>
          <select
            class="w-full p-2 mt-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 ring-pink-900"
            v-model="optionBackgroundPosition"
            @change="backgroundOptionPosition"
            name="optionBackgroundPosition"
          >
            <option value="top">Top</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="bottom">Bottom</option>
            <!-- <option value="en">English</option> -->
          </select>
        </div>
      </div>
    </div>
  </div>
  <div v-if="user">
    <nuxt-link
      class="flex-1 w-full text-sm text-pink-900"
      :to="{
        name: `app-cv-builder-step-id`,
        params: { id: 1 },
        query: { template_id: $route.params.id },
      }"
    >
      <Button class="w-full my-4 text-pink-900 bg-inherit hover:text-white"
        >modifier mes informations</Button
      >
    </nuxt-link>
    <Button @click="submitCV" class="w-full">enregistrer</Button>
  </div>
</template>
