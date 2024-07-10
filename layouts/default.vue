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
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
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
    if (header) {
      if (header.clientTop !== 0) {
        header.classList.add("shadow-md");
      } else {
        header.classList.remove("shadow-md");
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
  <header class="sticky top-0 z-50 bg-white shadow-md header bg-background">
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
                <nuxt-link :to="link.to" class="hover:text-secondary">
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
            <nuxt-link to="/pricing" class="hidden md:inline-block">
              <Button variant="ternary" class="">Upgrade</Button>
            </nuxt-link>
          </template>
          <Languages class="" />
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
                      ><Button class="w-full bg-primary/90 border-none"
                        >Home</Button
                      ></NuxtLink
                    >
                    <NuxtLink to="/templates"
                      ><Button class="w-full bg-primary/90 border-none"
                        >Create CV</Button
                      ></NuxtLink
                    >

                    <NuxtLink to="/pricing"
                      ><Button class="w-full bg-primary/90 border-none"
                        >Pricing</Button
                      ></NuxtLink
                    >

                    <NuxtLink to="/about-us"
                      ><Button class="w-full bg-primary/90 border-none"
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
  <main class="py-20">
    <slot></slot>
  </main>
  <footer class="relative bg-[#E7C531]">
    <div class="bg-white ">
      <nuxtImg
        src="img/shapes/prefooter.png"
        alt=""
        class="w-full"
        rcset=""
      />
    </div>
    <div
      class="container relative mx-auto my-auto text-center place-content-center md:text-start md:grid"
    >
      <div class="py-5">
        <nuxtImg
          class="w-[80px] mx-auto md:mx-0"
          src="img/logo-dark-theme.svg"
          alt=""
          srcset=""
        />
        <p class="p-4 text-xl font-semibold text-black/50">
          CV Pro includes a robust Translation Module designed to enhance
          accessibility and global reach for our users. This feature allows
          seamless translation of CV content between English and French,
          catering to diverse linguistic preferences and facilitating broader
          career opportunities
        </p>
      </div>

      <div class="grid py-6 font-semibold capitalize gap-9 md:grid-cols-5">
        <ul v-for="link in FooterLink">
          <li class="mb-3 text-3xl font-bold">{{ link.title }}</li>
          <li v-for="item in link.data" class="pl-5 my-2">
            <nuxt-link :to="item.to" class="hover:text-secondary">
              {{ item.text }}
            </nuxt-link>
          </li>
        </ul>
        <div>
          <img src="assets/img/logo-footer.png" alt="" />
        </div>
      </div>
      <div class="my-5 p-0.5 rounded-full bg-[#1E1E1E]"></div>
      <div class="flex flex-wrap gap-6 md:gap-20 place-content-center">
        <nuxt-link v-for="img in socials" :href="img.url" :title="img.title">
          <nuxt-img class="size-10" :src="img.img" :alt="img.title" />
        </nuxt-link>
      </div>
      <div>
        <img
          class=""
          src="@/assets/img/shapes/footer-footer.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
  </footer>
</template>
