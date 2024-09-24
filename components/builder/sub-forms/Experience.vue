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
  if (startDateExperience && endDateExperience) {
    let date1 = new Date(`${(startDateExperience as HTMLInputElement).value}`);
    let date2 = new Date(`${(endDateExperience as HTMLInputElement).value}`);
    if (date1 < date2) {
      messageError.value = "";
      const titleExperience = document.getElementById("titleExperienceEdit");
      const companyExperience = document.getElementById(
        "companyExperienceEdit"
      );

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
        const professionalTasksPerformed = experienceExperience.innerHTML;
        emit("submit", {
          jobTitle: jobTitle,
          company: company,
          startDate: startDate,
          endDate: endDate,
          professionalTasksPerformed: professionalTasksPerformed,
        });
        (titleExperience as HTMLInputElement).value = "";
        const d = document.getElementById("experienceExperienceEdit");
        if (d) {
          d.innerHTML = "";
        }
        (companyExperience as HTMLInputElement).value = "";
        (startDateExperience as HTMLInputElement).value = "";
        (endDateExperience as HTMLInputElement).value = "";
        (experienceExperience as HTMLInputElement).value = "";
      }
      tasks.value = [];
    } else {
      messageError.value = "The start date is greater than the end date";
    }
  }
};

const experience_fields = [
  {
    name: "title",
    label: "Job Title",
    placeholder: "Job title",
    type: "text",
    id: "titleExperience",
    require: true,
  },
  {
    name: "company",
    label: "Company Name",
    placeholder: "Name of company",
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
  } else {
    document.execCommand(command, false);
  }
};
onMounted(() => {
  var commandButtons = document.querySelectorAll(".editor-commands a");
  for (var i = 0; i < commandButtons.length; i++) {
    commandButtons[i].addEventListener("mousedown", function (e) {
      e.preventDefault();
      var commandName = e.target.getAttribute("data-command");
      if (commandName === "html") {
        var commandArgument = e.target.getAttribute("data-command-argument");
        document.execCommand("formatBlock", false, commandArgument);
      } else {
        document.execCommand(commandName, false);
      }
      document.querySelector(".editor").focus();
    });
  }
});
</script>
<style>
.editor {
  min-height: 150px;
  width: 100%;
  border: 1px solid black;
}
.editor-commands a {
  background-color: white;
  border: 1px solid silver;
  padding: 8px;
}
</style>
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
        <div class="col-span-2">
          <div class="editor-commands">
            <ul class="flex gap-5 flex-wrap">
              <li><a data-command="undo" class="cursor-pointer">Undo</a></li>
              <li><a data-command="redo" class="cursor-pointer">Redo</a></li>
              <li>
                <a data-command="insertHorizontalRule" class="cursor-pointer"
                  >hr</a
                >
              </li>
              <li><a data-command="bold" class="cursor-pointer">Bold</a></li>
              <li>
                <a data-command="italic" class="cursor-pointer">Italic</a>
              </li>
              <li>
                <a data-command="underline" class="cursor-pointer">Underline</a>
              </li>
              <li>
                <a data-command="strikeThrough" class="cursor-pointer"
                  >strike through</a
                >
              </li>
              <li>
                <a data-command="justifyLeft" class="cursor-pointer"
                  >justify left</a
                >
              </li>
              <li>
                <a data-command="justifyCenter" class="cursor-pointer"
                  >justify center</a
                >
              </li>
              <li>
                <a data-command="justifyRight" class="cursor-pointer"
                  >justify right</a
                >
              </li>
              <li>
                <a data-command="justifyFull" class="cursor-pointer"
                  >justify full</a
                >
              </li>
              <li>
                <a data-command="indent" class="cursor-pointer">indent</a>
              </li>
              <li>
                <a data-command="outdent" class="cursor-pointer">outdent</a>
              </li>
              <li>
                <a data-command="subscript" class="cursor-pointer">subscript</a>
              </li>
              <li>
                <a data-command="superscript" class="cursor-pointer"
                  >superscript</a
                >
              </li>
            </ul>
          </div>
          <div
            class="editor mt-8 p-2"
            id="experienceExperienceEdit"
            contenteditable="true"
          ></div>
        </div>
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
        <!-- <FormField name="experienceExperienceEdit" class="col-span-2">
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
        </FormField> -->
      </div>
      <div>
        <Button type="submit" class="w-fit px-2">
          <Plus :size="15" /> <span>Add</span>
        </Button>
      </div>
    </div>
  </form>
</template>
