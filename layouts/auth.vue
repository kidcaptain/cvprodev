<script setup>
import { ArrowLeft } from "lucide-vue-next";

const messageDisplayed = ref("");
const loginSidePannel = ref(null);
</script>

<template>
  <div
    class="relative flex min-h-screen px-2 bg-primary lg:bg-background md:p-0 c"
  >
    <Button
      class="absolute z-10 space-x-2 rounded-full top-10 md:hidden"
      variant="outline"
      @click="$router.back()"
    >
      <ArrowLeft />
      <span class="font-bold">Back</span>
    </Button>
    <div
      ref="loginSidePannel"
      class="bg-secondary/80 bg-gradient-to-t from-primary relative group hidden w-0 flex-1 items-center justify-center lg:flex lg:w-1/2 overflow-clip rounded-r-[150px]"
    >
      <div
        class="absolute right-0 w-full max-w-[52rem] flex justify-end h-full py-12 opacity-10"
      >
        <slot name="side-image">
       
        </slot>
      </div>
      <div class="w-full max-w-2xl px-4 mx-auto font-bold text-white">
        <Button
          class="absolute z-10 space-x-2 rounded-full top-20"
          variant="outline"
          @click="$router.back()"
        >
          <ArrowLeft />
          <span class="font-bold">Back</span>
        </Button>
        <h2 class="mb-4 text-3xl text-justify uppercase">Welcome to CV Pro CV Templates!</h2>
        <p>
          Explore our curated selection of professional designs to enhance your
          CV. Find the perfect template to showcase your skills and experiences.
          Start crafting your standout resume today! <br />
        </p>
      </div>
    </div>
    <div
      class="relative flex flex-col justify-center flex-1 py-12 lg:w-1/2 lg:flex-none white"
    >
      <div
        class="relative mx-auto w-full max-w-lg rounded-[30px] shadow-xl bg-white p-12"
      >
        <!-- <img class="mb-8 scale-75 -translate-x-12 cursor-pointer" src="/img/logo-footer.png" alt=""
                    @mouseenter="displayMessage('no-good-by')" @mouseleave="displayMessage('')"> -->

        <div class="mb-3">
          <h2
            class="mt-6 mb-6 text-3xl font-semibold nui-weight-medium nui-lead-relaxed"
          >
            <slot name="title"> Hey, Hello !</slot>
          </h2>
        </div>
        <slot></slot>
        <div class="flex items-center mt-5 mb-5 flex-100">
          <hr
            class="flex-auto border-t-2 border-muted-200 dark:border-muted-700"
          />
          <span
            class="px-4 font-sans font-light text-muted-600 dark:text-muted-300"
          >
            OR
          </span>
          <hr
            class="flex-auto border-t-2 border-muted-200 dark:border-muted-700"
          />
        </div>
        <PartsAuthProviders />
      </div>
    </div>
  </div>
</template>
