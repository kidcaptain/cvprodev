<script setup lang="ts">
import { ArrowRight, Camera, Trash } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Separator } from "@/components/ui/separator";
import { useRoute as useNativeRoute } from "vue-router";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import * as z from "zod";

const formSchema = toTypedSchema(z.object({}));

const emit = defineEmits(["submit"]);
useHead({
  title: "Create CV Step1 - CV PRO",
});
const { handleSubmit } = useForm({
  validationSchema: formSchema,
});
onMounted(() => {
  const step1 = window.localStorage.getItem("step_1");
  if (step1) {
    const etape1: {
      firstname: string;
      lastname: string;
      title: string;
      yearOfExperience: string;
      address: string;
      phone: string;
      email: string;
      website: string;
      objective: string;
    } = JSON.parse(`${step1}`);
    (document.getElementById("firstname") as HTMLInputElement).value =
      etape1.firstname;
    (document.getElementById("lastname") as HTMLInputElement).value =
      etape1.lastname;
    (document.getElementById("title") as HTMLInputElement).value = etape1.title;
    (document.getElementById("yearOfExperience") as HTMLInputElement).value =
      etape1.yearOfExperience;
    (document.getElementById("address") as HTMLInputElement).value =
      etape1.address;
    (document.getElementById("phone") as HTMLInputElement).value = "";
    (document.getElementById("email") as HTMLInputElement).value = etape1.email;
    (document.getElementById("website") as HTMLInputElement).value =
      etape1.website;
    (document.getElementById("objectif") as HTMLInputElement).value =
      etape1.objective;
  }
  const input = document.getElementById("firstname") as HTMLInputElement;
  if (input) {
    input.focus();
  }
});
const onSubmit = handleSubmit((e: any) => {
  const firstname = (document.getElementById("firstname") as HTMLInputElement)
    .value;
  const lastname = (document.getElementById("lastname") as HTMLInputElement)
    .value;
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const yearOfExperience = (
    document.getElementById("yearOfExperience") as HTMLInputElement
  ).value;
  const address = (document.getElementById("address") as HTMLInputElement)
    .value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const website = (document.getElementById("website") as HTMLInputElement)
    .value;
  const objective = (document.getElementById("objectif") as HTMLTextAreaElement)
    .value;
  const identifiant = (
    document.getElementById("identifiant") as HTMLSelectElement
  ).value;
  if (!isImage) {
    destroyImage();
  }
  if (phone != "") {
    const value = {
      firstname: firstname,
      lastname: lastname,
      title: title,
      yearOfExperience: yearOfExperience,
      address: address,
      phone: phone == "" ? "" : identifiant + " " + phone,
      email: email,
      website: website,
      objective: objective,
    };
    window.localStorage.setItem("step_1", JSON.stringify(value));
    // values.phone = phone + " " + values.phone;
    if (filename.value) {
      window.URL.revokeObjectURL(filename.value);
    }
    emit("submit");
  } else {
    alert("Please fill in the required fields");
  }
});

const filename = ref("");

// function getBase64Image(img: HTMLImageElement) {
//   var canvas = document.createElement("canvas");
//   canvas.width = img.width;
//   canvas.height = img.height;

//   var ctx = canvas.getContext("2d");
//   ctx?.drawImage(img, 0, 0, img.width, img.height);

//   var dataURL = canvas.toDataURL();

//   // dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
//   var date = new Date();
//   var todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();

//   return { data: dataURL, date: todaysDate };
// }
const imageSelected = ref(false);
async function uploadImage(e: any) {
  let fl_files = e.target.files;
  let fl_file = fl_files[0];
  const upload_file = document.getElementById("upload_file");
  const storage = sessionStorage;
  if (upload_file) {
    var reader = new FileReader();
    reader.addEventListener("loadend", function () {
      (upload_file as any).src = reader.result;
      storage["image"] = reader.result;
      window.localStorage.setItem("profileimage", reader.result as string);
    });
    reader.readAsDataURL(fl_file);
    imageSelected.value = true;
  }
}

const destroyImage = () => {
  const upload_file = document.getElementById("upload_file");
  const upload_file_2 = document.getElementById("upload_file_2");
  const avatar = document.getElementById("avatar");
  if (upload_file && avatar && upload_file_2) {
    (upload_file as any).src = (upload_file_2 as any).src;
    (avatar as any).value = null;
    imageSelected.value = false;
    window.URL.revokeObjectURL("");
    window.localStorage.setItem("profileimage", "");
  }

  window.URL.revokeObjectURL("");
};
const route = useNativeRoute();
const isImage = ref(false);
const noImage = () => {
  if (isImage.value == true) {
    isImage.value = false;
  } else {
    isImage.value = true;
  }
};

const router = useRouter();
const template = route.query.template_id;
const type = route.query.type;

const showPreview = () => {
  const firstname = (document.getElementById("firstname") as HTMLInputElement)
    .value;
  const lastname = (document.getElementById("lastname") as HTMLInputElement)
    .value;
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const yearOfExperience = (
    document.getElementById("yearOfExperience") as HTMLInputElement
  ).value;
  const address = (document.getElementById("address") as HTMLInputElement)
    .value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const website = (document.getElementById("website") as HTMLInputElement)
    .value;
  const objective = (document.getElementById("objectif") as HTMLTextAreaElement)
    .value;
  const identifiant = (
    document.getElementById("identifiant") as HTMLSelectElement
  ).value;
  const maritalStatus = (
    document.getElementById("maritalStatus") as HTMLSelectElement
  ).value;
  const linkedinProfile = (
    document.getElementById("linkedinProfile") as HTMLSelectElement
  ).value;

  const value = {
    firstname: firstname,
    lastname: lastname,
    title: title,
    yearOfExperience: yearOfExperience,
    address: address,
    phone: phone == "" ? "" : identifiant + " " + phone,
    email: email,
    website: website,
    maritalStatus: maritalStatus,
    linkedIn: linkedinProfile,
    objective: objective,
  };
  window.localStorage.setItem("step_1", JSON.stringify(value));
  // values.phone = phone + " " + values.phone;
  if (filename.value) {
    window.URL.revokeObjectURL(filename.value);
  }
  router.push({
    name: "app-cv-builder-preview-id",
    params: { id: template?.toString() },
  });
};
const phone = ref();
const maritalStatus = ref();
</script>

<template>
  <form
    @submit="onSubmit"
    enctype="multipart/form-data"
    class="relative text-foreground"
  >
    <Button
      @click="showPreview"
      type="button"
      class="absolute right-0 text-sm bg-white rounded-full shadow-sm md:text-lg shadow-primary/20 text-primary"
      variant="ghost"
      size="sm"
    >
      Preview
    </Button>
    <div v-if="type && type == 'with'" >
      <div v-if="isImage" class="w-full mx-auto">
        <label for="avatar" class="mx-auto w-fit">
          <div
            id="updload_file"
            class="grid mx-auto mb-2 overflow-hidden bg-gray-200 border border-gray-500 rounded-full cursor-pointer size-24 place-content-center md:size-36"
          >
            <!-- <Camera class="text-white size-16" /> -->
            <img
              src="/assets/img/pics/placeholder.png"
              class="w-full h-full bg-contain"
              alt=""
              id="upload_file"
              srcset=""
            />
            <img
              src="/assets/img/pics/placeholder.png"
              class="hidden w-full h-full bg-contain"
              alt=""
              id="upload_file_2"
              srcset=""
            />
          </div>
        </label>
        <Input
          accept="image/png, image/jpeg, image/jpg"
          id="avatar"
          name="profile"
          type="file"
          class="m-auto text-xs md:text-lg w-fit"
          @change="uploadImage"
        />
        <div v-if="imageSelected" class="flex justify-center">
          <button
            type="button"
            @click="destroyImage"
            class="p-2 m-auto font-semibold text-red-600 w-fit"
          >
            <Trash></Trash>
          </button>
        </div>
      </div>
      <div class="gap-2 flex justify-center items-center w-full">
        <label>No image</label>
        <Input
          accept="image/png, image/jpeg, image/jpg"
          id="avatar"
          name="profile"
          type="checkbox"
          :checked="!isImage"
          class="text-xs p-4 md:text-lg w-fit"
          @change="isImage = !isImage"
        />
      </div>
    </div>
    <div v-else class="mt-8 w-full h-14"></div> 
    <div class="my-6 space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
      <FormField v-slot="{ componentField }" name="firstname">
        <FormItem>
          <label title="required"
            >First Name <span class="text-red-500">*</span></label
          >
          <FormControl>
            <Input
              type="text"
              id="firstname"
              v-bind="componentField"
              placeholder="Enter your firstname"
              required
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastname">
        <FormItem>
          <label title="required"
            >Last Name <span class="text-red-500">*</span></label
          >
          <FormControl>
            <Input
              type="text"
              id="lastname"
              placeholder="Enter your lastname"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <label title="required"
            >Title <span class="text-red-500">*</span></label
          >
          <FormControl>
            <Input
              id="title"
              type="text"
              placeholder="Enter your Title of your last job or current job"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="experience">
        <FormItem>
          <label title="required"
            >Years of experience <span class="text-red-500">*</span></label
          >
          <FormControl>
            <Input
              type="number"
              id="yearOfExperience"
              v-bind="componentField"
              placeholder="Enter your year of experience of current job"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 col-span-full">
        <FormField v-slot="{ componentField }" name="age">
          <FormItem class="col-span-1">
            <label title="required">Age</label>
            <FormControl>
              <Input
                type="number"
                id="age"
                v-bind="componentField"
                placeholder="Enter your age"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="marital">
          <FormItem class="col-span-1">
            <label>Marital status </label> <br />
            <FormControl>
              <select
                v-bind="maritalStatus"
                name="maritalStatus"
                id="maritalStatus"
                class="w-full px-4 py-2 text-white rounded-md bg-primary"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="divorced">Divorced</option>
              </select>
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="address">
          <FormItem>
            <label>Address <span class="text-red-500">*</span></label>
            <FormControl>
              <Input
                id="address"
                type="text"
                placeholder="Enter your address"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </div>
      <Separator class="col-span-2 bg-gray-300 border-gray-300" />

      <div>
        <label for="" class="text-sm font-semibold" title="required"
          >Phone Number <span class="text-red-500">*</span></label
        >
        <div class="flex items-center grid-cols-2 gap-2 mt-2">
          <select
            v-bind="phone"
            name="identifiant"
            style="width: 100px"
            id="identifiant"
            class="py-2 text-white rounded-md bg-primary"
          >
            <option value="+213">+213</option>
            <option value="+244">+244</option>
            <option value="+297">+297</option>
            <option value="+267">+267</option>
            <option value="+226">+226</option>
            <option value="+257">+257</option>
            <option value="+238">+238</option>
            <option value="+236">+236</option>
            <option value="+235">+235</option>
            <option value="+269">+269</option>
            <option value="+242">+242</option>
            <option value="+225">+225</option>
            <option selected value="+237">+237</option>
          </select>
          <FormField v-slot="{ componentField }" class="w-96" name="phone">
            <FormItem class="w-96">
              <FormControl>
                <Input
                  id="phone"
                  class="w-full"
                  type="tel"
                  placeholder="Enter your phone number"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>
      </div>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <label>Email Address <span class="text-red-500">*</span></label>
          <FormControl>
            <Input
              type="text"
              id="email"
              placeholder="Enter your email"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="website">
        <FormItem>
          <label title="facultatif"
            >Website (<span class="text-xs text-stone-400">facultatif</span
            >)</label
          >
          <FormControl>
            <Input
              type="text"
              id="website"
              placeholder="Enter your website link"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="linkedinProfile">
        <FormItem class="col-span-1">
          <label title="required">LinkedIn profile</label>
          <FormControl>
            <Input
              type="text"
              id="linkedinProfile"
              v-bind="componentField"
              placeholder="Enter your name on LinkedIn"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <!-- <Separator class="col-span-2 bg-gray-300 border-gray-300" /> -->
      <FormField
        v-slot="{ componentField }"
        name="objective"
        class="col-span-2"
      >
        <FormItem class="col-span-2">
          <label>Objective</label>
          <FormControl>
            <Textarea
              id="objectif"
              class="w-full col-span-2"
              v-bind="componentField"
              placeholder="Enter your resume or objective"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
    </div>
    <div class="flex justify-end">
      <Button type="submit" class="px-2 w-fit">
        <span>Next</span>
        <ArrowRight />
      </Button>
    </div>
  </form>
</template>
