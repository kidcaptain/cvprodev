<script setup>
    import { Sun, Moon } from 'lucide-vue-next'
    const toggleTheme = () => {
        useColorMode().preference = useColorMode().value  == 'dark' ? 'light' : 'dark'
    }
</script>

<template>
    <label class="" tabindex="0">
        <input type="checkbox" class="hidden" @change="toggleTheme">
        <span class="cursor-pointer flex justify-between p-1 border rounded-full border-primary text-primary hover:scale-105 transition-all duration-300">
            <Sun class="transition-all duration-300" :class="$colorMode.value == 'light' ? 'order-first': ' opacity-30'" />
            <Moon class="transition-all duration-300" :class="$colorMode.value != 'light' ? 'order-first': 'opacity-30'" />
        </span>
    </label>
</template>

<style scoped>
    span {
        svg {
            @apply size-6
        }
    }
</style>