<script setup lang="ts">
import { Button } from '@/components/ui/button'
const { user, signOut } = useAuth()
definePageMeta({
    layout: 'back-office',
})
</script>

<template>
    <div>
        list of CV
    </div>
</template>