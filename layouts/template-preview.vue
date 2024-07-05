<script setup>
import { Mail, Cloud, User } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
const tools = ''

const addons = [
    {
        text: "Preferences"
    },
    {
        text: "Apps installer"
    }
]
</script>

<template>
    <div class=" min-h-dvh container bg-white">
        <slot></slot>
    </div>
</template>