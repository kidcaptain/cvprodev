<script setup lang="ts">
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
// import type TemplateToPdf from "~/components/builder/preview/Template-to-pdf.vue";
import TemplatesTemplate1 from "@/components/templates/template-1.vue";
import TemplatesTemplate2 from "@/components/templates/template-2.vue";
import TemplatesTemplate3 from "@/components/templates/template-3.vue";
import TemplatesTemplate4 from "@/components/templates/template-4.vue";

import TemplatesTemplate5 from "@/components/templates/template-5.vue";
import TemplatesTemplate6 from "@/components/templates/template-6.vue";
import TemplatesTemplate7 from "@/components/templates/template-7.vue";
import TemplatesTemplate8 from "@/components/templates/template-8.vue";

import TemplatesTemplate12 from "@/components/templates/template-12.vue";
import TemplatesTemplate13 from "@/components/templates/template-13.vue";
import TemplatesTemplate14 from "@/components/templates/template-14.vue";
import Button from "~/components/ui/button/Button.vue";

definePageMeta({
  layout: "template-preview",
});

const route = useRoute();
useHead({
  title: "Preview CV - CV PRO",
});
const imagePreview = ref(false);
// const { data, error } = await useFetch<any>(
//   "/api/templates/templateById?id=" + route.params.id
// );
const id = route.params.id;

const resolveComponent = () => {
  if (id == "1") return TemplatesTemplate2;
  if (id == "2") return TemplatesTemplate1;
  if (id == "3") return TemplatesTemplate3;
  if (id == "4") return TemplatesTemplate4;
  if (id == "5") return TemplatesTemplate5;
  if (id == "6") return TemplatesTemplate6;
  if (id == "7") return TemplatesTemplate7;
  if (id == "8") return TemplatesTemplate8;
  if (id == "12") return TemplatesTemplate12;
  if (id == "13") return TemplatesTemplate13;
  if (id == "14") return TemplatesTemplate14;
};

const isRaedy = ref(false);
const scale = ref(0.4);
// const pdfSection = ref<HTMLElement | null>(null);
const datasTemplate = ref<any>();

onMounted(() => {
  const step1 = window.localStorage.getItem("step_1");
  const step2 = window.localStorage.getItem("step_2");

  const elementContent = document.getElementById("content");
  const htmlToImageContent = document.getElementById("htmlToImage");
  if (elementContent) {
    elementContent.style.fontFamily =
      "font-family: 'Poppins', sans-serif !important";
    htmlToImage
      .toJpeg(elementContent)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.getElementById("previewImage")?.appendChild(img);
        var windowWidth = window.innerWidth;
        if (windowWidth < 1000) {
          imagePreview.value = true;
        }
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }

  if (step1 && step2) {
    const upload_file = document.getElementById("user_img");
    var base64 = window.localStorage.getItem("profileimage");
    if (base64 != null) {
      if (upload_file) {
        (upload_file as HTMLImageElement).src = base64;
      }
      const imageProfile = document.getElementById("image_profil");
      if (imageProfile) {
        imageProfile.style.backgroundImage = "url(" + base64 + ")";
        // imageProfile.style.margin = "auto";
      }
    } else {
     
      if (upload_file) {
        upload_file.style.display = "none";
      }
      const imageProfile = document.getElementById("image_profil");
      if (imageProfile) {
        imageProfile.style.display = "none";
      }
    }
    
    const etape1: {
      firstname: string;
      lastname: string;
      title: string;
      experience: string;
      address: string;
      phone: string;
      linkedIn: string;
      maritalStatus: string;
      email: string;
      website: string;
      objective: string;
      name: string;
    } = JSON.parse(step1);

    const etape2: {
      title: string;
      data: {
        jobTitle: string;
        title: string;
        company: string;
        startDate: string;
        endDate: string;
        start_date: string;
        professionalTasksPerformed: string;
        end_date: string;
        experience: string;

        type: string;
        award: string;
        grade: string;
        city: string;
        field_of_study: string;
        grade_obtained: string;
        level: string;
        tasks: string;
        references_name: string;
        references_phone: string;
        email: string;
        position: string;
      }[];
    }[] = JSON.parse(step2);

    datasTemplate.value = {
      nom: etape1.firstname,
      prenom: etape1.lastname,
      title: etape1.title,
      experience: etape1.experience,
      address: etape1.address,
      phone: etape1.phone,
      linkedIn: etape1.linkedIn,
      maritalStatus: etape1.maritalStatus,
      email: etape1.email,
      website: etape1.website,
      resume: etape1.objective,
      educations: etape2[1].data,
      image: base64,
      personalSkills: etape2[2].data,
      professionalSkills: etape2[3].data,
      languages: etape2[4].data,
      hobbies: etape2[5].data,
      workExperiences: etape2[0].data,
      references: etape2[8].data,
      awards: etape2[7].data,
      certifications: etape2[6].data,
      projects: etape2[9].data,
    };
    const firstname = document.getElementById("firstname");
    if (firstname) {
      if (!etape1.firstname || !etape1.name) {
        var text = etape1.name ?? etape1.firstname;
        firstname.innerText = text;
      } else {
        firstname.style.display = "none";
      }
    }

    const lastname = document.getElementById("lastname");
    if (lastname) {
      lastname.innerText = etape1.lastname;
      if (!etape1.lastname) {
        lastname.style.display = "none";
      }
    }

    const title = document.getElementById("title");
    if (title) {
      title.innerText = etape1.title;
      if (!etape1.title) {
        title.style.display = "none";
      }
    }

    const address = document.getElementById("address");
    if (address) {
      address.innerText = etape1.address;
      if (!etape1.address) {
        address.style.display = "none";
      }
    }

    const maritalStatus = document.getElementById("maritalStatus");
    if (maritalStatus) {
      maritalStatus.innerText = etape1.maritalStatus;
      if (!etape1.maritalStatus) {
        maritalStatus.style.display = "none";
      }
    }

    const linkedIn = document.getElementById("linkedIn");
    if (linkedIn) {
      linkedIn.innerText = etape1.linkedIn;
      if (!etape1.linkedIn) {
        linkedIn.style.display = "none";
      }
    }

    const phone = document.getElementById("phone");
    if (phone) {
      phone.innerText = etape1.phone;
      if (!etape1.phone) {
        phone.style.display = "none";
      }
    }

    const email = document.getElementById("email");
    if (email) {
      email.innerText = etape1.email;
      if (!etape1.email) {
        email.style.display = "none";
      }
    }

    const personal_skills = document.getElementById("personal_skills");
    if (personal_skills) {
      var text = "";
      if (etape2[2].data.length > 0) {
        etape2[2].data.forEach((e) => {
          text += ` <li class="point2_template">${e.title}</li>`;
        });
        personal_skills.innerHTML = text;
      } else {
        const personalCadre = document.getElementById("personal_skills_cadre");
        if (personalCadre) {
          personalCadre.style.display = "none";
        }
        personal_skills.style.display = "none";
      }
    }
    const professional_skills = document.getElementById("professional_skills");
    if (professional_skills) {
      var text = "";
      if (etape2[3].data.length > 0) {
        etape2[3].data.forEach((e) => {
          text += ` <li class="point2_template">${e.title}</li>`;
        });
        professional_skills.innerHTML = text;
      } else {
        const professionalCadre = document.getElementById(
          "professional_skills_cadre"
        );
        if (professionalCadre) {
          professionalCadre.style.display = "none";
        }
        professional_skills.style.display = "none";
      }
    }

    const language = document.getElementById("language");
    if (language) {
      var text = "";
      if (etape2[4].data.length > 0) {
        etape2[4].data.forEach((e) => {
          text += ` <li>
                        <span class="text">${e.title}</span><br>
                        <i style="text-decoration: none; font-style: italic; font-size: small;">${e.level}</i>
                    </li>`;
        });
        language.innerHTML = text;
      } else {
        const languageCadre = document.getElementById("language_cadre");
        if (languageCadre) {
          languageCadre.style.display = "none";
        }
        language.style.display = "none";
      }
    }

    const hobbies = document.getElementById("hobbies");
    if (hobbies) {
      var text = "";
      if (etape2[5].data.length > 0) {
        etape2[5].data.forEach((e) => {
          text += `<li class="point2_template">${e.title}</li>`;
        });
        hobbies.innerHTML = text;
      } else {
        const hobbiesCadre = document.getElementById("hobbies_cadre");
        if (hobbiesCadre) {
          hobbiesCadre.style.display = "none";
        }
        hobbies.style.display = "none";
      }
    }

    const achievements = document.getElementById("achievements");
    if (achievements) {
      var text = "";
      if (etape2[7].data.length > 0) {
        etape2[7].data.forEach((e) => {
          text += `<li class="point2_template">${e.title}</li>`;
        });
        achievements.innerHTML = text;
      } else {
        const projectCadre = document.getElementById("project_cadre");
        if (projectCadre) {
          projectCadre.style.display = "none";
        }
        achievements.style.display = "none";
      }
    }

    const references = document.getElementById("references");
    const referencesLeftRight = document.getElementById(
      "references_left_right"
    );
    if (references) {
      var text = "";
      if (etape2[8].data.length > 0) {
        etape2[8].data.forEach((e) => {
          text += `<li class="point2_template">${e.references_name}(<span style="font-size: 12px; opacity: 0.8;">${e.position}</span>) <br> <span style="font-size: 12px; opacity: 0.8;"> ${e.email} </span></li>`;
        });
        references.innerHTML = text;
      } else {
        const referencesCadre = document.getElementById("references_cadre");
        if (referencesCadre) {
          referencesCadre.style.display = "none";
        }
        references.style.display = "none";
      }
    }
    if (referencesLeftRight) {
      var text = "";
      if (etape2[8].data.length > 0) {
        etape2[8].data.forEach((e) => {
          text += `<li class="point2_template">${e.references_name}(<span style="font-size: 12px; opacity: 0.8;">${e.position}</span>) <br> <span style="font-size: 12px; opacity: 0.8;"> ${e.email} </span></li>`;
        });
        referencesLeftRight.innerHTML = text;
      } else {
        const referencesCadre = document.getElementById("references_cadre");
        if (referencesCadre) {
          referencesCadre.style.display = "none";
        }
        referencesLeftRight.style.display = "none";
      }
    }

    // A modifier
    const social = document.getElementById("social");
    if (social) {
      // social.style.display = "none"

      // var text = "";
      // if (etape2[2].data.length > 0) {
      //   etape2[2].data.forEach((e) => {
      //     text += `
      //      <li>
      //       <span class="icon" style="color: white;"><i class="fa fa-facebook"
      //                           aria-hidden="true"></i></span>
      //                   <span class="text">${e.title}</span>
      //               </li>`;
      //   });
      //   social.innerHTML = text;
      // } else {
      const socialCadre = document.getElementById("social_cadre");
      if (socialCadre) {
        socialCadre.style.display = "none";
      }
      //   social.style.display = "none";
      // }
    }

    const resume = document.getElementById("resume");
    if (resume) {
      if (etape1.objective != "") {
        resume.innerHTML = etape1.objective;
      } else {
        const resumeCadre = document.getElementById("profesional_cadre");
        if (resumeCadre) {
          resumeCadre.style.display = "none";
        }
        resume.style.display = "none";
      }
    }
    const work_experience = document.getElementById("work_experience");
    if (work_experience) {
      text = "";
      if (etape2[0].data.length > 0) {
        etape2[0].data.forEach((e) => {
          text += `
        <div class="content">
                        <div class="right-align">
                            <p><b>${e.jobTitle}</b></p>
                            <p class="red_text"><i>${e.company}</i></p>

                        </div>
                        <div class="left-align">
                            <p style="color: grey;"><i>${e.startDate} – ${
            e.endDate
          }</i></p>
                            <p>Cameroon</p>
                        </div>
                    </div><br>
                     <P style="padding: 0 50px; opacity: 0.7; font-size: 14px;" >
                        ${e.professionalTasksPerformed.toString()}
                    </P><br>`;
        });
        work_experience.innerHTML = text;
      } else {
        const experienceCadre = document.getElementById(
          "work_experience_cadre"
        );
        if (experienceCadre) {
          experienceCadre.style.display = "none";
        }
        work_experience.style.display = "none";
      }
    }

    const education = document.getElementById("education");
    if (education) {
      text = "";
      console.log(etape2);
      if (etape2[1].data.length > 0) {
        etape2[1].data.forEach((e) => {
          text += `
        <p><b>${e.title}</b></p>
                    <p class="red_text"><i>${e.grade}</i></p>
                    <p style="color: grey;"><i>${e.start_date} - ${e.end_date}</i></p><br>
                    `;
        });
        education.innerHTML = text;
      } else {
        const educationCadre = document.getElementById("education_cadre");
        if (educationCadre) {
          educationCadre.style.display = "none";
        }
        education.style.display = "none";
      }
    }

    const certifications = document.getElementById("certifications");
    if (certifications) {
      text = "";
      if (etape2[6].data.length > 0) {
        etape2[6].data.forEach((e) => {
          text += `
        <p>${e.title}</p>
                <p style="color: grey;"><i>${e.end_date}</i></p><br>
                    `;
        });
        certifications.innerHTML = text;
      } else {
        const certificationsCadre = document.getElementById(
          "certifications_cadre"
        );
        if (certificationsCadre) {
          certificationsCadre.style.display = "none";
        }
        certifications.style.display = "none";
      }
    }

    const award = document.getElementById("award");
    const awardLeftRight = document.getElementById("award_left_right");
    if (award) {
      text = "";

      const company = document.querySelector(".award_company");
      const title = document.querySelector(".award_title");
      const date = document.querySelector(".award_date");
      if (company && title && date) {
        title.innerHTML = etape2[7].data[0].title;
        company.innerHTML = etape2[7].data[0].award;
        date.innerHTML = etape2[7].data[0].start_date;
        award.innerHTML = "";
        award.innerHTML += title.innerHTML;
        award.innerHTML += company.innerHTML;
        award.innerHTML += date.innerHTML;
      }

      etape2[7].data.forEach((e, index: number) => {
        if (index > 0) {
          if (company && title && date) {
            title.innerHTML = e.title;
            company.innerHTML = e.award;
            date.innerHTML = e.start_date;
            award.appendChild(title);
            award.appendChild(company);
            award.appendChild(date);
          }
        }
      });
      award.innerHTML = text;
    }

    const element = document.getElementById("content");
    const preview = document.getElementById("preview");
    // if (element && preview) {
    //   element.style.width = "827px";
    //   element.style.height = `${
    //     Math.ceil(element.getBoundingClientRect().height / 1170.4889) *
    //     1170.4889
    //   }px`;
    //   if (Math.ceil(element.getBoundingClientRect().height / 800) > 1) {
    //     const hr = document.createElement("div");
    //     hr.style.position = "absolute";
    //     hr.style.transform = "translateY(-50%)";
    //     hr.style.top = "50%";
    //     hr.style.backgroundColor = "#faf4f4";
    //     hr.style.padding = "5px 0";
    //     hr.style.width = "100%";
    //     hr.style.textAlign = "center";
    //     hr.style.minWidth = "816.3px";
    //     hr.style.fontSize = "14px";

    //     hr.innerText =
    //       "Page " +
    //       Math.ceil(element.getBoundingClientRect().height / 1170.4889);
    //     preview.append(hr);
    //   }
    // }
  }

  isRaedy.value = true;
});

const reformDate = (str: string) => {
  var date = new Date(str);
  var dateNow = new Date();
  if (
    date.getFullYear() == dateNow.getFullYear() &&
    dateNow.getMonth() == date.getMonth()
  ) {
    return "present";
  }
  return `${
    date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
  }/${date.getFullYear()}`;
};

const reformDateByMonth = (str: string) => {
  var date = new Date(str);
  var dateNow = new Date();
  if (date.getFullYear() == dateNow.getFullYear()) {
    return "present";
  }
  return date.getFullYear();
};

const reloadPage = () => {
  window.location.reload();
};
</script>

<template :ref="pdfSection">
  <!-- <Button @click="submitCV">Save</Button> -->

  <section
    class="container overflow-hidden z-10 grid sm:min-h-screen grid-cols-4 gap-8 p-10 translate-x-1 max-sm:flex max-xl:flex-col"
  >
    <div class="col-span-1">
      <BuilderPreviewTools
        :templateId="route.params.id"
        :isEditedPage="false"
      />
    </div>
    <div class="col-span-3  overflow-hidden relative">
      <!-- <div class="my-1"><Button @click="imagePreview = false" size="sm">Preview pdf</Button> <Button @click="imagePreview = true" size="sm" variant="outline">Preview Image</Button></div> -->
      <!-- <div v-if="imagePreview" id="previewImage" class="w-fit m-auto border"></div> -->
      <div>
        <div id="previewImage" class="w-fit m-auto sm:hidden border"></div>
        <component
          v-if="!imagePreview"
          :is="resolveComponent()"
          v-bind="datasTemplate"
        ></component>
      </div>
    
    </div>
  </section>
  <div v-if="!isRaedy" class=" flex z-40 justify-center items-center fixed top-0 left-0 w-full bg-primary h-full">
      <div class="animate-bounce text-white font-medium">
        Please wait...
      </div>
  </div>
</template>
<style scoped>
.container_template {
  width: fit-content;
  min-height: 1054.4889px;
  min-width: 816.3px;
  max-width: 1000.3px;
}
@media screen and (max-width: 500px)
{
  .container_template {
    /* transform: scale(0.4) translateX(0); */
    position: relative;
    left: 0;
    z-index: -1;
    top: 0;
  }
}

</style>
