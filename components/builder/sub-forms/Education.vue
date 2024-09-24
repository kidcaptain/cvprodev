<script setup>
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";

import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(255),
    grade: z.string().min(2).max(255),
    city: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    field_of_study: z.string(),
    grade_obtained: z.string(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const emit = defineEmits(["submit"]);
const props = defineProps({
  item: {
    type: Object,
  },
});
const defaultValues = ref({
  title: props.item?.title,
  grade: props.item?.grade,
  start_date: props.item?.start_date,
  end_date: props.item?.end_date,
  city: props.item?.city,
  field_of_study: props.item?.field_of_study,
  grade_obtained: props.item?.grade_obtained,
});
const messageError = ref("");
const onSubmit = handleSubmit((values) => {
  const date1 = new Date(values.start_date);
  const date2 = new Date(values.end_date);
  if (date1 < date2) {
    messageError.value = "";
    const tache = document.getElementById("experienceExperienceEdit");
    let tasksPerformed = "";
    if (tache) {
      tasksPerformed = tache.innerHTML;
    }
    const title = values.title;
    const grade = values.grade;
    const startDate = values.start_date;
    const endDate = values.end_date;
    const city = values.city;
    const fieldOfStudy = values.field_of_study;
    const gradeOfObtained = values.grade_obtained;

    tasks.value = [];
    emit("submit", {
      title: title,
      grade: grade,
      start_date: startDate,
      end_date: endDate,
      city: city,
      field_of_study: fieldOfStudy,
      grade_obtained: gradeOfObtained,
      tasks_performed: tasksPerformed,
    });
    values.title = "";
    values.grade = "";
    values.start_date = "";
    values.end_date = "";
    values.city = "";
    values.field_of_study = "";
    document.getElementById("experienceExperienceEdit").innerHTML = "";
    values.grade_obtained = "";
    const titleEducation = document.getElementById("titleEducation");
    const gradeEducation = document.getElementById("gradeEducation");
    const startDateEducation = document.getElementById("startDateEducation");
    const endDateEducation = document.getElementById("endDateEducation");
    const cityEducation = document.getElementById("cityEducation");
    const gradeObtainedEducation = document.getElementById(
      "gradeObtainedEducation"
    );
    const fieldOfStudyEducation = document.getElementById(
      "fieldOfStudyEducation"
    );
    if (
      titleEducation &&
      gradeEducation &&
      startDateEducation &&
      endDateEducation &&
      cityEducation &&
      fieldOfStudyEducation &&
      gradeObtainedEducation
    ) {
      endDateEducation.value = "";
      startDateEducation.value = "";
      titleEducation.value = "";
      gradeEducation.value = "";
      cityEducation.value = "";
      fieldOfStudyEducation.value = "";
      gradeObtainedEducation.value = "";
    }
  } else {
    messageError.value = "The start date is greater than the end date";
  }
});

const experience_fields = [
  {
    name: "title",
    label: "Institution",
    placeholder: "University of XXXXX",
    type: "text",
    class: "col-span-2",
    id: "titleEducation",
    facultative: true,
    type: "text",
  },
  {
    name: "grade",
    label: "Diploma obtained",
    placeholder: "",
    class: "col-span-1",
    id: "gradeEducation",
    facultative: true,
    type: "text",
  },
  {
    name: "city",
    label: "City",
    placeholder: "",
    class: "col-span-1",
    id: "cityEducation",
    facultative: true,
    type: "text",
  },
  {
    name: "field_of_study",
    label: "Field of study",
    placeholder: "",
    class: "col-span-1",
    id: "fieldOfStudyEducation",
    facultative: true,
    type: "text",
  },
  {
    name: "grade_obtained",
    label: "Grade obtained",
    placeholder: "",
    class: "col-span-1",
    id: "gradeObtainedEducation",
    facultative: true,
    type: "text",
  },

  {
    name: "start_date",
    label: "Starting Date",
    class: "col-span-1",
    placeholder: "",
    type: "month",
    id: "startDateEducation",
    facultative: true,
  },
  {
    name: "end_date",
    label: "Ending Date",
    class: "col-span-1",
    placeholder: "",
    type: "month",
    id: "endDateEducation",
    facultative: true,
  },
  {
    name: "taskPerformed",
    label: "Tasks performed",
    placeholder: "",
    class: "col-span-2",
    type: "textarea",
    id: "taskPerformedEducation",
    facultative: true,
  },
];
const tasks = ref([]);
const indexToEdited = ref(0);
const isedited = ref(false);
const task = ref("");
const addTask = () => {
  let tab = [];
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
const getItem = (item, index) => {
  isedited.value = true;
  task.value = item;
  indexToEdited.value = index;
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
    <div
      class="w-full gap-6 p-2 space-y-6 border-l-2 md:grid md:grid-cols-2 md:space-y-0 border-secondary/50"
    >
      <template v-for="field in experience_fields">
        <FormField
          v-slot="{ componentField }"
          :name="field.name"
          :class="field.class"
          :value="defaultValues[field.name]"
        >
          <FormItem :class="field.class">
            <FormLabel>{{ field.label }}</FormLabel>
            <FormControl>
              <div v-if="field.type == 'textarea'">
                <div class="col-span-2">
                  <div class="editor-commands">
                    <ul class="flex gap-5 flex-wrap">
                      <li>
                        <a data-command="undo" class="cursor-pointer">Undo</a>
                      </li>
                      <li>
                        <a data-command="redo" class="cursor-pointer">Redo</a>
                      </li>
                      <li>
                        <a
                          data-command="insertHorizontalRule"
                          class="cursor-pointer"
                          >hr</a
                        >
                      </li>
                      <li>
                        <a data-command="bold" class="cursor-pointer">Bold</a>
                      </li>
                      <li>
                        <a data-command="italic" class="cursor-pointer"
                          >Italic</a
                        >
                      </li>
                      <li>
                        <a data-command="underline" class="cursor-pointer"
                          >Underline</a
                        >
                      </li>
                      <li>
                        <a data-command="strikeThrough" class="cursor-pointer"
                          >strike through</a
                        >
                      </li>
                      <li>
                        <a data-command="justifyLeft" class="cursor-pointer"
                          >justifyLeft</a
                        >
                      </li>
                      <li>
                        <a data-command="justifyCenter" class="cursor-pointer"
                          >justifyCenter</a
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
                        <a data-command="indent" class="cursor-pointer"
                          >indent</a
                        >
                      </li>
                      <li>
                        <a data-command="outdent" class="cursor-pointer"
                          >outdent</a
                        >
                      </li>
                      <li>
                        <a data-command="subscript" class="cursor-pointer"
                          >subscript</a
                        >
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
              </div>
              <Input
                v-else
                :id="field.id"
                :type="field.type ? field.type : 'text'"
                :placeholder="field.placeholder"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </template>
      <div>
        <Button type="submit" class="w-fit px-2">
          <Plus :size="15" /> <span>Add</span>
        </Button>
      </div>
    </div>
  </form>
</template>
