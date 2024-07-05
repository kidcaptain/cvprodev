<script setup lang="ts">
import { SelectItem } from "radix-vue";

import { useForm } from "vee-validate";
// import type TemplateToPdf from "~/components/builder/preview/Template-to-pdf.vue";

definePageMeta({
  layout: "template-preview",
  middleware: "auth", //
});

const route = useRoute();

const { data } = await useFetch<any>(
  "/api/templates/templateById?id=" + route.params.id
);

const isRaedy = ref(false);

const pdfSection = ref<HTMLElement | null>(null);

onMounted(() => {
  const step1 = window.localStorage.getItem("step_1");
  const step2 = window.localStorage.getItem("step_2");
  const step3 = window.localStorage.getItem("step_3");
  const step4 = window.localStorage.getItem("step_4");

  if (step1 && step2 && step3 && step4) {
    const upload_file = document.getElementById("user_img");
    var base64 = window.localStorage.getItem("profileimage");
    if (base64) {
      if (upload_file) {
        (upload_file as HTMLImageElement).src = base64;
      }
    }
    // const storage = sessionStorage;
    // if ('image' in storage) {
    //   (upload_file as HTMLImageElement).src = storage['image'];
    // }
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
      name: string;
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
      etape2[2].data.forEach((e) => {
        text += ` <li class="point2_template">${e.title}</li>`;
      });
      personal_skills.innerHTML = text;
    }

    const language = document.getElementById("language");
    if (language) {
      var text = "";
      etape3[0].data.forEach((e) => {
        text += ` <li>
                        <span class="text">${e.title}</span><br>
                        <i style="text-decoration: none; font-style: italic; font-size: small;">${e.type}</i>
                    </li>`;
      });
      language.innerHTML = text;
    }

    const hobbies = document.getElementById("hobbies");
    if (hobbies) {
      var text = "";
      etape3[1].data.forEach((e) => {
        text += `<li class="point2_template">${e.title}</li>`;
      });
      hobbies.innerHTML = text;
    }

    const achievements = document.getElementById("achievements");
    if (achievements) {
      var text = "";
      etape4[1].data.forEach((e) => {
        text += `<li class="point2_template">${e.title}</li>`;
      });
      achievements.innerHTML = text;
    }

    const references = document.getElementById("references");
    if (references) {
      var text = "";
      etape4[0].data.forEach((e) => {
        text += `<li class="point2_template">${
          e.references_name
        }(<span style="font-size: 12px; opacity: 0.8;">${e.position}</span>) ${
          e.refenreces_phone ?? ""
        } <br> <span style="font-size: 12px; opacity: 0.8;"> ${
          e.email
        } </span></li>`;
      });
      references.innerHTML = text;
    }

    // A modifier
    const social = document.getElementById("social");
    if (social) {
      var text = "";
      etape4[2].data.forEach((e) => {
        text += `
           <li>
            <span class="icon" style="color: white;"><i class="fa fa-facebook"
                                aria-hidden="true"></i></span>
                        <span class="text">${e.title}</span>
                    </li>`;
      });
      social.innerHTML = text;
    }

    const resume = document.getElementById("resume");
    if (resume) {
      resume.innerHTML = etape1.objective;
    }
    const work_experience = document.getElementById("work_experience");
    if (work_experience) {
      text = "";
      etape2[0].data.forEach((e) => {
        text += `
        <div class="content">
                        <div class="right-align">
                            <p><b>${e.title}</b></p>
                            <p class="red_text"><i>${e.company}</i></p>

                        </div>
                        <div class="left-align">
                            <p style="color: grey;"><i>${reformDate(
                              e.start_date
                            )} – ${reformDate(e.start_date)}</i></p>
                            <p>Cameroon</p>
                        </div>
                    </div><br>
                     <P style="padding: 0 50px; opacity: 0.7; font-size: 14px;" >
                        ${e.experience}
                    </P><br>`;
      });
      work_experience.innerHTML = text;
    }

    const education = document.getElementById("education");
    if (education) {
      text = "";
      etape2[1].data.forEach((e) => {
        text += `
        <p><b>${e.title}</b></p>
                    <p class="red_text"><i>${e.grade}</i></p>
                    <p style="color: grey;"><i>${reformDateByMonth(
                      e.start_date
                    )} - ${reformDateByMonth(e.end_date)}</i></p><br>
                    `;
      });
      education.innerHTML = text;
    }

    const certifications = document.getElementById("certifications");
    if (certifications) {
      text = "";
      etape3[2].data.forEach((e) => {
        text += `
        <p>${e.title}</p>
                <p style="color: grey;"><i>${reformDateByMonth(
                  e.end_date
                )}</i></p><br>
                    `;
      });
      certifications.innerHTML = text;
    }

    const award = document.getElementById("award");
    if (award) {
      text = "";

      const company = document.querySelector(".award_company");
      const title = document.querySelector(".award_title");
      const date = document.querySelector(".award_date");
      if (company && title && date) {
        title.innerHTML = etape3[3].data[0].title;
        company.innerHTML = etape3[3].data[0].award;
        date.innerHTML = etape3[3].data[0].start_date;
        award.innerHTML = "";
        award.innerHTML += title.innerHTML;
        award.innerHTML += company.innerHTML;
        award.innerHTML += date.innerHTML;
      }
      console.log(award.innerHTML);
      etape3[3].data.forEach((e, index: number) => {
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

console.log(data.value.html);
</script>

<template :ref="pdfSection">
  <!-- <Button @click="submitCV">Save</Button> -->
  <section
    class="container grid min-h-screen grid-cols-4 gap-8 p-10 translate-x-1 max-sm:flex max-xl:flex-col"
  >
    <div class="col-span-1">
      <BuilderPreviewTools :templateId="route.params.id" />
    </div>
    <section
      id="preview"
      class="relative min-h-screen col-span-3 overflow-auto printme"
    >
      <!-- <embed src="http://localhost:3000/app/cv/builder/step-1?template_id=d6be0bb5-2fed-4e4b-b98c-7d0b10dec356" type="application/html">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="http://yoursite.com/the.pdf">Download PDF</a>.</p>
      </embed> -->

      <TemplateToPdf v-html="data.html"></TemplateToPdf>
      <!-- <iframe :src="`https://docs.google.com/viewer?srcid=${data.html}&pid=133aftVzhTRZM5J-csKamVC82jaECOHXw&efh=false&a=v&chrome=false&embedded=true`" width="580px" height="480px"></iframe> -->
      <!-- <iframe src="http://127.0.0.1:5500/TEMPLATE%201/index.html" class="w-full h-full"frameborder="0"></iframe> -->
    </section>
  </section>
</template>
