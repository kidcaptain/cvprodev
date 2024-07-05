<script setup lang="ts">
import { useRouter } from "vue-router";
import BuilderStep1 from "~/components/builder/Step-1.vue"
import BuilderStep2 from "~/components/builder/Step-2.vue"
import BuilderStep3 from "~/components/builder/Step-3.vue"
import BuilderStep4 from "~/components/builder/Step-4.vue"
import BuilderStep5 from "~/components/builder/Step-5.vue"

definePageMeta({
    layout: 'builder',
})

const route = useRoute()
const id = Number(route.params.id);
const template = Number(route.query.template_id)
const router = useRouter()

console.log('le routeur : ', router)

const resolveComponent = () => {
    if ( id == 1) return BuilderStep1;
    if ( id == 2) return BuilderStep2;
    if ( id == 3) return BuilderStep3;
    if ( id == 4) return BuilderStep4;
    if ( id == 5) return BuilderStep5;
}
const formSubmission = () => {
    console.log('ok ok ca marche !')
    // quelques traitements si nécéssaires. 

    // redirection à l'étape suivante s'il y en a: 
    router.push({ params: { id: id + 1 }, query: {template_id: template} })

}
</script>

<template>
    <component :is="resolveComponent()" @submit="formSubmission"></component>
</template>