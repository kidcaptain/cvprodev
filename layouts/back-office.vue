<script setup>
import { LogOut, Cog, LayoutDashboard, Mails, FileText, PlusCircle } from 'lucide-vue-next'
import { ScrollArea } from '@/components/ui/scroll-area'

const { user, signOut } = useAuth()
const openModal = () => {
    alert('bonjour ca marche !')
}
const menu = ref([
    {
        text: "Tableau de bord",
        icon: LayoutDashboard,
        route: 'app'
    },
    {
        text: "CV",
        icon: FileText,
        route: 'app-cv'
    },
    {
        text: "Lettres de motivations",
        icon: Mails,
        route: 'app-letter'
    }
])

const userOptions = ref([
    {
        text: "Nouveau",
        icon: PlusCircle,
        func: openModal
    },
    {
        text: "Profil",
        icon: Cog,
    },
    {
        text: "Déconnexion", // cacher si le suer est pas connecté : et changer le layout du login
        icon: LogOut,
        func: signOut
    }
])
</script>

<template>
    <div class=" h-dvh w-dvw flex items-stretch">
        <div id="main-menu"
            class="text-white w-20 group hover:w-64 min-w-20 max-w-96 transition-all duration-300 border-r py-3 flex flex-col justify-between bg-[#642A37]">
            <div class="space-y-12 ">
                <div class="px-3 flex items-center w-full justify-between">
                    <nuxt-link to="/" class="block" >
                        <img class="size-16" src="@/assets/img/logo-dark-theme.svg" alt="" srcset="">
                    </nuxt-link>
                    <nuxt-link class="block size-0 overflow-clip group-hover:size-auto delay-200" to="/app/cv/create">
                        <PlusCircle></PlusCircle>
                    </nuxt-link>
                    </div>
                <div class="space-y-3">
                    <template v-for="link in menu">
                        <nuxt-link :to="{ name: link.route }"
                            class="flex justify-center gap-4 items-center h-fit px-3 py-2 group-hover:justify-start hover:bg-secondary ">
                            <component :is="link.icon" class="size-6 delay-75 duration-300" />
                            <div class="line-clamp-1 size-0 overflow-clip group-hover:size-auto delay-200">
                                <span> {{ link.text }}</span>
                            </div>
                        </nuxt-link>
                    </template>
                </div>
            </div>
            <div class="space-y-4">
                <template v-for="link in userOptions">
                    <nuxt-link :to="link.route ? { name: link.route } : null" @click="link.func ? link.func() : null"
                        class="flex justify-center gap-4 items-center h-fit px-3 py-2 group-hover:justify-start hover:bg-secondary cursor-pointer">
                        <component :is="link.icon" class="size-6 delay-75 duration-300" />
                        <div class="line-clamp-1 size-0 overflow-clip group-hover:size-auto delay-200">
                            <span> {{ link.text }}</span>
                        </div>
                    </nuxt-link>
                </template>
            </div>
        </div>

        <ScrollArea id="page-content" class="flex-1 bg-gray-100 overflow-clip">
            <div class="max-w-7xl mx-auto p-0 flex px-3 flex-col h-full ">
                <!-- <LayoutHeader class="" />    -->
                <div class="pt-6 flex-1 ">
                    <slot></slot>
                </div>
            </div>
        </ScrollArea>
    </div>
</template>