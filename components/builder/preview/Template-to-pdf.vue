<style>

</style>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
const { data } = await useFetch<string>("http://127.0.0.1:5500/TEMPLATE%201/style.css"); 
const props = defineProps<{html: string}>();
const div = ref()

</script>


<template>
        <div :ref="div" class="w-full opacity-0" id="fa" v-html="props.html"></div>
</template>