<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RefreshCcwIcon } from "lucide-vue-next";
const BASE_URL = useRuntimeConfig().public.backendAPI;
useHead({
  title: "Templates - CV PRO",
  meta: [
    {
      name: "description",
      content: "Our template models",
    },
  ],
});

const preventClose = (event: any) => {
  event.preventDefault();
};
const aggred = ref(userAggreedPrivacies());

const sumbitAggrement = () => {
  setPrivaciesAggrement(aggred.value);
};
const checkImage = ref(true);
const { data, pending, error, refresh } = await useAsyncData<any>(
  "cv-templates-list",
  () => $fetch(`${BASE_URL}templates/get/all`)
);
console.log(data);
</script>
<template>
  <Dialog :defaultOpen="!aggred">
    <DialogContent
      @escapeKeyDown="preventClose"
      @interactOutside="preventClose"
      class="sm:max-w-4xl grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Privacy Policy</DialogTitle>
      </DialogHeader>
      <ScrollArea
        class="grid gap-4 px-6 py-4 overflow-y-auto border-y border-primary"
      >
        <div
          class="w-full prose lg:prose-xl max-w-none prose-headings:text-primary"
        >
          <h1 class="lead">Privacy Policy</h1>
          <p>
            This Privacy Policy describes how CV Pro we collects, uses, and
            shares information when you use our web application to generate CVs
            ("Services"). We are committed to protecting your privacy and the
            security of your personal information. By using our Services, you
            consent to the collection and use of information as described in
            this Privacy Policy.
          </p>
          <h2>Information We Collect</h2>
          <p>
            When you use our Services, we may collect the following types of
            information:
          </p>
          <p>
            <strong>Personal Information:</strong> When y<a href=""
              >ou create an ac</a
            >count or use our Services, we may collect personal information such
            as your name, email address, contact information, employment
            history, educational background, skills, and any other information
            you choose to provide through forms or input fields.
          </p>

          <p>
            <strong>Usage Information:</strong> We may collect information about
            how you interact with our Services, such as the pages you visit, the
            features you use, and the actions you take.
          </p>

          <p>
            <strong>Device Information:</strong> We may collect information
            about the device you use to access our Services, including your
            device type, operating system, browser type, IP address, and other
            technical information.
          </p>

          <h2>How We Use Information</h2>

          <p>
            We may use the information we collect for the following purposes:
          </p>

          <p>
            To provide and improve our Services, including customizing CVs based
            on the information you provide.
          </p>
          <p>
            To communicate with you about your account, updates, and new
            features.
          </p>
          <p>
            To analyze usage trends and improve the functionality and
            performance of our Services.
          </p>
          <p>
            To prevent fraud, protect our legal rights, and comply with
            applicable laws and regulations.
          </p>

          <h4>Information Sharing</h4>

          <p>
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share your information in the following
            circumstances:
          </p>

          <p>
            With service providers who assist us in providing and maintaining
            our Services, subject to confidentiality obligations.
          </p>
          <p>
            When required by law or in response to a valid legal request, such
            as a court order or subpoena. With your consent or at your
            divection.
          </p>
          <h4>Data Security</h4>

          <p>
            We take reasonable measures to protect the security of your personal
            information and prevent unauthorized access, disclosure, alteration,
            or destruction. However, no method of transmission over the internet
            or electronic storage is 100% secure, and we cannot guarantee
            absolute security.
          </p>

          <h2>Changes to this Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We will notify you
            of any material changes by posting the new Privacy Policy on this
            page.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions or concerns about this Privacy Policy or
            our practices, you may contact us at
          </p>
          [contact email address].

          <p>This Privacy Policy was last updated on [insert date].</p>
        </div>
      </ScrollArea>
      <DialogFooter class="p-6 pt-0 text-center sm:justify-center">
        <form @submit.prevent="sumbitAggrement">
          <Label class="flex items-center justify-center gap-2 text-xl">
            <Input
              @change="aggred = !aggred"
              type="checkbox"
              name=""
              id=""
              class="size-4 border-primary"
            />
            <span> I have read and agree. </span>
          </Label>
          <br />
          <DialogClose>
            <span class="sr-only">Close</span>
            <Button v-if="aggred == true" class="px-12" type="submit">
              Save now
            </Button>
          </DialogClose>
        </form>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  <section class="pt-20 bg-stone-50">
    <h2 class="text-3xl font-semibold text-center">Our CV templates</h2>
    <p class="text-center">Choose from our professional models</p>
    <div class="container py-10 md:py-20">
      <div class="mb-2">
        <Button @click="checkImage = true" size="sm">with image</Button>
        <Button @click="checkImage = false" class="mx-2"variant="outline" size="sm">without image</Button>
      </div>
      <div
        v-if="data && checkImage"
        class="grid gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-10"
      >
        <Dialog v-for="template in data?.templates" href="/">
          <DialogTrigger as-child>
            <div
              variant="outline"
              class="transition-shadow duration-300 bg-white shadow-md cursor-pointer shadow-black/20 rounded-2xl overflow-clip hover:shadow-black/40 hover:shadow-2xl"
            >
              <DialogContent
                class="sm:max-w-[425px] lg:max-w-4xl grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[80dvh]"
              >
                <div
                  class="flex flex-col gap-4 px-6 py-4 overflow-y-auto lg:grid md:grid-cols-2"
                >
                  <div class="col-span-1">
                    <div class="aspect-[210/297]">
                      <nuxt-img
                        :src="'https://' + template.templateImagePath"
                        class="w-full h-full object-content"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col justify-between p-8">
                    <div>
                      <h2
                        class="mb-4 text-3xl font-bold capitalize text-secondary"
                      >
                        {{ template.name }}
                      </h2>
                      <p class="mb-2" v-html="template.description"></p>
                    </div>
                    <div class="flex justify-end gap-4 mt-3">
                     
                      <nuxt-link
                        class="flex-1"
                        :to="{
                          name: `app-cv-builder-step-id`,
                          params: { id: 1 },
                          query: { template_id: template.templateId },
                        }"
                      >
                        <Button type="submit" class="w-full">
                          Use this template
                        </Button>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </DialogContent>
              <nuxt-img
                :src="'https://' + template.templateImagePath"
                style=""
                class="w-full m-auto"
              />
              <div class="h-full p-6 bg-stone-50">
                <h2
                  class="mb-2 text-xl font-semibold capitalize text-secondary"
                >
                  {{ template.name }}
                </h2>
                <p class="text-sm line-clamp-3">{{ template.description }}</p>
              </div>
            </div>
          </DialogTrigger>
        </Dialog>
      </div>
      <div
        v-else-if="error"
        class="container flex py-4 text-2xl font-semibold text-center align-middle min-h-96"
      >
        No data yet
      </div>
      <div v-else>
        <h3 class="text-2xl font-semibold">Is loading</h3>
        <div class="grid gap-4 px-6 py-4 overflow-y-auto md:grid-cols-4">
          <div
            v-for="i of 4"
            :key="i"
            class="col-span-1 transition-all card is-loading h-96 hover:shadow-lg"
          >
            <div class="content"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 5px;
}
.card .content {
  padding: 20px 30px;
  height: 100%;
}
.card.is-loading .content {
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
