<script>
export default {
  props: {
    nom: String,
    prenom: String,
    title: String,
    address: String,
    phone: String,
    email: String,
    linkedIn: String,
    maritalStatus: String,
    website: String,
    resume: String,
    image: String,
    experience: String,
    educations: Array,
    personalSkills: Array,
    professionalSkills: Array,
    languages: Array,
    hobbies: Array,
    workExperiences: Array,
    references: Array,
  },
};

const reformDate = (str) => {
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

const reformDateByMonth = (str) => {
  var date = new Date(str);
  var dateNow = new Date();
  if (date.getFullYear() == dateNow.getFullYear()) {
    return "present";
  }
  return date.getFullYear();
};

// const props = defineProps<[]
//    data: {

//    }
// }>(),
// console.log(props.data.address)
</script>
<style scoped></style>
<template>
  <div
    class="grid container_template  m-auto relative w-full min-h-screen grid-cols-10  bg-white max-w-7xl"
    id="content"
  >
    <section class="h-full col-span-4 px-8 p-4 bg-stone-200">
      <div class="h-full">
        <div class="py-10">
          <div
            id="image_profil"  v-if="image != null" :style="
           ` background-image: url('${image}');`"
            class="m-auto rounded-full size-32 bg-stone-800"
          ></div>
        </div>
        <ul class="flex flex-col w-full gap-4 px-4">
          <li>
            <h2
              class="w-full p-2 mb-2 font-bold text-center text-white uppercase rounded-full bg-stone-900"
            >
              Contact
            </h2>
            <ul class="px-1">
              <li class="flex items-center gap-2 py-2 text-center">
                <svg
                  fill="#111111"
                  width="32px"
                  height="32px"
                  viewBox="0 0 200 200"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title></title>
                    <path
                      d="M150,34.94c-27.5-27.5-72-27.5-100,0a70.49,70.49,0,0,0-8,90l33.5,48a30.4,30.4,0,0,0,49.5,0l33.5-48A71.18,71.18,0,0,0,150,34.94Zm-8.5,78.5-33.5,48a10.31,10.31,0,0,1-16.5,0l-33.5-48a50.14,50.14,0,0,1,6-64.5c20-20,52-20,71.5,0a50.19,50.19,0,0,1,6,64.5Zm-41.5-67a35,35,0,1,0,35,35A34.78,34.78,0,0,0,100,46.44Zm0,50a15,15,0,1,1,15-15A14.73,14.73,0,0,1,100,96.44Z"
                    ></path>
                  </g>
                </svg>
                <span contenteditable="">{{ address }}</span>
              </li>
              <li class="flex items-center gap-2 py-2">
                <svg
                  fill="#111111"
                  width="32px"
                  height="32px"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>phone</title>
                    <path
                      d="M21.999 4h-12c-1.104 0-1.999 0.896-1.999 2v20c0 1.104 0.895 2 1.999 2h12c1.105 0 2.001-0.896 2.001-2v-20c0-1.104-0.896-2-2.001-2zM13 5h5l0.062 1h-5.062v-1zM15.979 26.5c-0.552 0-1-0.447-1-1s0.448-1 1-1c0.553 0 1 0.447 1 1s-0.448 1-1 1zM21.999 23h-12l0.021-16h11.979v16z"
                    ></path>
                  </g>
                </svg>
                <span contenteditable="">{{ phone }}</span>
              </li>
              <li class="flex items-center gap-2 py-2">
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                      stroke="#111111"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="#111111"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></rect>
                  </g>
                </svg>
                <span contenteditable="">{{ email }}</span>
              </li>
              <li class="flex items-center gap-2 py-2">
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.83824 18.4467C10.0103 18.7692 10.1826 19.0598 10.3473 19.3173C8.59745 18.9238 7.07906 17.9187 6.02838 16.5383C6.72181 16.1478 7.60995 15.743 8.67766 15.4468C8.98112 16.637 9.40924 17.6423 9.83824 18.4467ZM11.1618 17.7408C10.7891 17.0421 10.4156 16.1695 10.1465 15.1356C10.7258 15.0496 11.3442 15 12.0001 15C12.6559 15 13.2743 15.0496 13.8535 15.1355C13.5844 16.1695 13.2109 17.0421 12.8382 17.7408C12.5394 18.3011 12.2417 18.7484 12 19.0757C11.7583 18.7484 11.4606 18.3011 11.1618 17.7408ZM9.75 12C9.75 12.5841 9.7893 13.1385 9.8586 13.6619C10.5269 13.5594 11.2414 13.5 12.0001 13.5C12.7587 13.5 13.4732 13.5593 14.1414 13.6619C14.2107 13.1384 14.25 12.5841 14.25 12C14.25 11.4159 14.2107 10.8616 14.1414 10.3381C13.4732 10.4406 12.7587 10.5 12.0001 10.5C11.2414 10.5 10.5269 10.4406 9.8586 10.3381C9.7893 10.8615 9.75 11.4159 9.75 12ZM8.38688 10.0288C8.29977 10.6478 8.25 11.3054 8.25 12C8.25 12.6946 8.29977 13.3522 8.38688 13.9712C7.11338 14.3131 6.05882 14.7952 5.24324 15.2591C4.76698 14.2736 4.5 13.168 4.5 12C4.5 10.832 4.76698 9.72644 5.24323 8.74088C6.05872 9.20472 7.1133 9.68686 8.38688 10.0288ZM10.1465 8.86445C10.7258 8.95042 11.3442 9 12.0001 9C12.6559 9 13.2743 8.95043 13.8535 8.86447C13.5844 7.83055 13.2109 6.95793 12.8382 6.2592C12.5394 5.69894 12.2417 5.25156 12 4.92432C11.7583 5.25156 11.4606 5.69894 11.1618 6.25918C10.7891 6.95791 10.4156 7.83053 10.1465 8.86445ZM15.6131 10.0289C15.7002 10.6479 15.75 11.3055 15.75 12C15.75 12.6946 15.7002 13.3521 15.6131 13.9711C16.8866 14.3131 17.9412 14.7952 18.7568 15.2591C19.233 14.2735 19.5 13.1679 19.5 12C19.5 10.8321 19.233 9.72647 18.7568 8.74093C17.9413 9.20477 16.8867 9.6869 15.6131 10.0289ZM17.9716 7.46178C17.2781 7.85231 16.39 8.25705 15.3224 8.55328C15.0189 7.36304 14.5908 6.35769 14.1618 5.55332C13.9897 5.23077 13.8174 4.94025 13.6527 4.6827C15.4026 5.07623 16.921 6.08136 17.9716 7.46178ZM8.67765 8.55325C7.61001 8.25701 6.7219 7.85227 6.02839 7.46173C7.07906 6.08134 8.59745 5.07623 10.3472 4.6827C10.1826 4.94025 10.0103 5.23076 9.83823 5.5533C9.40924 6.35767 8.98112 7.36301 8.67765 8.55325ZM15.3224 15.4467C15.0189 16.637 14.5908 17.6423 14.1618 18.4467C13.9897 18.7692 13.8174 19.0598 13.6527 19.3173C15.4026 18.9238 16.921 17.9186 17.9717 16.5382C17.2782 16.1477 16.3901 15.743 15.3224 15.4467ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                      fill="#111111"
                    ></path>
                  </g>
                </svg>
                <a
                  href="julia-dev.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  contenteditable=""
                  >{{ website }}</a
                >
              </li>
            </ul>
          </li>
          <li v-if="educations && educations.length > 0">
            <h2
              class="w-full p-2 mb-3 font-bold text-center text-white uppercase rounded-full bg-stone-900"
            >
              Education
            </h2>
            <ul class="flex flex-col gap-2 px-1">
              <li v-for="education in educations">
                <h3 class="font-semibold" contenteditable="">
                  {{ education.grade }}
                </h3>
                <h3 class="italic" contenteditable="">{{ education.title }}</h3>
                <span class="italic" contenteditable=""
                  >{{ education.start_date }} - {{ education.end_date }}</span
                >
              </li>
            </ul>
          </li>
          <li v-if="languages && languages.length > 0">
            <h2
              class="w-full p-2 mb-3 font-semibold text-center text-white uppercase rounded-full bg-stone-900"
            >
              Languages
            </h2>
            <ul class="flex flex-col gap-1 px-6" style="list-style: disc">
              <li contenteditable="" v-for="language in languages">
                {{ language.title }} <br />
                <span class="text-xs"> {{ language.level }}</span>
              </li>
            </ul>
          </li>
          <li v-if="personalSkill && personalSkill.length > 0">
            <h2
              class="w-full p-2 mb-3 font-semibold text-center text-white uppercase rounded-full bg-stone-900"
            >
              Personal Skills
            </h2>
            <ul class="flex flex-col gap-1 px-6" style="list-style: disc">
              <li contenteditable="" v-for="personalSkill in personalSkills">
                {{ personalSkill.title }}
              </li>
            </ul>
          </li>
          <li v-if="professionalSkill && professionalSkill.length > 0">
            <h2
              class="w-full p-2 mb-3 font-semibold text-center text-white uppercase rounded-full bg-stone-900"
            >
              Professional Skills
            </h2>
            <ul class="flex flex-col gap-1 px-6" style="list-style: disc">
              <li
                contenteditable=""
                v-for="professionalSkill in professionalSkills"
              >
                {{ professionalSkill.title }}
              </li>
            </ul>
          </li>
        </ul>
        <div></div>
      </div>
    </section>
    <section class="relative h-full col-span-6 p-4 px-8 overflow-hidden">
      <div>
        <div class="py-10">
          <h1 class="text-5xl font-thin">
            <span class="text-4xl font-bold" contenteditable="">{{ nom }}</span>
            <br />
            <span contenteditable="">{{ prenom }}</span>
          </h1>
          <h2 class="uppercase" contenteditable="">{{ title }}</h2>
        </div>
        <ul class="flex flex-col gap-8">
          <li v-if="workExperiences && workExperiences.length > 0">
            <div>
              <div class="flex gap-2 items-center">
                <h2 class="uppercase w-96 relative font-bold text-xl">
                  Work experience
                </h2>
                <div class="w-full h-1 bg-black"></div>
              </div>
              <ul class="flex flex-col gap-5 mt-4">
                <li v-for="workExperience in workExperiences">
                  <div class="flex items-center justify-between w-full">
                    <span contenteditable="">
                      {{ workExperience.company }}</span
                    >
                    <span contenteditable=""
                      >{{ workExperience.startDate }} -
                      {{ workExperience.endDate }}
                    </span>
                  </div>
                  <h2 class="mt-1 mb-1 font-semibold" contenteditable="">
                    {{ workExperience.jobTitle }}
                  </h2>
                  <ul>
                    <li
                      contenteditable=""
                      v-for="task in workExperience.professionalTasksPerformed"
                    >
                      {{ task }}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
          <li v-if="references && references.length > 0">
            <div>
              <div class="flex gap-2 items-center">
                <h2 class="uppercase relative font-bold text-xl">Reference</h2>
                <div class="w-full h-1 bg-black"></div>
              </div>
              <ul class="flex flex-col gap-5 mt-4">
                <li v-for="reference in references">
                  <h2 class="mt-1 mb-1 font-semibold" contenteditable="">
                    {{ reference.references_name }}
                  </h2>
                  <ul>
                    <li contenteditable="">{{ reference.position }}</li>
                    <li>
                      Phone
                      <span contenteditable="">
                        {{ reference.references_phone }}</span
                      >
                    </li>
                    <li>
                      Email
                      <span contenteditable="">{{ reference.email }}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
