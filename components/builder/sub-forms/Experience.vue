<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";

const emit = defineEmits(["submit"]);

const onSubmit = (e: Event) => {
  e.preventDefault();
  const titleExperience = document.getElementById("titleExperienceEdit");
  const companyExperience = document.getElementById("companyExperienceEdit");
  const startDateExperience = document.getElementById(
    "startDateExperienceEdit"
  );
  const endDateExperience = document.getElementById("endDateExperienceEdit");
  const experienceExperience = document.getElementById(
    "experienceExperienceEdit"
  );


  const jobTitle = titleExperience.value;
  const company = companyExperience.value;
  const startDate = startDateExperience.value;
  const endDate = endDateExperience.value;
  const professionalTasksPerformed = experienceExperience.value;

  emit("submit", {
    jobTitle: jobTitle,
    company: company,
    startDate: startDate,
    endDate: endDate,
    professionalTasksPerformed: professionalTasksPerformed,
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

<template>
  <form @submit="onSubmit">
    <div class="w-full p-2 space-y-6 border-l-2 border-secondary/50">
      <div class="gap-6 md:grid md:grid-cols-2 md:space-y-0">
        <FormField name="company">
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input
                id="titleExperienceEdit"
                type="text"
                placeholder="Accountant"
                required
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <FormField name="company">
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input
                id="companyExperienceEdit"
                type="text"
                name="companyExperienceEdit"
                placeholder="Exco cmr"
                required
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <FormField name="startDateExperienceEdit">
          <FormItem>
            <FormLabel>Starting Date</FormLabel>
            <FormControl>
              <Input
                id="startDateExperienceEdit"
                required
                name="startDateExperienceEdit"
                type="month"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <FormField name="endDateExperienceEdit">
          <FormItem>
            <FormLabel>Ending Date</FormLabel>
            <FormControl>
              <Input
                id="endDateExperienceEdit"
                required
                name="endDateExperienceEdit"
                type="month"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <FormField name="experienceExperienceEdit" class="col-span-2">
          <FormItem class="col-span-2">
            <FormLabel>Tasks & Job description</FormLabel>
            <FormControl>
              <textarea
                class="w-full col-span-2 p-2 border border-black focus-within:bg-slate-100 focus-within:outline-none focus:outline-none"
                id="experienceExperienceEdit"
                name="experienceExperienceEdit"
              ></textarea>
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </div>
      <div>
        <Button type="submit" class="px-6 space-x-3">
          <Plus /> <span>Add</span>
        </Button>
      </div>
    </div>
  </form>
</template>
