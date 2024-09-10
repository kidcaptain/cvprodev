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

<template>
  <main id="content" class="container_template">
    <div class="w-full py-4 m-auto bg-white max-w-7xl">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl">
            <span id="firstname">{{ nom }}</span>
            <span id="lastname">{{ prenom }}</span>
          </h1>

          <h2 class="text-2xl" id="title">{{ title }}</h2>
          <ul class="flex gap-4 mt-2">
            <li>{{ address }}</li>
            <li v-if="phone">{{ phone }}</li>
            <li v-if="email">{{ email }}</li>
            <!-- <li v-if="experience">{{ experience }}</li> -->
          </ul>
        </div>
        <div>
          <div
            id="image_profil"
            class="photo_template bg-cover rounded-full size-24 bg-stone-800"
          ></div>
        </div>
      </div>
      <div class="grid grid-cols-10 mt-5">
        <div class="flex flex-col justify-between h-full col-span-6">
          <div class="flex flex-col gap-6">
            <div v-if="resume">
              <h2
                class="mb-3 text-2xl font-semibold uppercase border-b-4 border-b-stone-400"
              >
                Professional Summary
              </h2>
              <p>
                {{ resume }}
              </p>
            </div>
            <div v-if="educations && educations.length > 0">
              <h2
                class="mb-3 text-2xl font-semibold uppercase border-b-4 border-b-stone-400"
              >
                Education
              </h2>
              <ul class="flex flex-col gap-4">
                <li v-for="education in educations">
                  <div class="grid grid-cols-5">
                    <div class="col-span-2">
                      <h3 class="font-semibold">
                        {{ education.title }}
                      </h3>
                      <h3>
                        {{ education.start_date }} - {{ education.end_date }}
                      </h3>
                      <h3>{{ education.city }}</h3>
                    </div>
                    <div
                      class="flex flex-col col-span-3 gap-5 px-4 border-l-4 border-l-stone-400"
                    >
                      <div>
                        <h2 class="text-xl font-bold">
                          {{ education.grade }}
                        </h2>
                        <p>{{ education.grade_obtained }}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div></div>
        <div class="flex flex-col col-span-3 gap-4">
          <div v-if="personalSkills && personalSkills.length > 0">
            <h2
              class="mb-3 text-2xl font-semibold uppercase border-b-4 border-b-stone-400"
            >
              Personal skills
            </h2>
            <div>
              <ul>
                <li v-for="personalSkill in personalSkills">
                  {{ personalSkill.title }}
                </li>
              </ul>
            </div>
          </div>
          <div v-if="professionalSkills && professionalSkills.length > 0">
            <h2
              class="mb-3 text-2xl font-semibold uppercase border-b-4 border-b-stone-400"
            >
              Professional skills
            </h2>
            <ul>
              <li v-for="professionalSkill in professionalSkills">
                {{ professionalSkill.title }}
              </li>
            </ul>
          </div>
          <div v-if="languages && languages.length > 0">
            <h2
              class="mb-3 text-2xl font-semibold uppercase border-b-4 border-b-stone-400"
            >
              Language
            </h2>
            <ul>
              <li
                v-for="language in languages"
                class="flex items-center justify-between"
              >
                <span class="font-semibold">{{ language.title }}</span>
                <span>{{ language.level }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-4" v-if="workExperiences && workExperiences.length > 0">
        <h2
          class="mb-3 text-2xl font-semibold uppercase border-b-4 border-b-stone-400"
        >
          Professional Experience
        </h2>
        <ul class="flex flex-col">
          <li v-for="workExperience in workExperiences">
            <div class="grid grid-cols-5">
              <div class="col-span-2">
                <h3 class="font-semibold">{{ workExperience.company }}</h3>
                <h3>
                  {{ workExperience.startDate }} –
                  {{ workExperience.endDate }}
                </h3>
              </div>
              <div
                class="flex flex-col col-span-3 gap-5 px-4 py-4 border-l-4 border-l-stone-400"
              >
                <div>
                  <h2 class="text-xl font-bold">
                    {{ workExperience.jobTitle }}
                  </h2>
                  <ul>
                    <li
                      v-for="task in workExperience.professionalTasksPerformed"
                    >
                      {{ task }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt-4" v-if="awards && awards.length > 0">
        <h2
          class="mb-3 text-2xl font-semibold uppercase border-b-4 border-b-stone-400"
        >
          Awards and Distinctions
        </h2>
        <ul class="flex flex-col">
          <li v-for="award in awards">
            <div class="grid grid-cols-5">
              <div class="col-span-5">
                <h3 class="font-semibold">
                  {{ award.title }} | {{ award.award }}
                </h3>
                <h3>
                  {{ award.start_date }}
                </h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt-4" v-if="projects && projects.length > 0">
        <h2
          class="mb-3 text-2xl font-semibold uppercase border-b-4 border-b-stone-400"
        >
          Projects
        </h2>
        <ul class="flex flex-col">
          <li v-for="project in projects">
            <div class="grid grid-cols-5">
              <div class="col-span-5">
                <h3 class="font-semibold">{{ project.company }}</h3>
                <h3>
                  {{ project.start_date }} –
                  {{ project.end_date }}
                </h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
