<script setup lang="ts">
import { LayoutDashboard, Mails, FileText, PlusCircle } from "lucide-vue-next";
const BASE_URL = useRuntimeConfig().public.backendAPI;

const { user, session } = useAuth();
definePageMeta({
  middleware: "auth", //
});



const router = useRouter();

const stats = ref([
  {
    text: "CV Créés",
    stat: 27,
    icon: FileText,
    route: "app-cv",
  },
  {
    stat: 27,
    text: "Lettres de motivations",
    icon: Mails,
    route: "app-letter",
  },
  {
    text: "Fichiers récupérés",
    stat: 27,
    icon: LayoutDashboard,
    route: "app",
  },
]);


</script>


<template>
  
</template>