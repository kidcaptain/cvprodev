<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";
interface ItemExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
}
const emit = defineEmits(["submit"]);
const props = defineProps<{ experience: ItemExperience }>();

const onSubmit = () => {
  const titleExperience = document.getElementById("titleExperienceEdit");
  const companyExperience = document.getElementById("companyExperienceEdit");
  const startDateExperience = document.getElementById(
    "startDateExperienceEdit"
  );
  const endDateExperience = document.getElementById("endDateExperienceEdit");
  const experienceExperience = document.getElementById(
    "experienceExperienceEdit"
  );

  emit("submit", {
    jobTitle: titleExperience,
    company: companyExperience,
    period: startDateExperience + "-" + endDateExperience,
    professionalTasksPerformed: experienceExperience,
  });
  if (
    titleExperience &&
    companyExperience &&
    startDateExperience &&
    endDateExperience &&
    experienceExperience
  ) {
    (titleExperience as HTMLInputElement).value = "";
    (companyExperience as HTMLInputElement).value = "";
    (startDateExperience as HTMLInputElement).value = "";
    (endDateExperience as HTMLInputElement).value = "";
    (experienceExperience as HTMLInputElement).value = "";
  }
  // values.start_date = "";
  // values.end_date = "";
  // values.experience = "";
};

const experience_fields = [
  {
    name: "title",
    label: "Job Title",
    placeholder: "Accountant",
    type: "text",
    id: "titleExperience",
    require: true,
  },
  {
    name: "company",
    label: "Company Name",
    placeholder: "Exco cmr",
    id: "companyExperience",
    require: true,
  },
  {
    name: "start_date",
    label: "Starting Date",
    type: "month",
    require: true,
    id: "startDateExperience",
  },
  {
    name: "end_date",
    label: "Ending Date",
    type: "month",
    require: true,
    id: "endDateExperience",
  },
  {
    name: "experience",
    label: "Tasks & Job description",
    type: "textarea",
    class: "col-span-2",
    require: true,
    id: "experienceExperience",
  },
];
</script>

<template></template>
