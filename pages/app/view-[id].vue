<script setup lang="ts">
import { SelectItem } from "radix-vue";

import { useForm } from "vee-validate";
// import type TemplateToPdf from "~/components/builder/preview/Template-to-pdf.vue";

definePageMeta({
  layout: "template-preview",
  middleware: "auth",
});
const { user, session } = useAuth();
const route = useRoute();

const { data, error } = await useFetch<any>(
  "/api/templates/cvById?id=" +
    route.params.id +
    "&userId=" +
    session.value?.uid
);

// const { data, error } = await useFetch<any>(
//   "/api/templates/cvById"
// );

const isRaedy = ref(false);

const pdfSection = ref<HTMLElement | null>(null);

onMounted(() => {
  const cvPro: any = {};
  const cv = data.value.cv;
  console.log(cv);
  if (cv) {
    const upload_file = document.getElementById("user_img");

    if (cv.picture) {
      if (upload_file) {
        (upload_file as HTMLImageElement).src = cv.picture;
      } else {
        const image_profil = document.getElementById("image_profil");
        if (image_profil) {
          image_profil.style.backgroundImage = "url(" + cv.picture + ")";
        }
      }
    } else {
      if (upload_file) {
        upload_file.style.display = "none";
      }
      const image_profil = document.getElementById("image_profil");
      if (image_profil) {
        image_profil.style.display = "none";
      }
    }

    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");

    if (firstname && lastname) {
      if (cv.fullName) {
        var text = cv.fullName;
        firstname.innerText = text;
        lastname.style.display = "none";
      } else {
        firstname.style.display = "none";
      }
    }

    const title = document.getElementById("title");
    if (title) {
      if (!cv.title) {
        title.style.display = "none";
      } else {
        title.innerText = cv.title;
      }
    }

    const address = document.getElementById("address");
    if (address) {
      if (!cv.address) {
        address.style.display = "none";
      } else {
        address.innerText = cv.address;
      }
    }

    const phone = document.getElementById("phone");
    if (phone) {
      if (!cv.phone) {
        phone.style.display = "none";
      } else {
        phone.innerText = cv.phone;
      }
    }

    const email = document.getElementById("email");
    if (email) {
      if (!cv.email) {
        email.style.display = "none";
      } else {
        email.innerText = cv.email;
      }
    }

    const personal_skills = document.getElementById("personal_skills");
    const personalCadre = document.getElementById("personal_skills_cadre");

    if (cv.personalSkills) {
      if (cv.personalSkills != "null") {
        var personalSkills: string[] = JSON.parse(cvPro.personalSkills);
        if (personal_skills && personalSkills) {
          var textPersonal = "";
          if (personalSkills.length > 0) {
            personalSkills.forEach((e) => {
              textPersonal += ` <li class="point2_template">${e}</li>`;
            });
            personal_skills.innerHTML = textPersonal;
          } else {
            if (personalCadre) {
              personalCadre.style.display = "none";
            }
            personal_skills.style.display = "none";
          }
        } else {
          if (personalCadre) {
            personalCadre.style.display = "none";
          }
        }
      } else {
        if (personalCadre) {
          personalCadre.style.display = "none";
        }
      }
    } else {
      if (personalCadre) {
        personalCadre.style.display = "none";
      }
    }

    const professional_skills = document.getElementById("professional_skills");
    const professionalCadre = document.getElementById(
      "professional_skills_cadre"
    );

    var professionalSkills: string[] = JSON.parse(cv.professionalSkills);
    if (cv.professionalSkills && professionalSkills) {
      if (cv.professionalSkills != "null") {
        if (professional_skills) {
          var textprofessionalSkills = "";
          if (professionalSkills.length > 0) {
            professionalSkills.forEach((e) => {
              text += ` <li class="point2_template">${e}</li>`;
            });
            professional_skills.innerHTML = textprofessionalSkills;
          } else {
            if (professionalCadre) {
              professionalCadre.style.display = "none";
            }
            professional_skills.style.display = "none";
          }
        } else {
          if (professionalCadre) {
            professionalCadre.style.display = "none";
          }
        }
      } else {
        if (professionalCadre) {
          professionalCadre.style.display = "none";
        }
      }
    } else {
      if (professionalCadre) {
        professionalCadre.style.display = "none";
      }
    }
    if (!professional_skills && !personal_skills) {
      const skillsGeneral = document.getElementById("skills_general_title");
      if (skillsGeneral) {
        skillsGeneral.style.display = "none"
      }
    }

    const language = document.getElementById("language");
    const languageCadre = document.getElementById("language_cadre");

    if (cv.languageInformation) {
      if (cv.languageInformation != "null") {
        var languages: any[] = JSON.parse(cv.languageInformation);
        if (language) {
          var textlanguage = "";
          if (languages.length > 0) {
            languages.forEach((e) => {
              text += ` <li>
                       <span class="text">${e.language}</span><br>
                       <i style="text-decoration: none; font-style: italic; font-size: small;">${e.abilityLevel}</i>
                   </li>`;
            });
            language.innerHTML = textlanguage;
          } else {
            if (languageCadre) {
              languageCadre.style.display = "none";
            }
            language.style.display = "none";
          }
        } else {
          if (languageCadre) {
            languageCadre.style.display = "none";
          }
        }
      } else {
        if (languageCadre) {
          languageCadre.style.display = "none";
        }
      }
    } else {
      if (languageCadre) {
        languageCadre.style.display = "none";
      }
    }

    const hobbies = document.getElementById("hobbies");
    const hobbiesCadre = document.getElementById("hobbies_cadre");
    if (cv.hobbies) {
      if (cv.hobbies != "null") {
        var hobbiesData: string[] = JSON.parse(cvPro.language);
        if (hobbies) {
          var texthobbies = "";
          if (hobbiesData.length > 0) {
            hobbiesData.forEach((e) => {
              text += `<li class="point2_template">${e}</li>`;
            });
            hobbies.innerHTML = texthobbies;
          } else {
            if (hobbiesCadre) {
              hobbiesCadre.style.display = "none";
            }
            hobbies.style.display = "none";
          }
        } else {
          if (hobbiesCadre) {
            hobbiesCadre.style.display = "none";
          }
        }
      } else {
        if (hobbiesCadre) {
          hobbiesCadre.style.display = "none";
        }
      }
    } else {
      if (hobbiesCadre) {
        hobbiesCadre.style.display = "none";
      }
    }

    const achievements = document.getElementById("achievements");
    const projectCadre = document.getElementById("project_cadre");

    if (cv.projects) {
      if (cv.projects != "null") {
        var projects: any[] = JSON.parse(cv.projects);
        if (achievements) {
          var textachievements = "";
          if (projects.length > 0) {
            projects.forEach((e) => {
              text += `<li class="point2_template">${e.projectTitle}</li>`;
            });
            achievements.innerHTML = textachievements;
          } else {
            if (projectCadre) {
              projectCadre.style.display = "none";
            }
            achievements.style.display = "none";
          }
        } else {
          if (projectCadre) {
            projectCadre.style.display = "none";
          }
        }
      } else {
        if (projectCadre) {
          projectCadre.style.display = "none";
        }
      }
    } else {
      if (projectCadre) {
        projectCadre.style.display = "none";
      }
    }

    const references = document.getElementById("references");
    const referencesLeftRight = document.getElementById(
      "references_left_right"
    );
    const referencesCadre = document.getElementById("references_cadre");
    if (cv.referenceInformation) {
      if (cv.referenceInformation != "null") {
        var referenceInfos: any[] = JSON.parse(cv.referenceInformation);
        if (references) {
          var textReference: string = "";
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
            if (referencesCadre) {
              referencesCadre.style.display = "none";
            }
            references.style.display = "none";
          }
        } else {
          if (referencesCadre) {
            referencesCadre.style.display = "none";
          }
        }
        if (referencesLeftRight) {
          var textReferencesLeftRight = "";
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
            if (referencesCadre) {
              referencesCadre.style.display = "none";
            }
            referencesLeftRight.style.display = "none";
          }
        } else {
          if (referencesCadre) {
            referencesCadre.style.display = "none";
          }
        }
      } else {
        if (referencesCadre) {
          referencesCadre.style.display = "none";
        }
      }
    } else {
      if (referencesCadre) {
        referencesCadre.style.display = "none";
      }
    }

    // A modifier
    const social = document.getElementById("social");
    const socialCadre = document.getElementById("social_cadre");
    if (cv.social) {
      if (social) {
        if (socialCadre) {
          socialCadre.style.display = "none";
        }
        social.style.display = "none";
      }
    } else {
      if (socialCadre) {
        socialCadre.style.display = "none";
      }
    }

    const resume = document.getElementById("resume");
    const resumeCadre = document.getElementById("profesional_cadre");
    if (cv.goal) {
      if (resume) {
        resume.innerHTML = cv.goal;
      } else {
        if (resumeCadre) {
          resumeCadre.style.display = "none";
        }
      }
    } else {
      if (resumeCadre) {
        resumeCadre.style.display = "none";
      }
    }
    const work_experience = document.getElementById("work_experience");
    const experienceCadre = document.getElementById("work_experience_cadre");

    if (cv.ProfessionalExperienceInformation) {
      alert(cv.ProfessionalExperienceInformation  + "1")

      if (cv.ProfessionalExperienceInformation != "null") {
        var ProfessionalExperienceInformation: any[] = JSON.parse(
          cv.ProfessionalExperienceInformation
        );
        if (work_experience) {
          text = "";
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
          if (experienceCadre) {
            experienceCadre.style.display = "none";
          }
        }
      } else {
        if (experienceCadre) {
          experienceCadre.style.display = "none";
        }
        alert(cv.ProfessionalExperienceInformation)
      }
    } else {
      if (experienceCadre) {
        experienceCadre.style.display = "none";
      }
      alert(cv.ProfessionalExperienceInformation)

    }

    const education = document.getElementById("education");
    const educationCadre = document.getElementById("education_cadre");
    if (cv.education) {
      if (cv.education != null) {
        var educations: any[] = JSON.parse(cv.education);
        if (education) {
          text = "";
          if (educations.length > 0) {
            educations.forEach((e) => {
              text += `
                  <p><b>${e.institution}</b></p>
                   <p class="red_text"><i>${e.grade}</i></p>
                   <p style="color: grey;"><i>${e.year_of_graduation}</i></p><br>
                   `;
            });
            education.innerHTML = text;
          } else {
            if (educationCadre) {
              educationCadre.style.display = "none";
            }
          }
        } else {
          if (educationCadre) {
            educationCadre.style.display = "none";
          }
        }
      } else {
        if (educationCadre) {
          educationCadre.style.display = "none";
        }
      }
    } else {
      if (educationCadre) {
        educationCadre.style.display = "none";
      }
    }
    const certifications = document.getElementById("certifications");
    const certificationsCadre = document.getElementById("certifications_cadre");
    if (cv.certificationInformation) {
      if (cv.certificationInformation != "null") {
        var certificationsInfo: any[] = JSON.parse(cv.certificationInformation);
        if (certifications) {
          text = "";
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
            if (certificationsCadre) {
              certificationsCadre.style.display = "none";
            }
          }
        } else {
          if (certificationsCadre) {
            certificationsCadre.style.display = "none";
          }
        }
      } else {
        if (certificationsCadre) {
          certificationsCadre.style.display = "none";
        }
      }
    } else {
      if (certificationsCadre) {
        certificationsCadre.style.display = "none";
      }
    }

    const award = document.getElementById("award");
    const awardCadre = document.getElementById("award_cadre");

    const awardLeftRight = document.getElementById("award_left_right");
    if (award && awardCadre) {
      award.style.display = "none";
      awardCadre.style.display = "none";
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
      awardLeftRight.style.display = "none";
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
        Math.ceil(element.getBoundingClientRect().height / 1054.4889) *
        1054.4889
      }px`;
      if( Math.ceil(element.getBoundingClientRect().height / 1054.4889) > 1){
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
    
    }
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
        <TemplateToPdf v-html="data.html"></TemplateToPdf>
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
            :step2="{
              experience: [],
              skillsPersonal: [],
              skillsPro: [],
              education: [{ grade: 'Pop', period: 'dd', title: '20' }],
            }"
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
