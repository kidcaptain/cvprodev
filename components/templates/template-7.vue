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
<style scoped>
  .tiles{
    background-color: #016459
  }
</style>
<template>
  <div
    id="content"
    class="grid w-full container_template min-h-screen bg-white m-auto relative grid-cols-10 max-w-7xl"
  >
    <section
      style="background-color: #009381"
      class="h-full col-span-3 text-white"
    >
      <div class="h-full">
        <div class="p-4 py-10 pb-10">
          <h1 class="text-3xl font-bold" contenteditable="">{{ nom }} {{ prenom }}</h1>
          <h2 class="uppercase" contenteditable="">{{ title }}</h2>
        </div>
        <ul class="flex flex-col w-full gap-6">
          <li v-if="phone || email || website || address">
            <h2 class="w-full tiles p-2 px-4 mb-2 text-xl font-semibold color-steal">
              Contact
            </h2>
            <ul class="pl-4">
              <li class="gap-2 py-2" v-if="phone">
                <h3 class="font-semibold">Phone</h3>
                <span class="text-white/80" contenteditable="">{{ phone }}</span>
              </li>
              <li class="gap-2 py-2" v-if="email">
                <h3 class="font-semibold">Email</h3>
                <span class="text-white/80" contenteditable="">{{ email }}</span>
              </li>
              <li class="gap-2 py-2" v-if="website">
                <h3 class="font-semibold">Web site</h3>
                <span class="text-white/80" contenteditable="">{{ website }}</span>
              </li>
              <li class="gap-2 py-2" v-if="address">
                <h3 class="font-semibold">Address</h3>
                <span class="text-white/80" contenteditable="">{{ address }}</span>
              </li>
            </ul>
          </li>
          <li v-if="personalSkills && personalSkills.length > 0">
            <h2 class="w-full tiles p-2 px-4 mb-2 text-xl font-semibold color-steal">
              Personal Skills
            </h2>
            <ul class="flex flex-col gap-2 px-4">
              <li v-for="personalSkill in personalSkills" contenteditable="">
                <span>  {{ personalSkill.title }}</span>
                <div class="w-full h-2 my-1 color-steal">
                  <div class="w-full h-2 my-1 bg-white"></div>
                </div>
                <div class="text-right">
                  <span class="text-xs"> Excellent </span>
                </div>
              </li>
            </ul>
          </li>
          <li v-if="professionalSkills && professionalSkills.length > 0">
            <h2 class="w-full tiles p-2 px-4 mb-2 text-xl font-semibold color-steal">
              Professional Skills
            </h2>
            <ul class="flex flex-col gap-2 px-4">
              <li v-for="professionalSkill in professionalSkills" contenteditable="">
                <span>  {{ professionalSkill.title }}</span>
                <div class="w-full h-2 my-1 color-steal">
                  <div class="w-full h-2 my-1 bg-white"></div>
                </div>
                <div class="text-right">
                  <span class="text-xs"> Excellent </span>
                </div>
              </li>
            </ul>
          </li>
          <li v-if="languages && languages.length > 0">
            <h2 class="w-full tiles p-2 px-4 mb-2 text-xl font-semibold color-steal">
              Language
            </h2>
            <ul class="flex flex-col gap-2 px-4">
              <li v-for="language in languages">
                <span contenteditable=""> {{ language.title }} </span>
                <div class="w-full h-2 my-1 color-steal" >
                  <div
                    v-if="language.level == 'Elementary level'"
                    class="w-1/3 h-2 my-1 bg-white"
                  ></div>
                  <div
                    v-else-if="language.level == 'Independent level'"
                    class="w-2/3 h-2 my-1 bg-white"
                  ></div>
                  <div
                    v-if="language.level == 'Experienced level'"
                    class="w-full h-2 my-1 bg-white"
                  ></div>
                </div>
                <div class="text-right">
                  <span class="text-xs" contenteditable=""> {{ language.level }}</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <div></div>
      </div>
    </section>
    <section class="relative h-full col-span-7 p-4 pr-8 overflow-hidden">
      <div>
        <div class="py-10 pb-16">
          <p contenteditable="">
            {{ resume }}
          </p>
        </div>
        <ul class="flex flex-col gap-8">
          <li v-if="workExperiences && workExperiences.length > 0">
            <div>
              <h2 style="color: #009381"
                class="w-full py-2 mb-2 text-xl font-bold text-color-steal border-y-2 border-y-stone-200"
              >
                Experience
              </h2>
              <ul class="relative flex flex-col gap-5 mt-4">
                <li v-for="workExperience in workExperiences">
                  <div
                    :class="`flex relative flex-row w-full before:w-24 before:content-['${workExperience.startDate}&nbsp;&nbsp;-'] before:mr-8`"
                  >
                  <span class="absolute left-0 w-20" contenteditable="">
                    {{ workExperience.startDate }} - {{ workExperience.endDate }}
                  </span>
                    <div class="w-full">
                      <span class="font-bold" contenteditable="">{{ workExperience.jobTitle }}</span> <br />
                    </div>
                  </div>
                  <div
                    :class="`flex flex-row w-full before:w-24 before:content-['${workExperience.endDate}'] before:mr-8`"
                  >
                    <div class="w-full">
                      <div class="flex flex-col">
                        <span contenteditable="">{{ workExperience.company }}</span>
                      </div>
                      <h2 contenteditable="" class="my-1 font-bold">{{ workExperience.jobTitle }}</h2>
                      <h2 class="my-1 font-bold">Key Achievements</h2>
                      <div class="pl-5" contenteditable="" v-html="workExperience.professionalTasksPerformed">

                      </div>
                    
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li v-if="educations && educations.length > 0">
            <div>
              <h2 style="color: #009381"
                class="w-full py-2 mb-2 text-xl font-semibold text-color-steal border-y-2 border-y-stone-200"
              >
                Education
              </h2>
              <ul class="flex flex-col gap-5 mt-4">
                <li v-for="education in educations">
                  <div
                    :class="`flex relative flex-row w-full before:w-24 before:content-['${ education.end_date }&nbsp;&nbsp;-'] before:mr-8`"
                  >
                  <span class="absolute left-0 w-20 font-semibold" contenteditable="">
                    {{ education.start_date }} - {{ education.end_date }}
                  </span>
                    
                    <div class="w-full">
                      <span class="text-xl font-bold" contenteditable=""
                        >{{ education.title }} | {{ education.city }}</span
                      >
                      <br />
                    </div>
                  </div>
                  <div
                    :class="`flex flex-row w-full before:w-24 before:content-['${ education.end_date }'] before:mr-8`"
                  >
                    <div class="w-full">
                      <div class="flex flex-col">
                        <span class=" text-stone-800 font-semibold">Field</span>
                      </div>
                      <h2 class="my-1" contenteditable="">{{ education.grade }}</h2>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
