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

  if (
    titleExperience &&
    companyExperience &&
    startDateExperience &&
    endDateExperience &&
    experienceExperience
  ) {
    const jobTitle = (titleExperience as HTMLInputElement).value;
    const company = (companyExperience as HTMLInputElement).value;
    const startDate = (startDateExperience as HTMLInputElement).value;
    const endDate = (endDateExperience as HTMLInputElement).value;
    const professionalTasksPerformed = tasks.value;

    emit("submit", {
      jobTitle: jobTitle,
      company: company,
      startDate: startDate,
      endDate: endDate,
      professionalTasksPerformed: professionalTasksPerformed,
    });
    (titleExperience as HTMLInputElement).value = "";
    (companyExperience as HTMLInputElement).value = "";
    (startDateExperience as HTMLInputElement).value = "";
    (endDateExperience as HTMLInputElement).value = "";
    (experienceExperience as HTMLInputElement).value = "";
  }
  tasks.value = []; 
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

const tasks = ref<string[]>([]);
const indexToEdited = ref<number>(0);
const isedited = ref(false);
const task = ref("");
const addTask = () => {
  let tab: string[] = [];
  tab = tasks.value;
  if (isedited.value) {
    tab[indexToEdited.value] = task.value;
    tasks.value = tab;
    task.value = "";
    isedited.value = false;
  } else {
    tab.push(task.value);
    tasks.value = tab;
    task.value = "";
  }
};
const getItem = (item: string, index: number) => {
  isedited.value = true;
  task.value = item;
  indexToEdited.value = index;
};
</script>

<template>
  <form @submit="onSubmit">
    <div class="w-full p-2 space-y-6 border-l-2 border-secondary/50">
      <div class="gap-6 md:grid md:grid-cols-2 md:space-y-0">
        <FormField name="company">
          <FormItem>
            <FormLabel class="">job Title</FormLabel>
            <FormControl>
              <Input
                id="titleExperienceEdit"
                type="text"
                placeholder="Accountant"
                required
                class="first-letter:uppercase"
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
                class="first-letter:uppercase"
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
                class="first-letter:uppercase"
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
                class="first-letter:uppercase"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <FormField name="experienceExperienceEdit" class="col-span-2">
          <FormItem class="col-span-2">
            <FormLabel>Tasks performed</FormLabel>
            <FormControl>
              <ul
                id="experienceExperienceEdit"
                class="w-full h-20 overflow-y-auto col-span-2 min-h-20 bg-gray-50 p-2 border border-black"
              >
                <li
                  v-for="(tache, index) in tasks"
                  @click="getItem(tache, index)"
                  :key="index"
                >
                  {{ tache }}
                </li>
              </ul>

              <Input
                placeholder="Add task"
                type="text"
                v-model="task"
                class="first-letter:uppercase"
              />
              <Button
                @click="addTask"
                type="button"
                size="sm"
                variant="ghost"
                class="w-fit border text-xs space-x-3"
              >
                {{!isedited   ? 'Add task' : 'Edit task'}}
              </Button>
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </div>
      <div>
        <Button type="submit" class="w-fit px-2">
          <Plus :size="15" /> <span>Add</span>
        </Button>
      </div>
    </div>
  </form>
</template>
