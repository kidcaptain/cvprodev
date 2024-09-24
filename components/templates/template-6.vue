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
    id="content"
    class="grid w-full min-h-screen grid-cols-10 bg-white max-w-7xl"
  >
    <section
      style="background-color: #001d37"
      class="h-full col-span-4 px-8 text-white"
    >
      <div class="h-full">
        <div class="p-4 py-10">
          <div
            class="m-auto rounded-full size-32 bg-stone-50"
            id="image_profil"
          ></div>
        </div>
        <ul class="flex flex-col w-full gap-6 pl-8">
          <li>
            <h2
              class="w-full mb-2 text-xl font-semibold border-b-4 border-b-white/70"
            >
              Contact
            </h2>
            <ul class="px-1">
              <li class="gap-2 py-2">
                <h4 class="font-semibold">Phone</h4>
                <span class="text-white/80" contenteditable="">{{
                  phone
                }}</span>
              </li>
              <li class="gap-2 py-2">
                <h4 class="font-semibold">Email</h4>
                <span class="text-white/80" contenteditable="">{{
                  email
                }}</span>
              </li>
              <li class="gap-2 py-2">
                <h4 class="font-semibold">Address</h4>
                <span class="text-white/80" contenteditable="">{{
                  address
                }}</span>
              </li>
            </ul>
          </li>
          <li v-if="educations && educations.length > 0">
            <h2
              class="w-full mb-2 text-xl font-semibold border-b-4 border-b-white/70"
            >
              Education
            </h2>
            <ul class="flex flex-col gap-2 px-1">
              <li v-for="education in educations">
                <span class="italic text-white/80" contenteditable=""
                  >{{ education.start_date }} - {{ education.end_date }}</span
                >
                <h3 class="font-semibold" contenteditable="">
                  {{ education.grade }}
                </h3>
                <h3 class="italic text-white/80" contenteditable="">
                  {{ education.title }}
                </h3>
              </li>
            </ul>
          </li>
          <li v-if="professionalSkill && professionalSkill.length > 0">
            <h2
              class="w-full mb-2 text-xl font-semibold border-b-4 border-b-white/70"
            >
              Expertize
            </h2>
            <ul
              class="flex flex-col gap-1 px-6 text-white/80"
              style="list-style: disc"
            >
              <li
                contenteditable=""
                v-for="professionalSkill in professionalSkills"
              >
                {{ professionalSkill.title }}
              </li>
            </ul>
          </li>
          <li v-if="languages && languages.length > 0">
            <h2
              class="w-full mb-2 text-xl font-semibold border-b-4 border-b-white/70"
            >
              Language
            </h2>
            <ul class="flex flex-col gap-1 text-white/80">
              <li contenteditable="" v-for="language in languages">
                {{ language.title }}
              </li>
            </ul>
          </li>
        </ul>
        <div></div>
      </div>
    </section>
    <section class="relative px-8 h-full col-span-6 p-4 overflow-hidden">
      <div>
        <div class="py-10">
          <div class="mb-2">
            <h1 class="text-4xl font-thin">
              <span class="font-bold" contenteditable="">{{ nom }}</span>
              <span>{{ prenom }}</span>
            </h1>
            <h2 class="uppercase" contenteditable="">{{ title }}</h2>
          </div>
          <p contenteditable="">
            {{ resume }}
          </p>
        </div>
        <ul class="flex flex-col gap-8">
          <li v-if="workExperiences && workExperiences.length > 0">
            <div>
              <h2
                class="w-full mb-2 text-xl font-semibold border-b-4 border-b-stone-400"
              >
                Experience
              </h2>
              <ul
                class="mt-4 before:content-[''] before:left-2 before:-translate-x-0 before:h-full before:absolute before:w-1 before:bg-stone-400 pl-8 relative flex flex-col gap-5"
              >
                <li v-for="workExperience in workExperiences">
                  <div class="flex flex-col w-full">
                    <span
                      contenteditable=""
                      class="before:content-[''] before:left-0 before:bg-white before:rounded-full before:size-5  before:border-stone-400 before:border before:absolute"
                      >{{ workExperience.startDate }} -
                      {{ workExperience.endDate }}</span
                    >
                    <span contenteditable="">
                      {{ workExperience.company }}
                    </span>
                  </div>
                  <h2 contenteditable="" class="my-1 font-semibold">
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
              <h2
                class="uppercase relative font-bold text-xl after:top-1/2 after:-translate-y-1/2 after:ml-5 after:absolute after:w-full after:h-1 after:content-[''] after:bg-black"
              >
                Reference
              </h2>
              <ul class="grid grid-cols-2 gap-5 mt-4">
                <li v-for="reference in references">
                  <h2 class="mt-3 font-semibold" contenteditable="">
                    {{ reference.references_name }}
                  </h2>
                  <ul>
                    <li contenteditable="">{{ reference.position }}</li>
                    <li>
                      Phone
                      <span contenteditable="">{{
                        reference.references_phone
                      }}</span>
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
