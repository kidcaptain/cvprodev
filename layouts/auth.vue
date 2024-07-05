<script setup>
import { ArrowLeft } from "lucide-vue-next";

const messageDisplayed = ref("");
const loginSidePannel = ref(null);
</script>

<template>
  <div
    class="flex min-h-screen bg-primary lg:bg-background relative px-2 md:p-0 c"
  >
    <Button
      class="absolute z-10 top-10 rounded-full space-x-2 md:hidden"
      variant="outline"
      @click="$router.back()"
    >
      <ArrowLeft />
      <span class="font-bold">Back</span>
    </Button>
    <div
      ref="loginSidePannel"
      class="bg-secondary/80 relative group hidden w-0 flex-1 items-center justify-center lg:flex lg:w-1/2 overflow-clip rounded-r-[150px]"
    >
      <div
        class="absolute right-0 w-full max-w-[52rem] flex justify-end h-full py-12 opacity-10"
      >
        <slot name="side-image">
          <nuxt-img
            src="/img/logo-footer.png"
            alt="image"
            class="my-auto max-h-full h-full object-cover w-full"
          />
        </slot>
      </div>
      <div class="mx-auto w-full max-w-2xl text-white font-bold px-4">
        <Button
          class="absolute z-10 top-20 rounded-full space-x-2"
          variant="outline"
          @click="$router.back()"
        >
          <ArrowLeft />
          <span class="font-bold">Back</span>
        </Button>
        <h2 class="text-3xl uppercase mb-4">Welcome to CV Pro CV Templates!</h2>
        <p>
          Explore our curated selection of professional designs to enhance your
          CV. Find the perfect template to showcase your skills and experiences.
          Start crafting your standout resume today! <br />
        </p>
      </div>
    </div>
    <div
      class="relative flex flex-1 flex-col justify-center py-12 lg:w-1/2 lg:flex-none white"
    >
      <div
        class="relative mx-auto w-full max-w-lg rounded-[30px] shadow-xl bg-white p-12"
      >
        <!-- <img class="mb-8 scale-75 -translate-x-12 cursor-pointer" src="/img/logo-footer.png" alt=""
                    @mouseenter="displayMessage('no-good-by')" @mouseleave="displayMessage('')"> -->

        <div class="mb-3">
          <h2
            class="text-3xl font-semibold mb-6 nui-weight-medium nui-lead-relaxed mt-6"
          >
            <slot name="title"> Hey, Hello !</slot>
          </h2>
        </div>
        <slot></slot>
        <div class="flex-100 mt-5 flex items-center mb-5">
          <hr
            class="border-muted-200 dark:border-muted-700 flex-auto border-t-2"
          />
          <span
            class="text-muted-600 dark:text-muted-300 px-4 font-sans font-light"
          >
            OR
          </span>
          <hr
            class="border-muted-200 dark:border-muted-700 flex-auto border-t-2"
          />
        </div>
        <PartsAuthProviders />
      </div>
    </div>
  </div>
</template>
