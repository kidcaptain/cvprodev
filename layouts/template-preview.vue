<script setup>
import { User } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

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
</script>

<template>
  <header class="sticky top-0 z-10 bg-white  no-printme">
    <div class="container mx-auto max-w-screen-2xl xl:p-0">
      <header class="flex items-center justify-between py-3">
        <div class="flex items-center gap-6">
          <nuxt-link :to="'/'" class="logo">
            <img
              class="size-12 md:ize-16"
              src="@/assets/img/logo-white-theme.svg"
              alt=""
              srcset=""
            />
          </nuxt-link>
          <div class="hidden menu md:flex">
            <nuxt-link to="/templates">
              <Button class="" @click="$router.back()" variant="outline" to="/templates">Back </Button>
            </nuxt-link>
          </div>
        </div>
        <h2 class="text-xl max-md:hidden font-bold">Preview</h2>
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
                    <div class="bg-gray-200 rounded-full size-12 max-md:size-8"></div>
                    <div>
                      <h4 class="max-md:font-light font-semibold">{{ user.name }}</h4>
                      <h6 class="text-xs font-light max-sm:hidden">{{ user.email }}</h6>
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

          <template v-if="!user">
            <nuxt-link to="/auth/login">
              <Button
                class="font-bold text-black bg-yellow-500 border-yellow-500 hover:bg-white hover:text-yellow-500 hover:border-yellow-500"
                variant="outline"
                to="/login"
                >Upgrade</Button
              >
            </nuxt-link>
          </template>
        </div>
      </header>
    </div>
  </header>
  <div class="min-h-dvh bg-background ">
    <slot></slot>
  </div>
</template>
