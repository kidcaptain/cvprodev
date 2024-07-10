<script setup lang="ts">
import { ArrowRight, Camera } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import * as z from "zod";

const props = defineProps<{
  profileInfo: any;
}>();

const emit = defineEmits(["submit"]);

const onSubmit = (e: any) => {
  e.preventDefault();
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
};

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
  }
}

const phone = ref();
</script>

<template>
  <form
    @submit="onSubmit"
    enctype="multipart/form-data"
    class="text-foreground p-4"
  >
    <div class="mx-auto w-00">
     
      <Input
        accept="image/png, image/jpeg, image/jpg"
        id="avatar"
        name="profile"
        type="file"
        class="m-auto w-fit"
        @change="uploadImage"
      />
    </div>
    <div class="my-6 space-y-2 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
      <!--      
        <Separator
          v-if="field.separator"
          class="col-span-2 bg-gray-300 border-gray-300"
        /> -->
      <!--    -->
      <FormField name="firstname">
        <FormItem>
          <label class="text-sm">Full Name</label>
          <FormControl>
            <Input
              type="text"
              id="firstname"
              v-model="props.profileInfo.name"
              placeholder="John Doe"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField name="title">
        <FormItem>
          <label class="text-sm">Title</label>
          <FormControl>
            <Input
              id="title"
              type="text"
              class="text-xs "
              v-model="props.profileInfo.title"
              placeholder="Accountant"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField name="experience">
        <FormItem>
          <label class="text-sm">years of experience</label>
          <FormControl>
            <Input
              type="number"
              class="text-xs "
              id="yearOfExperience"
              v-model="props.profileInfo.yearsOfExperience"
              placeholder="5"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField name="address">
        <FormItem>
          <label  class="text-sm ">Address</label>
          <FormControl>
            <Input
              id="address"
              type="text"
              class="text-xs "
              placeholder="135 Montée Jouvence"
              v-model="props.profileInfo.address"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
    
      <FormField class="basis-full " name="phone">
        <FormItem>
          <label for="" class="text-sm">Phone Number</label>
          <FormControl>
            <Input
              id="phone"
              v-model="props.profileInfo.phone"
              class="w-full text-xs"
              type="tel"
              
              placeholder="600 00 00 00"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField name="email">
        <FormItem>
          <label  class="text-sm">Email</label>
          <FormControl>
            <Input type="text" id="email" v-model="props.profileInfo.email" />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField name="website">
        <FormItem>
          <label  class="text-sm">Website</label>
          <FormControl>
            <Input
              type="text"
              id="website"
              v-model="props.profileInfo.website"
              placeholder="cv-pro.com"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField name="objective" class="col-span-2">
        <FormItem class="col-span-2">
          <label  class="text-sm">Objectif</label>
          <FormControl>
            <Textarea
              id="objectif"
              v-model="props.profileInfo.goal"
              class="w-full col-span-2"
              placeholder="Objectif"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
    </div>
    <div class="flex justify-end">
      <Button type="submit" size="sm" class="text-xs ">
        <span>Education and Experience</span>
        <ArrowRight :size="14" />
      </Button>
    </div>
  </form>
</template>
