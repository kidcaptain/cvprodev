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
        text: "Déconnexion", // cacher si le suer est pas connecté : et changer le layout du login
        icon: LogOut,
        func: signOut
    }
])
</script>

<template>
    <div class="flex items-stretch  h-dvh w-dvw">
        <div id="main-menu"
            class="text-white w-20 group hover:w-64 min-w-20 max-w-96 transition-all duration-300 border-r py-3 flex flex-col justify-between bg-[#642A37]">
            <div class="space-y-12 ">
                <div class="flex items-center justify-between w-full px-3">
                    <nuxt-link to="/" class="block" >
                        <img class="size-16" src="@/assets/img/logo-dark-theme.svg" alt="" srcset="">
                    </nuxt-link>
                    <nuxt-link class="block delay-200 size-0 overflow-clip group-hover:size-auto" to="/app/cv/create">
                        <PlusCircle></PlusCircle>
                    </nuxt-link>
                    </div>
                <div class="space-y-3">
                    <template v-for="link in menu">
                        <nuxt-link :to="{ name: link.route }"
                            class="flex items-center justify-center gap-4 px-3 py-2 h-fit group-hover:justify-start hover:bg-secondary ">
                            <component :is="link.icon" class="duration-300 delay-75 size-6" />
                            <div class="delay-200 line-clamp-1 size-0 overflow-clip group-hover:size-auto">
                                <span> {{ link.text }}</span>
                            </div>
                        </nuxt-link>
                    </template>
                </div>
            </div>
            <div class="space-y-4">
                <template v-for="link in userOptions">
                    <nuxt-link :to="link.route ? { name: link.route } : null" @click="link.func ? link.func() : null"
                        class="flex items-center justify-center gap-4 px-3 py-2 cursor-pointer h-fit group-hover:justify-start hover:bg-secondary">
                        <component :is="link.icon" class="duration-300 delay-75 size-6" />
                        <div class="delay-200 line-clamp-1 size-0 overflow-clip group-hover:size-auto">
                            <span> {{ link.text }}</span>
                        </div>
                    </nuxt-link>
                </template>
            </div>
        </div>

        <ScrollArea id="page-content" class="flex-1 bg-gray-100 overflow-clip">
            <div class="flex flex-col h-full p-0 px-3 mx-auto max-w-7xl ">
                <!-- <LayoutHeader class="" />    -->
                <div class="flex-1 pt-6 ">
                    <slot></slot>
                </div>
            </div>
        </ScrollArea>
    </div>
</template>