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
<style scoped>
h1 span {
  font-family: "Kaushan Script", cursive;
  font-weight: 300;
}

* {
  font-family: "Poppins", sans-serif;
}

.container_template {
  z-index: -1;
  position: relative;
  width: fit-content;
  min-height: 1054.4889px;
  min-width: 816.3px;
  max-width: 1000.3px;
  background: #ffffff;
}

.text-color-steal {
  color: #642a37;
}

.color-steal {
  background-color: #642a37;
}
.point::before {
  background-color: #642a37;
}
</style>
<template>
  <div class=" container_template min-h-screen bg-white m-auto relative" id="content">
    <div
      class="top_Side_template"
      style="
        min-width: 816.3px;
        max-width: 1550.3px;
        margin: auto;
        background-color: #eceeed;
      "
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          padding: 20px 40px;
          align-items: center;
        "
      >
        <div>
          <h1 class="text-3xl font-bold" contenteditable="">
            <span id="firstname">{{ nom }}</span>
            <span id="lastname">{{ prenom }}</span>
          </h1>
          <p contenteditable="" class="font-semibold" id="title" style="color: #642a37; font-size: 18px">
            {{ title }}
          </p>
        </div>
        <div
          class="photo_template size-24"
          id="image_profil"  v-if="image != null" :style="
           ` background-image: url('${image}');
            background-color: #642a37;
            border-radius: 8%;
            background-size: cover;`"
         
        >
          <!-- <img style="width: 100%;" src="" alt="" srcset=""> -->
        </div>
      </div>
      <div style="padding: 0 40px">
        <ul
          style="
            list-style: none;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          "
        >
          <li
            class="flex gap-2 items-center border-b-8 pb-6"
            style="border-bottom: 4px #642a37 solid"
            id="address_cadre"
          >
            <div>
              <svg
                fill="#642a37"
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
                  <path
                    d="M150,34.94c-27.5-27.5-72-27.5-100,0a70.49,70.49,0,0,0-8,90l33.5,48a30.4,30.4,0,0,0,49.5,0l33.5-48A71.18,71.18,0,0,0,150,34.94Zm-8.5,78.5-33.5,48a10.31,10.31,0,0,1-16.5,0l-33.5-48a50.14,50.14,0,0,1,6-64.5c20-20,52-20,71.5,0a50.19,50.19,0,0,1,6,64.5Zm-41.5-67a35,35,0,1,0,35,35A34.78,34.78,0,0,0,100,46.44Zm0,50a15,15,0,1,1,15-15A14.73,14.73,0,0,1,100,96.44Z"
                  ></path>
                </g>
              </svg>
            </div>
            <div>
              <p contenteditable="" id="address" v-if="address">
                {{ address }}
              </p>
            </div>
          </li>
          <li
            class="flex gap-2 items-center border-b-8 pb-6"
            style="border-bottom: 4px #642a37 solid"
            id="phone_cadre"
          >
            <div>
              <svg
                fill="#642a37"
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
                  <path
                    d="M21.999 4h-12c-1.104 0-1.999 0.896-1.999 2v20c0 1.104 0.895 2 1.999 2h12c1.105 0 2.001-0.896 2.001-2v-20c0-1.104-0.896-2-2.001-2zM13 5h5l0.062 1h-5.062v-1zM15.979 26.5c-0.552 0-1-0.447-1-1s0.448-1 1-1c0.553 0 1 0.447 1 1s-0.448 1-1 1zM21.999 23h-12l0.021-16h11.979v16z"
                  ></path>
                </g>
              </svg>
            </div>
            <div>
              <p id="phone" contenteditable="">
                {{ phone }}
              </p>
            </div>
          </li>
          <li
            class="flex gap-2 items-center border-b-8 pb-6"
            style="border-bottom: 4px #642a37 solid"
            id="email_cadre"
          >
            <div>
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
                    stroke="#642a37"
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
                    stroke="#642a37"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></rect>
                </g>
              </svg>
            </div>
            <div>
              <p>
                <span id="email" contenteditable="">{{ email }}</span
                ><br />
                <span contenteditable="">{{ website }}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="pt-5 grid grid-cols-10">
        <div
          class="flex flex-col col-span-3 gap-2 px-10"
          id="work_experience_cadre"
        >
          <div>
            <svg
              width="32px"
              height="32px"
              class="size-10 p-1 rounded-full color-steal z-10"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M511.3 191.8H94c-16.4 0-29.8 13.3-29.8 29.7l-0.8 644.3c0 16.5 13.3 29.8 29.8 29.8h306.1l8.3 16.3c5.1 10 15.3 16.3 26.6 16.3h156c10.9 0 20.9-6 26.2-15.5l9.3-17h304c16.4 0 29.8-13.3 29.8-29.8V221.6c0-16.4-13.3-29.8-29.8-29.8H511.3z"
                  fill="#642a37"
                ></path>
                <path
                  d="M517.8 189.4c-5.3 3.6-12.1 4.3-18 1.7-32.7-14.4-143.8-59.4-248.8-59.4H144.5c-10.2 0-18.5 8.3-18.5 18.5v666.6c0 10.2 8.3 18.5 18.5 18.5h328.3c5.4 0 10.5 2.3 14 6.4l8.8 10.1c7.3 8.4 20.3 8.5 27.7 0.3l9.8-10.7c3.5-3.9 8.5-6.1 13.7-6.1h328.8c10.2 0 18.5-8.3 18.5-18.5l0.9-666.6c0-10.3-8.3-18.6-18.5-18.6H764.2c0 0.1-155.6-4.1-246.4 57.8z"
                  fill="#FFFFFF"
                ></path>
                <path
                  d="M511 894.1l-31.3-36c-3.5-4.1-8.6-6.4-14-6.4H126.6c-10.2 0-18.5-8.3-18.5-18.5V126.6c0-10.2 8.3-18.5 18.5-18.5H253c100.6 0 204.6 39 247.2 56.9 5.6 2.3 11.9 1.8 17-1.3 94.5-58.4 239.7-55.8 249.4-55.6h132.1c10.3 0 18.6 8.3 18.5 18.6l-1 706.6c0 10.2-8.3 18.5-18.5 18.5h-340c-5.2 0-10.2 2.2-13.7 6.1l-33 36.2z m-363-82.4h336c5.4 0 10.5 2.3 14 6.4 7.3 8.4 20.3 8.5 27.7 0.3l0.6-0.6c3.5-3.9 8.5-6.1 13.7-6.1h336.2l0.9-663.7H765.7c-1.6 0-159.7-3.5-242.2 59.7l-0.7 0.5c-5.5 4.2-13 5-19.3 2l-0.8-0.4C501 209 371.5 148 252.9 148H148v663.7z"
                  fill="#642a37"
                ></path>
                <path d="M511.3 200.1v667.5" fill="#FFFFFF"></path>
                <path d="M491.3 200.1h40v667.5h-40z" fill="#642a37"></path>
                <path
                  d="M576 291.6h256v40H576zM576 443.1h256v40H576zM576 611.5h256v40H576zM191 291.5h256v40H191zM191 443.1h256v40H191zM191 611.5h256v40H191z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
            <div style="margin-top: 10px">
              <h2 class="text-color-steal text-xl font-bold">Education</h2>
              <ul
                class="flex flex-col gap-2"
                style="list-style: none; margin-top: 10px; padding: 0"
              >
                <li v-for="education in educations">
                  <h3 contenteditable="" class="text-color-steal font-semibold">
                    {{ education.grade }}
                  </h3>
                  <p contenteditable="">
                    {{ education.title }}<br />
                    {{ education.start_date }} - {{ education.end_date }}<br />
                    {{ education.city }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
              class="size-10 p-1 rounded-full color-steal z-10"
              height="32px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M5 8l6 6"></path>
                <path d="M4 14l6-6 2-3"></path>
                <path d="M2 5h12"></path>
                <path d="M7 2h1"></path>
                <path d="M22 22l-5-10-5 10"></path>
                <path d="M14 18h6"></path>
              </g>
            </svg>
            <div style="margin-top: 10px">
              <h2 class="text-color-steal text-xl font-bold">Languages</h2>
              <ul>
                <li v-for="language in languages">
                  <h3 contenteditable="">{{ language.title }}</h3>
                  <span class="text-color-steal text-sm" contenteditable="">{{
                    language.level
                  }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="hobbies && hobbies.length > 0">
            <svg
              fill="#ffffff"
              height="32px"
              width="32px"
              class="size-10 p-1 rounded-full color-steal z-10"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 50 50"
              xml:space="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Layer_1">
                  <path
                    d="M1,38h23v3H12v2h26v-2H26v-3h23V8H1V38z M3,10h44v26H3V10z"
                  ></path>
                </g>
                <g></g>
              </g>
            </svg>
            <div style="margin-top: 10px">
              <h2 class="text-color-steal text-xl font-bold">Hobbies</h2>
              <ul class="pl-5" style="list-style: disc">
                <li v-for="hobby in hobbies" contenteditable="">{{ hobby.title }}</li>
              </ul>
            </div>
          </div>
          <!-- <div>
                        <svg width="32px" height="32px" class=" size-10 p-1 rounded-full color-steal z-10"
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M19 1C19 0.447715 19.4477 0 20 0C20.5523 0 21 0.447715 21 1V1.58582L22.2709 0.314894C22.6614 -0.0756305 23.2946 -0.0756294 23.6851 0.314895C24.0757 0.705419 24.0757 1.33858 23.6851 1.72911L22.4142 3H23C23.5523 3 24 3.44772 24 4C24 4.55228 23.5523 5 23 5H20.4142L12.7017 12.7125C12.3112 13.103 11.678 13.103 11.2875 12.7125C10.897 12.322 10.897 11.6888 11.2875 11.2983L19 3.58582V1Z"
                                    fill="#ffffff"></path>
                                <path
                                    d="M17.3924 3.78908C17.834 3.3475 17.7677 2.61075 17.2182 2.31408C15.6655 1.47581 13.8883 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 10.1154 22.5261 8.34153 21.6909 6.79102C21.3946 6.24091 20.6574 6.17424 20.2155 6.61606L20.1856 6.64598C19.8554 6.97615 19.8032 7.48834 20.016 7.90397C20.6451 9.1326 21 10.5249 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.4782 3 14.8732 3.35638 16.1037 3.98791C16.5195 4.20129 17.0322 4.14929 17.3627 3.81884L17.3924 3.78908Z"
                                    fill="#ffffff"></path>
                                <path
                                    d="M14.3899 6.79159C14.8625 6.31902 14.7436 5.52327 14.1062 5.32241C13.4415 5.11295 12.7339 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 11.2702 18.8883 10.5664 18.6811 9.9049C18.4811 9.26659 17.6846 9.14697 17.2117 9.61995L17.1194 9.71224C16.8382 9.99337 16.7595 10.4124 16.8547 10.7984C16.9496 11.1833 17 11.5858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C12.4172 7 12.8225 7.0511 13.21 7.1474C13.5965 7.24347 14.0166 7.16496 14.2982 6.88331L14.3899 6.79159Z"
                                    fill="#ffffff"></path>
                                <path
                                    d="M11.078 9.15136C11.4874 9.01484 11.6934 9.48809 11.3882 9.79329L10.5827 10.5989C9.80254 11.379 9.80254 12.6438 10.5827 13.4239C11.3628 14.204 12.6276 14.204 13.4077 13.4239L14.2031 12.6285C14.5089 12.3227 14.9822 12.5301 14.8429 12.9397C14.441 14.1209 13.3135 15 12 15C10.3431 15 9 13.6569 9 12C9 10.6796 9.88827 9.54802 11.078 9.15136Z"
                                    fill="#ffffff"></path>
                            </g>
                        </svg>
                        <div class="mt-4">
                            <h2 class="text-color-steal text-xl font-bold">Education</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolorem voluptatem
                                consequatur, sapiente vitae quis molestias, nisi porro odit similique atque, doloribus
                                facilis quasi. Tempora aliquid eum porro quas odio.
                            </p>
                        </div>
                    </div> -->
          <!-- <div>
                        <svg fill="#ffffff" height="32px" width="32px" class=" size-10 p-1 rounded-full color-steal z-10"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 50 50" xml:space="preserve">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g id="Layer_1">
                                    <path d="M1,38h23v3H12v2h26v-2H26v-3h23V8H1V38z M3,10h44v26H3V10z"></path>
                                </g>
                                <g> </g>
                            </g>
                        </svg>
                        <div style="margin-top: 10px;">
                            <h2 class="text-color-steal text-xl font-bold">Computer</h2>
                            <ul class="pl-5" style="list-style: disc;">
                                <li>Critical Thinking</li>
                                <li>High Technical</li>
                                <li>Active Learning</li>
                            </ul>
                        </div>
                    </div> -->
        </div>
        <div
          class="col-span-7 before:content-[''] before:left-14 before:-translate-x-0 before:h-full before:absolute before:w-1 relative point flex flex-col gap-2 px-10"
        >
          <div v-if="resume != ''">
            <div class="flex items-center gap-2">
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                class="size-10 p-1 rounded-full color-steal z-10"
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
                  <g id="Warning / Warning">
                    <path
                      id="Vector"
                      d="M12 6V14M12.0498 18V18.1L11.9502 18.1002V18H12.0498Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </g>
              </svg>
              <h2 class="text-color-steal text-xl font-bold">
                Professional Summary
              </h2>
            </div>
            <div style="margin-top: 10px">
              <p class="mt-2 pl-12" contenteditable="">
                {{ resume }}
              </p>
            </div>
          </div>
          <div>
            <div>
              <div
                class="flex items-center gap-2"
                v-if="workExperiences && workExperiences.length > 0"
              >
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  class="size-10 p-1 rounded-full color-steal z-10"
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
                    <g id="Warning / Warning">
                      <path
                        id="Vector"
                        d="M12 6V14M12.0498 18V18.1L11.9502 18.1002V18H12.0498Z"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </g>
                </svg>
                <h2 class="text-color-steal text-xl font-bold">
                  Professional Experience
                </h2>
              </div>
              <div style="margin-top: 10px" class="flex pl-12 flex-col gap-2">
                <div
                  v-for="workExperience in workExperiences"
                  class="grid grid-cols-5 gap-2 before:content-[''] point before:left-10 before:translate-y-2 before:rounded-full before:w-8 before:h-1 before:absolute"
                >
                  <div class="col-span-2">
                    <h3 contenteditable="" class="text-color-steal text-xl font-semibold">
                      {{ workExperience.company }}
                    </h3>
                    <h4 contenteditable="">{{ workExperience.jobTitle }}</h4>
                    <h4 contenteditable="">
                      {{ workExperience.startDate }} –
                      {{ workExperience.endDate }}
                    </h4>
                  </div>
                  <div contenteditable="" class="col-span-3" v-html="workExperience.professionalTasksPerformed">
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <svg
                width="32px"
                height="32px"
                class="size-10 p-1 relative rounded-full color-steal z-10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M19 1C19 0.447715 19.4477 0 20 0C20.5523 0 21 0.447715 21 1V1.58582L22.2709 0.314894C22.6614 -0.0756305 23.2946 -0.0756294 23.6851 0.314895C24.0757 0.705419 24.0757 1.33858 23.6851 1.72911L22.4142 3H23C23.5523 3 24 3.44772 24 4C24 4.55228 23.5523 5 23 5H20.4142L12.7017 12.7125C12.3112 13.103 11.678 13.103 11.2875 12.7125C10.897 12.322 10.897 11.6888 11.2875 11.2983L19 3.58582V1Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    d="M17.3924 3.78908C17.834 3.3475 17.7677 2.61075 17.2182 2.31408C15.6655 1.47581 13.8883 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 10.1154 22.5261 8.34153 21.6909 6.79102C21.3946 6.24091 20.6574 6.17424 20.2155 6.61606L20.1856 6.64598C19.8554 6.97615 19.8032 7.48834 20.016 7.90397C20.6451 9.1326 21 10.5249 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.4782 3 14.8732 3.35638 16.1037 3.98791C16.5195 4.20129 17.0322 4.14929 17.3627 3.81884L17.3924 3.78908Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    d="M14.3899 6.79159C14.8625 6.31902 14.7436 5.52327 14.1062 5.32241C13.4415 5.11295 12.7339 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 11.2702 18.8883 10.5664 18.6811 9.9049C18.4811 9.26659 17.6846 9.14697 17.2117 9.61995L17.1194 9.71224C16.8382 9.99337 16.7595 10.4124 16.8547 10.7984C16.9496 11.1833 17 11.5858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C12.4172 7 12.8225 7.0511 13.21 7.1474C13.5965 7.24347 14.0166 7.16496 14.2982 6.88331L14.3899 6.79159Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    d="M11.078 9.15136C11.4874 9.01484 11.6934 9.48809 11.3882 9.79329L10.5827 10.5989C9.80254 11.379 9.80254 12.6438 10.5827 13.4239C11.3628 14.204 12.6276 14.204 13.4077 13.4239L14.2031 12.6285C14.5089 12.3227 14.9822 12.5301 14.8429 12.9397C14.441 14.1209 13.3135 15 12 15C10.3431 15 9 13.6569 9 12C9 10.6796 9.88827 9.54802 11.078 9.15136Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
              <h2 class="text-color-steal text-xl font-bold">
                Professional skills
              </h2>
            </div>
            <div style="margin-top: 10px" class="pl-12">
              <ul class="pl-5" style="list-style: disc">
                <li contenteditable="" v-for="professionalSkill in professionalSkills" >
                  {{ professionalSkill.title }}
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <svg
                width="32px"
                height="32px"
                class="size-10 p-1 relative rounded-full color-steal z-10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M19 1C19 0.447715 19.4477 0 20 0C20.5523 0 21 0.447715 21 1V1.58582L22.2709 0.314894C22.6614 -0.0756305 23.2946 -0.0756294 23.6851 0.314895C24.0757 0.705419 24.0757 1.33858 23.6851 1.72911L22.4142 3H23C23.5523 3 24 3.44772 24 4C24 4.55228 23.5523 5 23 5H20.4142L12.7017 12.7125C12.3112 13.103 11.678 13.103 11.2875 12.7125C10.897 12.322 10.897 11.6888 11.2875 11.2983L19 3.58582V1Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    d="M17.3924 3.78908C17.834 3.3475 17.7677 2.61075 17.2182 2.31408C15.6655 1.47581 13.8883 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 10.1154 22.5261 8.34153 21.6909 6.79102C21.3946 6.24091 20.6574 6.17424 20.2155 6.61606L20.1856 6.64598C19.8554 6.97615 19.8032 7.48834 20.016 7.90397C20.6451 9.1326 21 10.5249 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.4782 3 14.8732 3.35638 16.1037 3.98791C16.5195 4.20129 17.0322 4.14929 17.3627 3.81884L17.3924 3.78908Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    d="M14.3899 6.79159C14.8625 6.31902 14.7436 5.52327 14.1062 5.32241C13.4415 5.11295 12.7339 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 11.2702 18.8883 10.5664 18.6811 9.9049C18.4811 9.26659 17.6846 9.14697 17.2117 9.61995L17.1194 9.71224C16.8382 9.99337 16.7595 10.4124 16.8547 10.7984C16.9496 11.1833 17 11.5858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C12.4172 7 12.8225 7.0511 13.21 7.1474C13.5965 7.24347 14.0166 7.16496 14.2982 6.88331L14.3899 6.79159Z"
                    fill="#ffffff"
                  ></path>
                  <path
                    d="M11.078 9.15136C11.4874 9.01484 11.6934 9.48809 11.3882 9.79329L10.5827 10.5989C9.80254 11.379 9.80254 12.6438 10.5827 13.4239C11.3628 14.204 12.6276 14.204 13.4077 13.4239L14.2031 12.6285C14.5089 12.3227 14.9822 12.5301 14.8429 12.9397C14.441 14.1209 13.3135 15 12 15C10.3431 15 9 13.6569 9 12C9 10.6796 9.88827 9.54802 11.078 9.15136Z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
              <h2 class="text-color-steal text-xl font-bold">
                Personal skills
              </h2>
            </div>
            <div style="margin-top: 10px" class="pl-12">
              <ul class="pl-5" style="list-style: disc">
                <li contenteditable="" v-for="personalSkill in personalSkills" >
                  {{ personalSkill.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
