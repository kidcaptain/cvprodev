<script setup lang="ts">
import { LayoutDashboard, Mails, FileText, PlusCircle } from 'lucide-vue-next'

const { user, signOut } = useAuth()
definePageMeta({
    middleware: "auth" // 
})
const stats = ref([

    {
        text: "CV Créés",
        stat: 27,
        icon: FileText,
        route: 'app-cv'
    },
    {
        stat: 27,
        text: "Lettres de motivations",
        icon: Mails,
        route: 'app-letter'
    },
    {
        text: "Fichiers récupérés",
        stat: 27,
        icon: LayoutDashboard,
        route: 'app'
    }
])
</script>

<template>
    <div class="container py-20">
        <div class="flex gap-6">
            <div class="size-24 bg-background rounded-full border border-secondary"></div>
            <div>
                <h1 class="text-4xl font-semibold">Welcome back, <span class="text-secondary">{{ user.name }}</span> !</h1>
                <p class="mt-3">W've missed you a lot !</p>
                <p class="">let us continue where we had stoped!</p>
            </div>
        </div>
    </div>
    <div class="container bg-background py-9 mb-3 rounded-3xl">
        <div class="flex items-center justify-between">
            <h2 class="text-3xl">Your documents</h2>
            <nuxt-link to="/pricing" class="hidden md:inline-block">
                <Button class="">Create new </Button>
            </nuxt-link>
        </div>
        <div class="py-12 grid gap-10 grid-cols-3" >
            <div class="aspect-[210/297] bg-primary rounded-3xl" v-for="i in 5"></div>
        </div>
    </div>
    <div v-if="false" class="h-full mb-12 pt-8 flex flex-col gap-12">
        <div class="grid grid-cols-4 gap-6">
            <nuxt-link :to="{ name: info.route }"
                class="border shadow h-fit p-5 pt-4 rounded text-muted-foreground bg-muted relative group overflow-clip hover:bg-muted/30 duration-300"
                v-for="info in stats">
                <h2><span class="text-6xl font-bold align-middle group-hover:text-secondary duration-300">{{ info.stat
                        }}</span></h2>
                <span class="text-sm">{{ info.text }}</span>
                <div
                    class="absolute right-0 top-0 h-full aspect-square bg-primary grid place-content-center p-6 group-hover:bg-secondary rotate-45 scale-75 rounded-xl group-hover:scale-95 duration-300">
                    <component :is="info.icon"
                        class=" text-white size-8 group-hover:scale-150 group-hover:-rotate-45 transition-transform delay-200 duration-300" />
                </div>
            </nuxt-link>
            <div class="text-center group border-dashed border p-2 grid place-content-center cursor-pointer">
                <div class="flex gap-3 items-center">
                    <PlusCircle
                        class="size-8 group-hover:scale-[200%] group-hover:text-secondary transition-[height, width] duration-300 delay-100" />
                    <div class="group-hover:w-0 group-hover:overflow-clip duration-300 transition-transform"> Nouvelle
                        création</div>
                </div>
            </div>
        </div>

        <template v-for="j in 2">
            <div class="">
                <div class="flex justify-between font-semibold mb-24">
                    <h2 class="text-4xl" v-if="j != 2">Curiculum Vitae</h2>
                    <h2 class="text-4xl" v-if="j == 2">Lettres de motivation</h2>
                    <div>s</div>
                </div>
                <div class="grid grid-cols-5 gap-10 mt-5">
                    <div class="p-6 ">
                        <div
                            class="text-center aspect-[210/297] border-dashed border p-2 grid place-content-center cursor-pointer">
                            <div>
                                <div class="text-6xl">+</div>
                                <div>Nouveau CV</div>
                            </div>
                        </div>
                    </div>
                    <div v-for="i in 4" class="p-4 group ">
                        <div
                            class="p-2 bg-primary aspect-[210/297] border relative  cursor-pointer border-r-0 rounded-[2px]">
                            <div class="
                                    h-full w-1/3 bg-primary absolute -top-12 -left-1 rounded-bl-lg -skew-y-[60deg] 
                                    shadow rounded grid place-content-center border border-r-0 
                                    group-hover:-skew-y-[90deg] transition-transform duration-300

                                    
                                    ">
                                <h3 class="text-white font-semibold font-serif text-3xl ">CV</h3>
                            </div>
                            <div class="h-full bg-white ">
                                sdfsd
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="j != 2" class="border opacity-20"></div>
        </template>

    </div>
</template>