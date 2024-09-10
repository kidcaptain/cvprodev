<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";

const emit = defineEmits(["submit"]);
const messageError = ref("");
const onSubmit = (e: Event) => {
  e.preventDefault();
  const startDateExperience = document.getElementById(
    "startDateExperienceEdit"
  );
  const endDateExperience = document.getElementById("endDateExperienceEdit");
  let date1 = new Date(`${startDateExperience.value}`);
  let date2 = new Date(`${endDateExperience.value}`);
  if (date1 < date2) {
    messageError.value = "";
    const titleExperience = document.getElementById("titleExperienceEdit");
    const companyExperience = document.getElementById("companyExperienceEdit");

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
  } else {
    messageError.value = "The start date is greater than the end date";
  }
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

const setCommand = (command: string, arg: string | undefined | null) => {
  if (arg === "html") {
    document.execCommand("formatBlock", false, arg);
  }else{
    document.execCommand(command, false);
  }
};
onMounted(() => {
  var commandButtons = document.querySelectorAll("a.command");
  for (var i = 0; i < commandButtons.length; i++) {
    commandButtons[i].addEventListener("mousedown", function (e) {
      e.preventDefault();
      var commandName = e.target.getAttribute("data-command");
      alert(commandButtons[i]);
      if (commandName === "html") {
        var commandArgument = e.target.getAttribute("data-command-argument");
        document.execCommand("formatBlock", false, commandArgument);
      } else {
        document.execCommand(commandName, false);
      }
    });
  }
});
</script>

<template>
  <form @submit="onSubmit">
    <span class="text-red-500">{{ messageError }}</span>
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
        <!-- <div class="col-span-2">
          <div class="editor-commands">
            <ul class="flex flex-wrap gap-2 rounded-xl">
              <a @mousedown="setCommande('undo')" data-command="undo"
                ><li>
                  <Button class="w-fit px-2" type="button">Undo</Button>
                </li></a
              >
              <a @mousedown="setCommande('redo')" data-command="redo"
                ><li>
                  <Button class="w-fit px-2" type="button">Redo</Button>
                </li></a
              >
              <a
                @mousedown="setCommande('insertHorizontalRule')"
                data-command="insertHorizontalRule"
                ><li>
                  <Button class="w-fit px-2" type="button">hr</Button>
                </li></a
              >
              <a @mousedown="setCommande('bold')" data-command="bold"
                ><li>
                  <Button class="w-fit font-bold px-2" type="button">B</Button>
                </li></a
              >
              <a @mousedown="setCommande('italic')" data-command="italic"
                ><li>
                  <Button class="w-fit italic px-2" type="button">I</Button>
                </li></a
              >
              <a @mousedown="setCommande('underline')" data-command="underline"
                ><li>
                  <Button class="w-fit px-2 underline" type="button">U</Button>
                </li></a
              >
              <a
                @mousedown="setCommande('strikeThrough')"
                data-command="strikeThrough"
                ><li>
                  <Button class="w-fit px-2" type="button"
                    >strikeThrough</Button
                  >
                </li></a
              >
              <a @mousedown="setCommande('justifyLeft')" data-command="justifyLeft"
                ><li>
                  <Button class="w-fit px-2" type="button">justifyLeft</Button>
                </li></a
              >
              <a
                @mousedown="setCommande('justifyCenter')"
                data-command="justifyCenter"
                ><li>
                  <Button class="w-fit px-2" type="button"
                    >justifyCenter</Button
                  >
                </li></a
              >
              <a
                @mousedown="setCommande('justifyRight')"
                data-command="justifyRight"
                ><li>
                  <Button class="w-fit px-2" type="button">justifyRight</Button>
                </li></a
              >
              <a @mousedown="setCommande('justifyFull')" data-command="justifyFull"
                ><li>
                  <Button class="w-fit px-2" type="button">justifyFull</Button>
                </li></a
              >
              <a @mousedown="setCommande('indent')" data-command="indent"
                ><li>
                  <Button class="w-fit px-2" type="button">indent</Button>
                </li></a
              >
              <a @mousedown="setCommande('outdent')" data-command="outdent"
                ><li>
                  <Button class="w-fit px-2" type="button">outdent</Button>
                </li></a
              >
              <a
                @mousedown="setCommande('insertUnorderedList')"
                data-command="insertUnorderedList"
                ><li>
                  <Button class="w-fit px-2" type="button"
                    >insertUnorderedList</Button
                  >
                </li></a
              >
              <a
                @mousedown="setCommande('insertOrderedList')"
                data-command="insertOrderedList"
                ><li>
                  <Button class="w-fit px-2" type="button"
                    >insertOrderedList</Button
                  >
                </li></a
              >
              <a
                @mousedown="setCommande('html', 'h1')"
                data-command="html"
                data-command-argument="h1"
                ><li>
                  <Button class="w-fit px-2" type="button">h1</Button>
                </li></a
              >
              <a
                @mousedown="setCommande('html', 'h2')"
                data-command="html"
                data-command-argument="h2"
                ><li>
                  <Button class="w-fit px-2" type="button">h2</Button>
                </li></a
              >
              <a
                @mousedown="setCommande('html', 'h3')"
                data-command="html"
                data-command-argument="h3"
                ><li>
                  <Button class="w-fit px-2" type="button">h3</Button>
                </li></a
              >
              <a
                @mousedown="setCommande('html', 'p')"
                data-command="html"
                data-command-argument="p"
                ><li><Button class="w-fit px-2" type="button">p</Button></li></a
              >
              <a @mousedown="setCommande('subscript')" data-command="subscript"
                ><li>
                  <Button class="w-fit px-2" type="button">subscript</Button>
                </li></a
              >
              <a @mousedown="setCommande('superscript')" data-command="superscript"
                ><li>
                  <Button class="w-fit px-2" type="button">superscript</Button>
                </li></a
              >
            </ul>
          </div>
          <div
            class="editor mt-2 w-full border rounded-md p-1"
            style="width: 100%"
            contenteditable="true"
          ></div>
        </div> -->
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
                {{ !isedited ? "Add task" : "Edit task" }}
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
