<script setup lang="ts">
import { SelectItem } from "radix-vue";

import { useForm } from "vee-validate";
// import type TemplateToPdf from "~/components/builder/preview/Template-to-pdf.vue";

definePageMeta({
  layout: "template-preview",
   middleware: "auth"
});
const { user, session } = useAuth();
const route = useRoute();

const { data, error } = await useFetch<any>(
  "/api/templates/cvById?id=" + route.params.id + "&userId=" + session.value?.uid
);
// const { data, error } = await useFetch<any>(
//   "/api/templates/cvById"
// );

const isRaedy = ref(false);

const pdfSection = ref<HTMLElement | null>(null);

onMounted(() => {
  const cvPro: any = {};

  const upload_file = document.getElementById("user_img");
  var base64 = window.localStorage.getItem("profileimage");
  if (base64) {
    if (upload_file) {
      (upload_file as HTMLImageElement).src = base64;
    }
  }

  const firstname = document.getElementById("firstname");
  if (firstname) {
    if (!cvPro.profileInformations.name) {
      var text =
        cvPro.profileInformations.name ?? cvPro.profileInformations.firstname;
      firstname.innerText = text;
    } else {
      firstname.style.display = "none";
    }
  }

  const title = document.getElementById("title");
  if (title) {
    if (!cvPro.profileInformations.title) {
      title.style.display = "none";
    } else {
      title.innerText = cvPro.profileInformations.title;
    }
  }

  const address = document.getElementById("address");
  if (address) {
    if (!cvPro.profileInformations.address) {
      address.style.display = "none";
    } else {
      address.innerText = cvPro.profileInformations.address;
    }
  }

  const phone = document.getElementById("phone");
  if (phone) {
    if (!cvPro.profileInformations.phone) {
      phone.style.display = "none";
    } else {
      phone.innerText = cvPro.profileInformations.phone;
    }
  }

  const email = document.getElementById("email");
  if (email) {
    if (!cvPro.profileInformations.email) {
      email.style.display = "none";
    } else {
      email.innerText = cvPro.profileInformations.email;
    }
  }

  const personal_skills = document.getElementById("personal_skills");
  if (personal_skills) {
    var textPersonal = "";
    var personalSkills: string[] = JSON.parse(cvPro.personalSkills);
    if (personalSkills.length > 0) {
      personalSkills.forEach((e) => {
        textPersonal += ` <li class="point2_template">${e}</li>`;
      });
      personal_skills.innerHTML = textPersonal;
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
    var textprofessionalSkills = "";
    var professionalSkills: string[] = JSON.parse(cvPro.professionalSkills);
    if (professionalSkills.length > 0) {
      professionalSkills.forEach((e) => {
        text += ` <li class="point2_template">${e}</li>`;
      });
      professional_skills.innerHTML = textprofessionalSkills;
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
    var textlanguage = "";
    var languages: any[] = JSON.parse(cvPro.language);
    if (languages.length > 0) {
      languages.forEach((e) => {
        text += ` <li>
                        <span class="text">${e.language}</span><br>
                        <i style="text-decoration: none; font-style: italic; font-size: small;">${e.abilityLevel}</i>
                    </li>`;
      });
      language.innerHTML = textlanguage;
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
    var texthobbies = "";
    var hobbiesData: string[] = JSON.parse(cvPro.language);
    if (hobbiesData.length > 0) {
      hobbiesData.forEach((e) => {
        text += `<li class="point2_template">${e}</li>`;
      });
      hobbies.innerHTML = texthobbies;
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
    var textachievements = "";
    var projects: any[] = JSON.parse(cvPro.project);
    if (projects.length > 0) {
      projects.forEach((e) => {
        text += `<li class="point2_template">${e.projectTitle}</li>`;
      });
      achievements.innerHTML = textachievements;
    } else {
      const projectCadre = document.getElementById("project_cadre");
      if (projectCadre) {
        projectCadre.style.display = "none";
      }
      achievements.style.display = "none";
    }
  }

  const references = document.getElementById("references");
  const referencesLeftRight = document.getElementById("references_left_right");
  if (references) {
    var textReference: string = "";
    var referenceInfos: any[] = JSON.parse(cvPro.references);
    if (referenceInfos.length > 0) {
      referenceInfos.forEach((e) => {
        text += `<li class="point2_template">${
          e.referenceName
        }(<span style="font-size: 12px; opacity: 0.8;">${
          e.referenceFunction
        } - ${e.institutionName}</span>) ${
          e.referenceNumber ?? ""
        } <br> <span style="font-size: 12px; opacity: 0.8;"> ${
          e.referenceEmail
        } </span></li>`;
      });
      references.innerHTML = textReference;
    } else {
      const referencesCadre = document.getElementById("references_cadre");
      if (referencesCadre) {
        referencesCadre.style.display = "none";
      }
      references.style.display = "none";
    }
  }
  if (referencesLeftRight) {
    var textReferencesLeftRight = "";
    var referenceInfos: any[] = JSON.parse(cvPro.references);
    if (referenceInfos.length > 0) {
      referenceInfos.forEach((e) => {
        text += `<li class="point2_template">${
          e.referenceName
        }(<span style="font-size: 12px; opacity: 0.8;">${
          e.referenceFunction
        } - ${e.institutionName}</span>) ${
          e.referenceNumber ?? ""
        } <br> <span style="font-size: 12px; opacity: 0.8;"> ${
          e.referenceEmail
        } </span></li>`;
      });
      referencesLeftRight.innerHTML = textReferencesLeftRight;
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
    // var text = "";
    // if (etape4[2].data.length > 0) {
    //   etape4[2].data.forEach((e) => {
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
    social.style.display = "none";
    // }
  }

  const resume = document.getElementById("resume");
  if (resume) {
    if (cvPro.goal != "") {
      resume.innerHTML = cvPro.goal;
    } else {
      const resumeCadre = document.getElementById("profesional_cadre_title");
      if (resumeCadre) {
        resumeCadre.style.display = "none";
      }
      resume.style.display = "none";
    }
  }
  const work_experience = document.getElementById("work_experience");
  if (work_experience) {
    text = "";
    var ProfessionalExperienceInformation: any[] = JSON.parse(
      cvPro.ProfessionalExperienceInformation
    );
    if (ProfessionalExperienceInformation.length > 0) {
      ProfessionalExperienceInformation.forEach((e) => {
        text += `
        <div class="content">
                        <div class="right-align">
                            <p><b>${e.jobTitle}</b></p>
                            <p class="red_text"><i>${e.company}</i></p>

                        </div>
                        <div class="left-align">
                            <p style="color: grey;"><i>${e.period}</i></p>
                            <p>Cameroon</p>
                        </div>
                    </div><br>
                     <P style="padding: 0 50px; opacity: 0.7; font-size: 14px;" >
                        ${e.professionalTasksPerformed}
                    </P><br>`;
      });
      work_experience.innerHTML = text;
    } else {
      const experienceCadre = document.getElementById("work_experience_cadre");
      if (experienceCadre) {
        experienceCadre.style.display = "none";
      }
      work_experience.style.display = "none";
    }
  }

  const education = document.getElementById("education");
  if (education) {
    text = "";
    var educations: any[] = JSON.parse(cvPro.educations);
    if (educations.length > 0) {
      educations.forEach((e) => {
        text += `
        <p><b>${e.institution}</b></p>
                    <p class="red_text"><i>${e.grade}</i></p>
                    <p style="color: grey;"><i>${e.yearOfGraduation}</i></p><br>
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
    var certificationsInfo: any[] = JSON.parse(cvPro.certifications);
    if (certificationsInfo.length > 0) {
      certificationsInfo.forEach((e) => {
        text += `
        <p>${e.institutionName}</p></br>
        <p>${e.certificationName}</p>
                <p style="color: grey;"><i>${e.yearObtained}</i></p><br>
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

    // const company = document.querySelector(".award_company");
    // const title = document.querySelector(".award_title");
    // const date = document.querySelector(".award_date");
    // if (company && title && date) {
    //   title.innerHTML = etape3[3].data[0].title;
    //   company.innerHTML = etape3[3].data[0].award;
    //   date.innerHTML = etape3[3].data[0].start_date;
    //   award.innerHTML = "";
    //   award.innerHTML += title.innerHTML;
    //   award.innerHTML += company.innerHTML;
    //   award.innerHTML += date.innerHTML;
    // }
    // console.log(award.innerHTML);
    // etape3[3].data.forEach((e, index: number) => {
    //   if (index > 0) {
    //     if (company && title && date) {
    //       title.innerHTML = e.title;
    //       company.innerHTML = e.award;
    //       date.innerHTML = e.start_date;
    //       award.appendChild(title);
    //       award.appendChild(company);
    //       award.appendChild(date);
    //     }
    //   }
    // });
    // award.innerHTML = text;
  }
  if (awardLeftRight) {
    text = "";

    // const company = document.querySelector(".award_company");
    // const title = document.querySelector(".award_title");
    // const date = document.querySelector(".award_date");
    // awardLeftRight.innerHTML = "";

    // etape3[3].data.forEach((e, index: number) => {
    //   if (index % 2 == 0) {
    //     text += `
    //     <div class="left-column_template">
    //       <div class="content_template">
    //           <div class="vertical-line_template">
    //               <p class="award_company">${e.title}</p>
    //               <p class="red_text_template award_title"><i>${
    //                 e.award
    //               }</i></p>
    //                 <p class=<"award_date" style="color: grey;"><i>${reformDateByMonth(
    //                   e.start_date
    //                 )}</i></p>
    //             </div>
    //         </div>
    //     </div>
    //               `;
    //   } else {
    //     text += `
    //     <div class="right-column_template">
    //       <div class="content_template">
    //           <div class="vertical-line_template">
    //               <p class="award_company">${e.title}</p>
    //               <p class="red_text_template award_title"><i>${
    //                 e.award
    //               }</i></p>
    //                 <p class=<"award_date" style="color: grey;"><i>${reformDateByMonth(
    //                   e.start_date
    //                 )}</i></p>
    //             </div>
    //         </div>
    //     </div>
    //               `;
    //   }
    // });
    // awardLeftRight.innerHTML = text;
  }

  const element = document.getElementById("content");
  const preview = document.getElementById("preview");
  if (element && preview) {
    element.style.height = `${
      Math.ceil(element.getBoundingClientRect().height / 1054.4889) * 1054.4889
    }px`;
    const hr = document.createElement("div");
    hr.style.position = "absolute";
    hr.style.transform = "translateY(-50%)";
    hr.style.top = "50%";
    hr.style.backgroundColor = "#faf4f4";
    hr.style.padding = "5px 0";
    hr.style.width = "100%";
    hr.style.textAlign = "center";
    hr.style.minWidth = "816.3px";
    hr.style.fontSize = "14px";
    hr.innerText =
      "Page " + Math.ceil(element.getBoundingClientRect().height / 1054.4889);
    preview.append(hr);
  }
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

const tab1Edit = ref(false);
const tab2Edit = ref(false);
const tab3Edit = ref(false);
const tab4Edit = ref(false);
const closeModal = ref(false);
</script>

<template :ref="pdfSection">
  <!-- <Button @click="submitCV">Save</Button> -->
  <section
    class="container grid min-h-screen grid-cols-4 gap-8 p-10 translate-x-1 max-sm:flex max-xl:flex-col"
  >
    <div class="col-span-1">
      <BuilderPreviewTools :templateId="route.params.id" :isEditedPage="true" />
      <Button
        @click="
          () => {
            closeModal = true;
          }
        "
        class="w-full my-4 text-pink-900 bg-inherit hover:text-white"
        >edit cv</Button
      >
    </div>
    <section id="preview" class="relative col-span-3 overflow-auto printme">
      <div v-if="data" class="min-h-screen">
        <TemplateToPdf v-html="data"></TemplateToPdf>
      </div>
      <div v-else-if="error" class="font-semibold text-center">
        <h3>Not find Template</h3>
        <h4>
          Check Your Network And
          <Button variant="ghost" class="text-primary" @click="reloadPage"
            >Reload</Button
          >
          a Page
        </h4>
      </div>
      <div v-else>
        <div class="w-full min-h-screen transition-all card is-loading">
          <div class="content"></div>
        </div>
      </div>
    </section>
  </section>
  <section
    v-if="closeModal"
    class="fixed top-0 left-0 w-full h-full pt-20 bg-black/30"
  >
    <div class="z-50 max-w-lg p-6 m-auto bg-white">
      <div>
        <div>
          <ul class="flex flex-wrap gap-2">
            <li>
              <Button
                @click="
                  () => {
                    tab2Edit = false;
                    tab3Edit = false;
                    tab1Edit = true;
                    tab4Edit = false;
                  }
                "
                size="sm"
                class="text-xs"
                >Profile Info</Button
              >
            </li>
            <li>
              <Button
                @click="
                  () => {
                    tab2Edit = true;
                    tab3Edit = false;
                    tab1Edit = false;
                    tab4Edit = false;
                  }
                "
                class="text-xs"
                size="sm"
                >Education and Experience</Button
              >
            </li>
            <li>
              <Button
                @click="
                  () => {
                    tab2Edit = false;
                    tab3Edit = true;
                    tab1Edit = false;
                    tab4Edit = false;
                  }
                "
                class="text-xs"
                size="sm"
                >Language and Certifications</Button
              >
            </li>
            <li>
              <Button
                @click="
                  () => {
                    tab2Edit = false;
                    tab3Edit = false;
                    tab1Edit = false;
                    tab4Edit = true;
                  }
                "
                class="text-xs"
                size="sm"
                >References</Button
              >
            </li>
          </ul>
        </div>
        <div v-if="tab1Edit">
          <BuilderStep1Edit
            :profileInfo="{
              name: 'see',
              title: data?.data?.title,
              years_of_experience: data?.data?.yearsOfExperience,
            }"
          ></BuilderStep1Edit>
        </div>
        <div v-if="tab2Edit">
          <BuilderStep2Edit
            :step2="{ experience: [], skillsPersonal: [], skillsPro: [], education: [{grade: 'Pop', period: 'dd', title: '20'}] }"
          ></BuilderStep2Edit>
        </div>
        <div v-if="tab3Edit">
          <BuilderStep3Edit></BuilderStep3Edit>
        </div>
        <div v-if="tab4Edit">
          <BuilderStep4Edit></BuilderStep4Edit>
        </div>
      </div>
      <div class="mt-2 text-center">
        <Button
          class="text-xs"
          size="sm"
          @click="closeModal = false"
          variant="ghost"
          >Close</Button
        >
      </div>
    </div>
  </section>
</template>
