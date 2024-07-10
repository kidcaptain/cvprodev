<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-vue-next";
</script>

<template>
  <div class="min-h- overflow-auto text-white flex flex-col">
    <header
      class="z-10 sticky top-0 bg-gradient-to-l from-[#4E0F1F] to-[#B04964]"
    >
      <div class="container max-w-screen-2xl mx-auto">
        <header class="flex justify- items-center py-3">
          <Button
            variant="outline"
            @click="$router.back()"
            class="rounded-full space-x-2"
          >
            <ArrowLeft />
            <span class="font-bold">Back</span>
          </Button>
          <div class="flex-1">
            <nuxtImg
              class="w-[60px] mx-auto -translate-x-[50%]"
              src="img/logo-dark-theme.svg"
              alt=""
              srcset=""
            />
            <h2
              class="mt-3 text-center text-2xl -translate-x-[25%] w-fit mx-auto font-bold"
            >
              Choose a plan
            </h2>
          </div>
        </header>
      </div>
    </header>
    <main class="bg-gradient-to-l from-[#4E0F1F] to-[#B04964] flex-1">
      <div class="container py-12">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
