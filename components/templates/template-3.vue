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
    awards: Array,
    certifications: Array,
    projects: Array,
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
  <div class="w-full pt-12 px-12 m-auto bg-white max-w-7xl min-h-screen container_template relative" id="content">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold uppercase flex gap-2" contenteditable="">
          <span id="firstname" >{{ nom }} </span>
          <span id="lastname" >{{ prenom }}</span>
        </h1>
        <h2 class="text-xl uppercase" id="title" contenteditable="">{{ title }}</h2>
      </div>
      <div>
        <div class="rounded-full size-32 bg-stone-700" id="image_profil"  v-if="image != null" :style="
           ` background-image: url('${image}');`"></div>
      </div>
    </div>
    <div class="grid grid-cols-10 mt-5">
      <div class="flex flex-col justify-between h-full col-span-6">
        <div v-if="workExperiences && workExperiences.length > 0">
          <h2
            class="text-xl font-semibold uppercase border-b-2 border-b-stone-400"
          >
            Professional Summary
          </h2>
          <div v-for="workExperience in workExperiences">
            <h3 class="my-2" contenteditable="">
              {{ workExperience.startDate }} - {{ workExperience.endDate }}
            </h3>
            <ul>
              <li contenteditable="">{{ workExperience.jobTitle }}</li>
            </ul>

            <div contenteditable="" v-html="workExperience.professionalTasksPerformed"
              class="mb-2"
            >
           
          </div>

            <h3 class="my-2" contenteditable="">{{ workExperience.company }}</h3>
          </div>
        </div>
        <div v-if="educations && educations.length > 0">
          <h2
            class="text-xl font-semibold uppercase border-b-2 border-b-stone-400"
          >
            Education
          </h2>
          <div v-for="education in educations">
            <h3 class="my-2" contenteditable="">
              {{ education.grade }}
            </h3>
            <h3 class="my-2" contenteditable="">
              {{ education.start_date }} - {{ education.end_date }}
            </h3>
            <ul>
              <li contenteditable="">{{ education.title }}</li>
            </ul>

            <p contenteditable="" v-for="task in education.taskPerformed" class="mb-2">
              {{ task }}
            </p>
            <h3 class="my-2" contenteditable="">{{ education.company }}</h3>
          </div>
        </div>
        <!-- <div>
          <h2 class="text-xl font-bold">Your Name</h2>
        </div> -->
      </div>
      <div></div>
      <div class="col-span-3">
        <div v-if="phone || email || website">
          <h2
            class="mb-3 text-xl font-semibold uppercase border-b-2 border-b-stone-400"
          >
            Contact
          </h2>
          <div>
            <ul>
              <li contenteditable="">{{ phone }}</li>
              <li contenteditable="">{{ email }}</li>
              <li contenteditable="">{{ website }}</li>
            </ul>
          </div>
        </div>
        <div v-if="resume">
          <h2
            class="my-3 text-xl font-semibold uppercase border-b-2 border-b-stone-400"
          >
            About
          </h2>
          <p contenteditable="">
            {{ resume }}
          </p>
        </div>
        <div v-if="professionalSkills && professionalSkills.length">
          <h2
            class="my-3 text-xl font-semibold uppercase border-b-2 border-b-stone-400"
          >
            Professional skills
          </h2>
          <ul class="pl-5" style="list-style: disc">
            <li contenteditable="" v-for="professionalSkill in professionalSkills">
              {{ professionalSkill.title }}
            </li>
          </ul>
        </div>
        <div v-if="references && references.length">
          <h2
            class="my-3 text-xl font-semibold uppercase border-b-2 border-b-stone-400"
          >
            Refences
          </h2>
          <ul>
            <li v-for="reference in references">
              <h3 class="my-2 font-bold" contenteditable="">{{ reference.title }}</h3>
              <ul>
                <li contenteditable="">
                  {{ reference.references_name }} - {{ reference.position }}
                </li>
                <li contenteditable="">{{ reference.references_phone }}</li>
                <li contenteditable="">{{ reference.email }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
