<script setup lang="ts">
import { ArrowRight, Camera } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
  })
);

const emit = defineEmits(["submit"]);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
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
  const identifiant = (document.getElementById("identifiant") as HTMLSelectElement)
    .value;

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
    class="text-foreground"
  >
    <div class="mx-auto w-00">
      <label for="avatar" class="mx-auto w-fit">
        <div
          id="updload_file"
          class="grid mx-auto mb-2 overflow-hidden bg-gray-200 border border-gray-500 rounded-full cursor-pointer place-content-center size-36"
        >
          <!-- <Camera class="text-white size-16" /> -->
          <img
            src="/assets/img/pics/placeholder.png"
            class="w-full h-full bg-contain"
            alt=""
            id="upload_file"
            srcset=""
          />
        </div>
      </label>
      <Input
        accept="image/png, image/jpeg, image/jpg"
        id="avatar"
        name="profile"
        type="file"
        class="m-auto w-fit"
        @change="uploadImage"
      />
    </div>
    <div class="my-6 space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
      <!--      
        <Separator
          v-if="field.separator"
          class="col-span-2 bg-gray-300 border-gray-300"
        /> -->
      <!--    -->
      <FormField v-slot="{ componentField }" name="firstname">
        <FormItem>
          <label>First Name</label>
          <FormControl>
            <Input
              type="text"
              id="firstname"
              v-bind="componentField"
              placeholder="John Doe"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastname">
        <FormItem>
          <label>Last Name</label>
          <FormControl>
            <Input
              type="text"
              id="lastname"
              placeholder="Odin'son"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <label>Title</label>
          <FormControl>
            <Input
              id="title"
              type="text"
              placeholder="Accountant"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="experience">
        <FormItem>
          <label>Years of experience</label>
          <FormControl>
            <Input
              type="number"
              id="yearOfExperience"
              v-bind="componentField"
              placeholder="5"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <Separator class="col-span-2 bg-gray-300 border-gray-300" />
      <FormField v-slot="{ componentField }" name="address">
        <FormItem>
          <label>Address</label>
          <FormControl>
            <Input
              id="address"
              type="text"
              placeholder="135 Montée Jouvence"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <div>
        <label for="" class="text-sm font-semibold">Phone Number</label>
        <div class="flex items-center gap-2 mt-2">
          <FormField class="basis-1/4" name="identifiant">
            <FormItem>
              <FormControl>
                <div class="flex items-center gap-2">
                  <select
                    v-bind="phone"
                    name="identifiant"
                    id="identifiant"
                    class="py-2 text-white rounded-md bg-primary"
                  >
                    <option selected value="+237">+237</option>
                    <option value="+1">+1</option>
                  </select>
                </div>
              </FormControl>
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            class="basis-full"
            name="phone"
          >
            <FormItem>
              <FormControl>
                <Input
                  id="phone"
                  class="w-full"
                  type="tel"
                  placeholder="600 00 00 00"
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
          <label>Email</label>
          <FormControl>
            <Input type="text" id="email" v-bind="componentField" />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="website">
        <FormItem>
          <label>Website</label>
          <FormControl>
            <Input
              type="text"
              id="website"
              placeholder="cv-pro.com"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <Separator class="col-span-2 bg-gray-300 border-gray-300" />
      <FormField
        v-slot="{ componentField }"
        name="objective"
        class="col-span-2"
      >
        <FormItem class="col-span-2">
          <label>Objectif</label>
          <FormControl>
            <Textarea
              id="objectif"
              class="w-full col-span-2"
              v-bind="componentField"
              placeholder="Objectif"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
    </div>
    <div class="flex justify-end">
      <Button type="submit" class="px-12 space-x-4">
        <span>Next</span>
        <ArrowRight />
      </Button>
    </div>
  </form>
</template>
