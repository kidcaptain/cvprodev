<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Languages, Menu, ChevronDown } from "lucide-vue-next";
import { FooterLink, HeaderLink } from "@/assets/content/FooterLink";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-vue-next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ArrowLeft,
  Cable,
  ClipboardList,
  View,
  NotebookPen,
} from "lucide-vue-next";
import { computed } from "vue";
import { useRoute as useNativeRoute } from "vue-router"; // par ce que le useRoute de Nuxt ne s'actualise pas dans les Layout
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const route = useNativeRoute();


const template_id = route.query?.template_id;

if (!template_id) {
  navigateTo("/templates");
}

const steps = [
  {
    id: 1,
    title: "Personal Information",
    icon: NotebookPen,
  },
  {
    id: 2,
    title: "professionnal...",
    icon: ClipboardList,
  },
  {
    id: 3,
    title: "language...",
    icon: Languages,
  },
];
const current_state = computed(() => route.params.id);
const { user, signOut } = useAuth();

const socials = [
  {
    title: "X",
    url: "",
    img: "img/icons/socials/x.png",
  },
  {
    title: "Tiktok",
    url: "",
    img: "img/icons/socials/tiktok.png",
  },
  {
    title: "Instagram",
    url: "",
    img: "img/icons/socials/insta.png",
  },
  {
    title: "Facebook",
    url: "",
    img: "img/icons/socials/facebook.png",
  },
  {
    title: "LinkedIn",
    url: "",
    img: "img/icons/socials/linkedin.png",
  },
];

onMounted(() => {
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (header) {
      if (currentScroll > 50) {
        header.classList.add("shadow-md");
      } else {
        header.classList.remove("shadow-md");
      }
      if (currentScroll > 50) {
        header.classList.add("sticky");
        header.classList.add("bg-white");
        header.classList.remove("bg-background");
      } else {
        header.classList.remove("sticky");
        header.classList.add("bg-background");
        header.classList.remove("bg-white");
      }
    }
  });
});

</script>
<style scoped>
.quicklink {
  position: relative;
  margin-bottom: 10px;
}
.quicklink::after {
  content: "";
  position: absolute;
  bottom: -10px;
  width: 30%;
  height: 10px;
  background-color: #7a551049;
  left: 0;
  border-radius: 20px;
}
</style>
<template>
  <header class="top-0 z-40 shadow-md header">
    <div class="container mx-auto max-w-screen-2xl xl:p-0">
      <header class="flex items-center justify-between py-3">
        <div class="flex items-center flex-1 gap-6">
          <nuxt-link :to="'/'" class="logo">
            <img
              class="size-12 md:size-16"
              src="@/assets/img/logo-white-theme.svg"
              alt=""
              srcset=""
            />
          </nuxt-link>
          <div class="hidden menu md:flex">
            <ul class="flex items-center gap-6 font-semibold capitalize">
              <li v-for="link in HeaderLink">
                <nuxt-link :to="link.to" class="text-sm hover:text-secondary">
                  {{ link.text }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center gap-5 md:flex-row-reverse">
          <template v-if="user">
            <nuxt-link to="/auth/register" class="hidden md:inline-block">
            </nuxt-link>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="link"
                  class="!p-0 !text-start !no-underline text-forground"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="bg-gray-200 rounded-full size-12 max-sm:size-6"
                    ></div>
                    <div>
                      <h4 class="font-semibold">{{ user.name }}</h4>
                      <h6 class="text-xs font-light max-sm:hidden">
                        {{ user.email }}
                      </h6>
                    </div>
                    <ChevronDown />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56 border-gray-200">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <nuxt-link to="/app/" class="flex items-center">
                      <User class="w-4 h-4 mr-2" />
                      <span>Dashboard</span>
                    </nuxt-link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <nuxt-link to="/app/profile" class="flex items-center">
                      <User class="w-4 h-4 mr-2" />
                      <span>Profile</span>
                    </nuxt-link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <nuxt-link to="/app/cv/" class="flex items-center">
                      <Users class="w-4 h-4 mr-2" />
                      <span>My CV</span>
                    </nuxt-link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <nuxt-link to="/" class="flex items-center">
                      <Settings class="w-4 h-4 mr-2" />
                      <span>Support</span>
                    </nuxt-link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="cursor-pointer" @click="signOut">
                  <LogOut class="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <!-- <nuxt-link to="/pricing" class="hidden md:inline-block">
              <Button variant="ternary" class="">Upgrade</Button>
            </nuxt-link> -->
          </template>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="link"
                class="!p-0 !text-start !no-underline text-forground"
              >
                <Languages class="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56 border-gray-200">
              <DropdownMenuLabel>Languages</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>French</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>English</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <template v-if="!user">
            <nuxt-link to="/auth/register" class="hidden md:inline-block">
              <Button class="">Create account</Button>
            </nuxt-link>
            <nuxt-link to="/auth/login">
              <Button class="" variant="outline" to="/login">Log In </Button>
            </nuxt-link>
          </template>
          <Drawer>
            <DrawerTrigger>
              <Menu class="md:hidden" />
            </DrawerTrigger>
            <DrawerContent class="min-h-[calc(50dvh)]">
              <DrawerHeader
                class="items-center gap-10 pt-10 font-semibold capitalize"
              >
                <DrawerClose>
                  <DrawerTitle class="flex flex-col gap-3">
                    <NuxtLink to="/"
                      ><Button class="w-full border-none bg-primary/90"
                        >Home</Button
                      ></NuxtLink
                    >
                    <NuxtLink to="/templates"
                      ><Button class="w-full border-none bg-primary/90"
                        >Create CV</Button
                      ></NuxtLink
                    >

                    /*
                    <NuxtLink to="/pricing"
                      ><Button class="w-full border-none bg-primary/90"
                        >Pricing</Button
                      ></NuxtLink
                    >
                    */

                    <NuxtLink to="/about-us"
                      ><Button class="w-full border-none bg-primary/90"
                        >About Us</Button
                      ></NuxtLink
                    >
                  </DrawerTitle>
                </DrawerClose>
              </DrawerHeader>

              <DrawerFooter> </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </header>
    </div>
  </header>
  <div class="flex flex-col text-white min-h- overflow-">
    <header class="sticky top-0 z-10 p-3 md:p-0 bg-gradient-to-l bg-background">
      <div class="w-full mx-auto max-w-screen-2xl">
        <header class="relative items-center pt-4">
          <ScrollArea
            class="relative max-w-3xl p-3 mx-auto bg-white shadow-lg md:p-8 rounded-xl"
          >
            <Button
              variant="outline"
              size="sm"
              @click="$router.back()"
              class="mb-4 space-x-2 bg-white rounded-full shadow-sm border-stone-100 shadow-primary/20 hover:text-white hover:bg-primary"
            >
              <ArrowLeft />
              <!-- <span class="font-thin">Back</span> -->
            </Button>
           
            <div class="flex items-start justify-between w-full gap-3">
              <template v-for="step in steps">
                <nuxt-link
                  :to="
                    parseInt(current_state.toString()) < step.id
                      ? false
                      : {
                          name: `app-cv-builder-step-id`,
                          params: { id: step.id },
                          query: { template_id: template_id },
                        }
                  "
                  class="flex flex-col items-center group"
                  :class="`
                                            ${
                                              parseInt(
                                                current_state.toString()
                                              ) == step.id
                                                ? 'text-secondary'
                                                : 'text-gray-400'
                                            }
                                            ${
                                              parseInt(
                                                current_state.toString()
                                              ) > step.id
                                                ? '!text-primary'
                                                : ''
                                            }
                                        `"
                >
                  <div
                    class="p-1 transition-transform duration-200 border rounded-full md:size-20 size-14 group-hover:scale-105"
                    :class="`
                                            ${
                                              parseInt(
                                                current_state.toString()
                                              ) == step.id
                                                ? 'border-secondary'
                                                : 'border-gray-200'
                                            }
                                            ${
                                              parseInt(
                                                current_state.toString()
                                              ) > step.id
                                                ? '!border-primary'
                                                : ''
                                            }
                                        `"
                  >
                    <div
                      class="grid w-full h-full p-3 border rounded-full place-content-center"
                      :class="`
                                            ${
                                              parseInt(
                                                current_state.toString()
                                              ) == step.id
                                                ? 'bg-secondary border-secondary text-white'
                                                : 'bg-transparent border-gray-200'
                                            }
                                            ${
                                              parseInt(
                                                current_state.toString()
                                              ) > step.id
                                                ? '!bg-primary !border-primary text-white'
                                                : ''
                                            }
                                        `"
                    >
                      <component :is="step.icon" />
                    </div>
                  </div>
                  <div class="mt-2 text-center">
                    <h4 class="text-xs font-semibold uppercase md:text-lg">
                      Step {{ step.id }}
                    </h4>
                    <p class="text-sm capitalize md:text-sm">
                      {{ step.title }}
                    </p>
                  </div>
                </nuxt-link>
                <div
                  class="flex-1 h-1.5 mt-9 rounded-full bg-gray-200"
                  :class="`${
                    parseInt(current_state.toString()) > step.id
                      ? '!bg-primary'
                      : ''
                  }`"
                  v-if="step.id != steps.length"
                >
                  <div
                    class="h-full rounded-full bg-secondary"
                    :class="`${
                      parseInt(current_state.toString()) == step.id
                        ? 'w-1/2'
                        : 'w-0'
                    }`"
                  ></div>
                </div>
              </template>
              <ScrollBar orientation="horizontal" />
            </div>
          </ScrollArea>
        </header>
      </div>
    </header>
    <main class="bg-background">
      <div class="container py-5">
        <div
          class="max-w-3xl p-3 mx-auto bg-white shadow-lg md:p-8 rounded-xl text-foreground"
        >
          <slot></slot>
        </div>
      </div>
    </main>
  </div>
</template>
