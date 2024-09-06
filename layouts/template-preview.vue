<script setup>
import { User } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { FooterLink, HeaderLink } from "@/assets/content/FooterLink";
const { user, signOut } = useAuth()

// const router = useRouter()

// const addons = [
//   {
//     text: "Preferences",
//   },
//   {
//     text: "Apps installer",
//   },
// ];
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
  <div class="min-h-dvh bg-background ">
    <slot></slot>
  </div>
</template>
