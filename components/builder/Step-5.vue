<script setup lang="ts">
import { Download, ArrowLeft, Share2 } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { ref } from "vue";

const htmlData = ref<string>("");

const getData = async () => {
  window.location.reload();
};
const usePostData = async () => {
  const { data, error, refresh } = useLazyAsyncData("cv-templates-list", () =>
    $fetch(
      "https://api.ticketvivi.com/cvpro/src/Template/Infrastructure/views/template_1714927354.blade.php",
      { mode: "no-cors" }
    )
  );
  console.log(data.value);
  return data;
};

const { data, error, refresh } = await useLazyAsyncData(
  "cv-templates-list",
  () =>
    $fetch(
      "https://api.ticketvivi.com/cvpro/src/Template/Infrastructure/views/template_1714927354.blade.php",
      { mode: "no-cors" }
    )
);

const info1 = ref();
const info2 = ref();
const info3 = ref();
const info4 = ref();

onMounted(() => {
  const step1 = window.localStorage.getItem("step_1");

  if (step1) {
    const etape1 = JSON.parse(step1);
    console.log(JSON.parse(step1));

    const des = document.querySelector(".des");
    if (des) {
      const element = des.children.item(0);
      if (element) {
        element.innerHTML = `${etape1.firstname.toLocaleUpperCase()} <b>${etape1.lastname.toLocaleUpperCase()}</b> <br> <p class="post" style="color: #0a598d; font-size: small;">${
          etape1.title
        }</p>`;
      }
    }
    const right = document.querySelector(".right");
    if (right) {
      const element = right.children.item(0);
      if (element) {
        element.innerHTML = `<li>
           <span class="icon"><i class="fa fa-map-marker" aria-hidden="true"></i></span>
                                <span class="text" style="color: black;">${etape1.address}</span>
                                </li> 
                                <li>
                                 <span class="icon"><i class="fa fa-phone" aria-hidden="true"></i></span>
                                <span class="text" style="color: black;">${etape1.phone}</span></li> <li>
                                 <span class="icon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
                                <span class="text" style="color: black;">${etape1.email}</span></li>`;
      }
    }
    const about = document.querySelector(".about");
    if (about) {
      const element = about.children.item(z1);
      if (element) {
        element.innerHTML = `${etape1.objective}`;
      }
    }
  }
});
</script>

<template>
  <Button v-on:click="getData">Charger le document</Button>
  <div class="py-20" v-html="data"></div>
  <div class="flex flex-col sm:flex-row gap-5 justify-between mt-5">
    <div class="flex flex-1 gap-4 justify-between">
     
      <Button variant="outline">
        <Share2 />
      </Button>
    </div>
    <Button type="submit" class="px-12 space-x-4">
      <Download />
      <span>Download</span>
    </Button>
  </div>
</template>
