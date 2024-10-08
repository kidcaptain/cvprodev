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
import { TranslateDataPreview } from "@/assets/content/translate";
const { session, user } = useAuth();
const BASE_URL = useRuntimeConfig().public.backendAPI;
const tab1 = ref(false);
const tab2 = ref(true);
const tab3 = ref(false);
const tab4 = ref(false);

const route = useRoute();
const router = useRouter();

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
const props = defineProps<{
  templateId: string | string[];
  isEditedPage: boolean;
}>();
const typeBinding = ref<string>("PDF");
const currentLanguage = ref<string>("en");

const defaultValues = ref();
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
    options: [{ text: "PDF", value: "pdf" }],
  },
];
const translateDocument = async () => {
  const content = document.getElementById("content");
  const awardTitle = document.getElementById("award_title");
  const profesionalCadreTitle = document.getElementById(
    "profesional_cadre_title"
  );
  const workExperienceTitle = document.getElementById("work_experience_title");
  const educationTitle = document.getElementById("education_title");
  const skillsGeneralTitle = document.getElementById("skills_general_title");
  const professionalSkillsTitle = document.getElementById(
    "professional_skills_title"
  );
  const personalSkillsTitle = document.getElementById("personal_skills_title");
  const languageTitle = document.getElementById("language_title");
  const hobbiesTitle = document.getElementById("hobbies_title");
  const certificationsTitle = document.getElementById(
    "professional_skills_title"
  );
  const referencesTitle = document.getElementById("references_title");
  const projectTitle = document.getElementById("project_title");
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
        TranslateDataPreview.forEach((e) => {
          if (e.label == "award & honors" && awardTitle) {
            awardTitle.innerText = e.french;
          }
          if (e.label == "projects" && projectTitle) {
            projectTitle.innerText = e.french;
          }
          if (e.label == "references" && referencesTitle) {
            referencesTitle.innerText = e.french;
          }
          if (e.label == "hobbies" && hobbiesTitle) {
            hobbiesTitle.innerText = e.french;
          }
          if (e.label == "languages" && languageTitle) {
            languageTitle.innerText = e.french;
          }
          if (e.label == "professional skills" && professionalSkillsTitle) {
            professionalSkillsTitle.innerText = e.french;
          }
          if (e.label == "personal skills" && personalSkillsTitle) {
            personalSkillsTitle.innerText = e.french;
          }
          if (e.label == "certifications" && certificationsTitle) {
            certificationsTitle.innerText = e.french;
          }
          if (e.label == "award & honors" && awardTitle) {
            awardTitle.innerText = e.french;
          }
          if (e.label == "skills" && skillsGeneralTitle) {
            skillsGeneralTitle.innerText = e.french;
          }
          if (e.label == "education" && educationTitle) {
            educationTitle.innerText = e.french;
          }
          if (e.label == "work experience" && workExperienceTitle) {
            workExperienceTitle.innerText = e.french;
          }
          if (e.label == "professional summary" && profesionalCadreTitle) {
            profesionalCadreTitle.innerText = e.french;
          }
        });
        break;
      case "en":
        TranslateDataPreview.forEach((e) => {
          if (e.label == "award & honors" && awardTitle) {
            awardTitle.innerText = e.label;
          }
          if (e.label == "projects" && projectTitle) {
            projectTitle.innerText = e.label;
          }
          if (e.label == "references" && referencesTitle) {
            referencesTitle.innerText = e.label;
          }
          if (e.label == "hobbies" && hobbiesTitle) {
            hobbiesTitle.innerText = e.label;
          }
          if (e.label == "languages" && languageTitle) {
            languageTitle.innerText = e.label;
          }
          if (e.label == "professional skills" && professionalSkillsTitle) {
            professionalSkillsTitle.innerText = e.label;
          }
          if (e.label == "personal skills" && personalSkillsTitle) {
            personalSkillsTitle.innerText = e.label;
          }
          if (e.label == "certifications" && certificationsTitle) {
            certificationsTitle.innerText = e.label;
          }
          if (e.label == "award & honors" && awardTitle) {
            awardTitle.innerText = e.label;
          }
          if (e.label == "skills" && skillsGeneralTitle) {
            skillsGeneralTitle.innerText = e.label;
          }
          if (e.label == "education" && educationTitle) {
            educationTitle.innerText = e.label;
          }
          if (e.label == "work experience" && workExperienceTitle) {
            workExperienceTitle.innerText = e.label;
          }
          if (e.label == "professional summary" && profesionalCadreTitle) {
            profesionalCadreTitle.innerText = e.label;
          }
        });
        break;
      default:
        TranslateDataPreview.forEach((e) => {
          if (e.label == "award & honors" && awardTitle) {
            awardTitle.innerText = e.spanish;
          }
          if (e.label == "projects" && projectTitle) {
            projectTitle.innerText = e.spanish;
          }
          if (e.label == "references" && referencesTitle) {
            referencesTitle.innerText = e.spanish;
          }
          if (e.label == "hobbies" && hobbiesTitle) {
            hobbiesTitle.innerText = e.spanish;
          }
          if (e.label == "languages" && languageTitle) {
            languageTitle.innerText = e.spanish;
          }
          if (e.label == "professional skills" && professionalSkillsTitle) {
            professionalSkillsTitle.innerText = e.spanish;
          }
          if (e.label == "personal skills" && personalSkillsTitle) {
            personalSkillsTitle.innerText = e.spanish;
          }
          if (e.label == "certifications" && certificationsTitle) {
            certificationsTitle.innerText = e.spanish;
          }
          if (e.label == "award & honors" && awardTitle) {
            awardTitle.innerText = e.spanish;
          }
          if (e.label == "skills" && skillsGeneralTitle) {
            skillsGeneralTitle.innerText = e.spanish;
          }
          if (e.label == "education" && educationTitle) {
            educationTitle.innerText = e.spanish;
          }
          if (e.label == "work experience" && workExperienceTitle) {
            workExperienceTitle.innerText = e.spanish;
          }
          if (e.label == "professional summary" && profesionalCadreTitle) {
            profesionalCadreTitle.innerText = e.spanish;
          }
        });
        break;
    }
  
  }
};
const submitCV = async () => {
  const step1 = window.localStorage.getItem("step_1");
  const step2 = window.localStorage.getItem("step_2");
  const step3 = window.localStorage.getItem("step_3");
  const step4 = window.localStorage.getItem("step_4");
  var image = window.localStorage.getItem("profileimage");
  if (!image) {
    image = null;
  }
  if (step1 || step2 || step3 || step4 || image) {
    const etape1: {
      firstname: string;
      lastname: string;
      title: string;
      yearOfExperience: string;
      address: string;
      phone: string;
      email: string;
      website: string;
      objective: string;
    } = JSON.parse(`${step1}`);
    const etape2: {
      title: string;
      data: {
        email: any;
        references_name: any;
        position: any;
        award: any;
        tasks: string;
        title: string;
        company: string;
        start_date: string;
        end_date: string;
        experience: string;
        grade: string;
        type: string;
        professionalTasksPerformed: string;
        jobTitle: string;
        startDate: string;
        endDate: string;
      }[];
    }[] = JSON.parse(`${step2}`);
    const educations: {
      institution: string;
      degree: string;
      yearOfGraduation: string;
    }[] = [];
    var professionalExperience:
      | {
          jobTitle: string;
          company: string;
          period: string;
          professionalTasksPerformed: string;
        }[]
      | null
      | any = [];
    etape2[1].data.forEach((e) => {
      educations.push({
        institution: e.title,
        degree: e.grade,
        yearOfGraduation: e.start_date + " - " + e.end_date,
      });
    });
    if (educations.length == 0) {
      educations.push({
        institution: "aaa",
        degree: "aaa",
        yearOfGraduation: "2023-02",
      });
    }
    etape2[0].data.forEach((e) => {
      professionalExperience.push({
        jobTitle: e.jobTitle.toString(),
        company: e.company.toString(),
        period: (e.startDate + " / " + e.endDate).toString(),
        professionalTasksPerformed: e.professionalTasksPerformed.toString(),
      });
    });
    if (professionalExperience.length == 0) {
      professionalExperience = null;
    }

    var references:
      | {
          institutionName: string;
          referenceFunction: string;
          referenceName: string;
          referenceNumber: string;
          referenceEmail: string;
        }[]
      | null
      | any = [];

    etape2[8].data.forEach((e) => {
      references.push({
        institutionName: e.title,
        referenceFunction: e.position,
        referenceName: e.references_name,
        referenceNumber: e.references_name,
        referenceEmail: e.email,
      });
    });
    if (references.length == 0) {
      references = null;
    }
    var professionalSkills: string[] | null | any = [];
    etape2[2].data.forEach((e) => {
      professionalSkills.push(e.title);
    });

    if (professionalSkills.length == 0) {
      professionalSkills = null;
    }

    var personalSkills: string[] | null | any = [];
    etape2[3].data.forEach((e) => {
      personalSkills.push(e.title);
    });

    if (personalSkills.length == 0) {
      personalSkills = null;
    }

    var languages:
      | {
          language: string;
          abilityLevel: string;
        }[]
      | null
      | any = [];

    etape2[4].data.forEach((e) => {
      languages.push({
        language: e.title,
        abilityLevel: e.type,
      });
    });

    if (languages.length == 0) {
      languages = null;
    }
    var hobbies: string[] | null | any = [];

    etape2[5].data.forEach((e) => {
      hobbies.push(e.title);
    });

    if (hobbies.length == 0) {
      hobbies = null;
    }

    var certification:
      | {
          institutionName: string;
          yearObtained: string;
          certificationName: string;
        }[]
      | null
      | any = [];

    etape2[6].data.forEach((e) => {
      certification.push({
        institutionName: e.title,
        yearObtained: e.end_date,
        certificationName: e.grade,
      });
    });

    if (certification.length == 0) {
      certification = null;
    }

    var award:
      | {
          award: string;
          yearObtained: string;
          company: string;
        }[]
      | null
      | any = [];

    etape2[7].data.forEach((e) => {
      award.push({
        award: e.award,
        yearObtained: e.start_date,
        company: e.title,
      });
    });

    if (award.length == 0) {
      award = null;
    }

    var project:
      | {
          projectTitle: string;
          projectTasksPerformed: string;
          projectLink: string;
        }[]
      | null
      | any = [];

    etape2[9].data.forEach((e) => {
      project.push({
        projectTitle: e.title + "",
        projectTasksPerformed: e.tasks + "",
        projectLink: "",
      });
    });

    if (project.length == 0) {
      project = null;
    }

    console.log(etape1, etape2);
    const cvData = {
      userId: session.value?.uid,
      templateId:  "d6be0bb5-2fed-4e4b-b98c-7d0b10dec356",
      picturePath: image != "" ? image : null,
      profileInformations: JSON.stringify({
        name: `${etape1.firstname} ${etape1.lastname}`,
        title: etape1.title,
        yearsOfExperience: props.templateId,
        phone: etape1.phone,
        address: etape1.address,
        email: etape1.email,
        goal: etape1.objective,
        website: etape1.website,
      }),
      educations: JSON.stringify(educations),
      references: JSON.stringify(references),
      personalSkills: JSON.stringify(personalSkills),
      professionalSkills: JSON.stringify(professionalSkills),
      ProfessionalExperienceInformation: JSON.stringify(professionalExperience),
      certifications: JSON.stringify(certification),
      projects: JSON.stringify(project),
      languages: JSON.stringify(languages),
      hobbies: JSON.stringify(hobbies),
      tmpKey: null,
      isDeleted: "0",
    };

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

const print = async () => {
  if (session.value != null) {
  console.log(defaultValues)
  const download = document.getElementById("download-pdf");
  if (download) {
    download.addEventListener("click", () => {
      const element = document.getElementById("content");
      if (element) {
        const options = {
          filename: defaultValues.value,
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
        html2pdf().set(options).from(element).save();
      }
    });
    download.click();
  } else {
  }
  } else {
    if (confirm("Log in to use this feature")) {
      router.push("/auth/login");
    }
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
const optionBackground = ref<string>("");
const optionBackgroundPosition = ref<string>("");
const optionBackgroundNoRepeat = ref<string>("");
const optionBackgroundSize = ref<string>("");
const optionBackgroundColor = ref<string>("");
// const optionBackgroundRadius = ref<string>("");

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
const backgroundOptionNoRepeat = () => {
  const image_profil = document.getElementById("image_profil");
  if (image_profil) {
    image_profil.style.backgroundRepeat = optionBackgroundNoRepeat.value;
  }
};
const backgroundOptionColor = () => {
  const image_profil = document.getElementById("image_profil");
  if (image_profil) {
    image_profil.style.backgroundColor = optionBackgroundColor.value;
  }
};
const backgroundOptionSize = () => {
  const image_profil = document.getElementById("image_profil");
  if (image_profil) {
    switch (optionBackgroundSize.value) {
      case "full":
        image_profil.style.width = "100%";
        image_profil.style.height = "100%";
        break;
      case "small":
        image_profil.style.width = "75px";
        image_profil.style.height = "75px";
        break;
      default:
        image_profil.style.width = "150px";
        image_profil.style.height = "150px";
        break;
    }
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
        <div>
          <label>File Name</label>
          <Input
           class="w-full p-2 mt-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 ring-pink-900"
            type="text"
            placeholder=""
            v-model="defaultValues"
          />
        </div>
     
        <Button size="sm" class="mt-2" @click="print()">Download in pdf</Button>
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
          </select>
        </div>
        <div>
          <label for="optionBackgroundPosition">Repeat</label>
          <select
            class="w-full p-2 mt-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 ring-pink-900"
            v-model="optionBackgroundNoRepeat"
            @change="backgroundOptionNoRepeat"
            name="optionBackgroundNoRepeat"
          >
            <option value="space">Space</option>
            <option value="no-repeat">No Repeat</option>
            <option value="round">Round</option>
            <option value="repeat">Repeat</option>
          </select>
        </div>
        <div>
          <label for="optionBackgroundPosition">Size</label>
          <select
            class="w-full p-2 mt-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 ring-pink-900"
            v-model="optionBackgroundSize"
            @change="backgroundOptionSize"
            name="optionBackgroundNoRepeat"
          >
            <option value="full">Full</option>
            <option value="normal">Normal</option>
            <option value="small">Small</option>
          </select>
        </div>

        <div>
          <label for="optionBackgroundPosition">Color</label>
          <input
            type="color"
            class="w-full p-2 mt-2 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 ring-pink-900"
            v-model="optionBackgroundColor"
            @change="backgroundOptionColor"
            name="optionBackgroundNoRepeat"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="user">
    <!-- <nuxt-link
      class="flex-1 w-full text-sm text-pink-900"
      :to="{
        name: `app-cv-builder-step-id`,
        params: { id: 1 },
        query: { template_id: $route.params.id },
      }"
    >
      <Button class="w-full my-4 text-pink-900 bg-inherit hover:text-white"
        >edit cv</Button
      >
    </nuxt-link> -->
    <Button @click="submitCV" v-if="!isEditedPage" class="w-full mt-4"
      >Save</Button
    >
  </div>
</template>
