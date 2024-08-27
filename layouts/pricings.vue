<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-vue-next";
</script>

<template>
  <div class="flex flex-col overflow-auto text-white min-h-">
    <header
      class="z-10 sticky top-0 bg-gradient-to-l  from-[#4E0F1F] to-[#B04964]"
    >
      <div class="container mx-auto max-w-screen-2xl">
        <header class="flex items-center py-3 justify-">
          <Button
            variant="outline"
            @click="$router.back()"
            class="space-x-2 rounded-full"
          >
            <ArrowLeft />
            <span class="font-bold">Back</span>
          </Button>
          <div class="flex-1 pt-10">
            
            <div
              class="mt-3 text-center -translate-x-[25%] w-fit mx-auto "
            >
            <nuxtImg
              class="w-[60px] mx-auto "
              src="img/logo-dark-theme.svg"
              alt=""
              srcset=""
            />
              <div class="text-2xl font-bold">Choose a plan</div>
              <div class="mt-5">⚠️ No automatic renewal ⚠️</div>
            </div>
        
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
