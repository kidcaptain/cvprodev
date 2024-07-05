<script setup>
import { Bell, Languages, ScanSearch, Scale, FolderKanban } from 'lucide-vue-next'  

</script>

<template>
    <div class="w-full flex justify-between py-4 ">
        <h1 class="text-3xl font-normal flex items-center gap-2">
            <FolderKanban  class="text-primary scale-125"/>
            <span>Tableau de bord</span>
        </h1>
        <div class="flex gap-3 items-center">
            <div class="w-[4.5rem] rounded-full ">
                <PartsThemeSwitcher/>
            </div>
            <div class="size-10 p-1 rounded-full grid place-content-center border border-border">
                <Languages  class=""/>
            </div>
            <div class="size-10 p-1 rounded-full grid place-content-center border border-border ml-5">
                <Bell  class=""/>
            </div>
            <div class="size-10 p-1 rounded-full grid place-content-center border border-border">
                <Scale  class=""/>
            </div>
            <div class="size-10 p-1 rounded-full grid place-content-center border border-border ml-5">
                <ScanSearch  class=""/>
            </div>
        </div>
    </div>
</template>
