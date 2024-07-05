<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Languages, Menu, ChevronDown } from 'lucide-vue-next'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

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
} from 'lucide-vue-next'

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
} from '@/components/ui/dropdown-menu'

const { user, signOut } = useAuth()

const navLinks = [
    {
        text: 'Home',
        to: '/'
    },
    {
        text: 'Templates',
        to: '/templates'
    },
    {
        text: 'pricings',
        to: '/pricing'
    },
    {
        text: 'About Us',
        to: '/about-us'
    },
]

const socials = [
    {
        title: "X",
        url: "",
        img: "img/icons/socials/x.png"
    },
    {
        title: "Tiktok",
        url: "",
        img: "img/icons/socials/tiktok.png"
    },
    {
        title: "Instagram",
        url: "",
        img: "img/icons/socials/insta.png"
    },
    {
        title: "Facebook",
        url: "",
        img: "img/icons/socials/facebook.png"
    },
    {
        title: "LinkedIn",
        url: "",
        img: "img/icons/socials/linkedin.png"
    },
]
</script>

<template>
    <header class=" bg-background z-10 sticky top-0 ">
        <div class="container max-w-screen-2xl mx-auto xl:p-0">
            <header class="flex justify-between items-center py-3">
                <div class="flex-1 flex gap-6 items-center">
                    <nuxt-link :to="'/'" class="logo">
                        <img class="size-12 md:ize-16" src="@/assets/img/logo-white-theme.svg" alt="" srcset="">
                    </nuxt-link>
                    <div class="menu hidden md:flex ">
                        <ul class="flex items-center gap-6 capitalize font-semibold">
                            <li v-for="link in navLinks">
                                <nuxt-link :to="link.to" class="hover:text-secondary"> {{ link.text }} </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="gap-5 items-center flex md:flex-row-reverse">
                    <template v-if="user">
                        <nuxt-link to="/auth/register" class="hidden md:inline-block">
                        </nuxt-link>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="link" class="!p-0 !text-start !no-underline text-forground">
                                    <div class="flex gap-2 items-center">
                                        <div class="size-12 bg-gray-200 rounded-full"></div>
                                        <div>
                                            <h4 class="font-semibold">{{ user.name }}</h4>
                                            <h6 class="text-xs font-light">{{ user.email }}</h6>
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
                                            <User class="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </nuxt-link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <nuxt-link to="/app/profile" class="flex items-center">
                                            <User class="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </nuxt-link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <nuxt-link to="/app/cv/" class="flex items-center">
                                            <Users class="mr-2 h-4 w-4" />
                                            <span>My CV</span>
                                        </nuxt-link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <nuxt-link to="/" class="flex items-center">
                                            <Settings class="mr-2 h-4 w-4" />
                                            <span>Support</span>
                                        </nuxt-link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem class="cursor-pointer" @click="signOut">
                                    <LogOut class="mr-2 h-4 w-4" />
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
                            <DrawerHeader class=" items-center pt-10 gap-10 capitalize font-semibold">
                                <DrawerTitle v-for="link in navLinks">
                                    <nuxt-link :to="link.to" class="hover:text-secondary"> {{ link.text }}
                                    </nuxt-link>
                                </DrawerTitle>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button>Create CV</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </header>
        </div>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer class="relative bg-[#E7C531] ">
        <nuxtImg src="img/shapes/prefooter.png" alt="" class="w-full" rcset="" />
        <div class="relative container mx-auto place-content-center my-auto text-center md:text-start  md:grid ">
            <div class="py-5">
                <nuxtImg class="w-[120px] mx-auto md:mx-0" src="img/logo-dark-theme.svg" alt="" srcset="" />
            </div>
            <div class="capitalize gap-9 font-bold grid md:grid-cols-3 py-6 ">
                <div class="">
                    <h3 class="text-3xl mb-4"> Company</h3>
                    <p>
                        <nuxt-link href=""> about Us </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link href=""> Terms </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link href=""> Privacy Policiy </nuxt-link>
                    </p>
                </div>
                <div>
                    <h3 class="text-3xl mb-4"> Contact Us</h3>
                    <p>
                        <nuxt-link href=""> +237 690 000 000 </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link href=""> +237 690 000 000 </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link href=""> cvpro@gmail.com</nuxt-link>
                    </p>
                </div>
                <div>
                    <img src="assets/img/logo-footer.png" alt="">
                </div>
            </div>
            <div class="my-5 p-0.5 rounded-full bg-[#1E1E1E]">
            </div>
            <div class="flex flex-wrap gap-6 md:gap-20 place-content-center">
                <nuxt-link v-for="img in socials" :href="img.url" :title="img.title">
                    <nuxt-img class="size-10" :src="img.img" :alt="img.title" />
                </nuxt-link>
            </div>
            <div>
                <img class="" src="@/assets/img/shapes/footer-footer.png" alt="" srcset="">
            </div>
        </div>
    </footer>
</template>