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
// import { TextEditor } from
// import EditorJS from "@editorjs/editorjs";
import * as z from "zod";
import TextEditor from "./TextEditor.vue";
// const editor = new EditorJS({
//   holder: "editorjs",
//   tools: {
//     header: {
//       class: Header,
//       inlineToolbar: ["link"],
//     },
//     list: {
//       class: List,
//       inlineToolbar: true,
//     },
//   },
// });
// onMounted(() => {
//   editor.isReady
//     .then(() => {
//       console.log("Editor.js is ready to work!");
//       /** Do anything you need after editor initialization */
//     })
//     .catch((reason) => {
//       console.log(`Editor.js initialization failed because of ${reason}`);
//     });
// });
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
const Undo = ref(false);
const redo = ref(false);
const hr = ref(false);
const bold = ref(false);
const italic = ref(false);
const underline = ref(false);
const strikeThrough = ref(false);
const justifyLeft = ref(false);
const justifyRight = ref(false);
const justifyFull = ref(false);
const indent = ref(false);
const outdent = ref(false);
const subscript = ref(false);
const superscript = ref(false);
// const indexToEdited = ref(0);
// const isedited = ref(false);
// const task = ref("");
// const taskss = ref("");
// const addTask = () => {
//   let tab = [];
//   tab = tasks.value;
//   if (isedited.value) {
//     tab[indexToEdited.value] = task.value;
//     tasks.value = tab;
//     task.value = "";
//     isedited.value = false;
//   } else {
//     tab.push(task.value);
//     tasks.value = tab;
//     task.value = "";
//   }
// };
// const getItem = (item, index) => {
//   isedited.value = true;
//   task.value = item;
//   indexToEdited.value = index;
// };
const setState = (str) => {
  document.execCommand(str, false);
  document.querySelector(".editor").focus();
};
const onChangeEditor = () => {
  const tache = document.getElementById("experienceExperienceEdit");
  if (tache) {
    if (tache.innerHTML == "") {
        bold.value = false;
        italic.value = false;
        underline.value = false;
    }
  }
}
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
  border: 3px inset rgb(218 218 218) !important;
  border-radius: 8px;
}
.editor:focus{
  outline: 1px solid rgb(228, 228, 228) !important;
}
.editor-commands button {
  font-size: large;
  box-shadow: 1px 1px 4px silver;
  border-radius: 8px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  background-color: seashell;
  border: 1px solid rgb(228, 228, 228);
  padding: 4px;
}
.editor-commands button:hover{
  background-color: rgb(207, 51, 51);
  color: white;
}
.editor-commands button.activate {
  background-color: brown;
  color: white;
}
.editor-commands button.activate:hover {
  background-color: rgb(207, 51, 51);
  color: white;
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
                      <ul class="flex gap-2 flex-wrap">
                        <li>
                          <button
                            type="button"
                            @click="() => setState('undo')"
                            class="cursor-pointer"
                          
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  d="M4 7H15C16.8692 7 17.8039 7 18.5 7.40193C18.9561 7.66523 19.3348 8.04394 19.5981 8.49999C20 9.19615 20 10.1308 20 12C20 13.8692 20 14.8038 19.5981 15.5C19.3348 15.9561 18.9561 16.3348 18.5 16.5981C17.8039 17 16.8692 17 15 17H8.00001M4 7L7 4M4 7L7 10"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </g></svg
                            ><span class="hidden">Undo</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            @click="() => setState('redo')"
                            class="cursor-pointer"
                           
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  d="M16.8701 18.3101H8.87012C6.11012 18.3101 3.87012 16.0701 3.87012 13.3101C3.87012 10.5501 6.11012 8.31006 8.87012 8.31006H19.8701"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M17.5701 10.8099L20.1301 8.24994L17.5701 5.68994"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </g></svg
                            ><span class="hidden">Redo</span>
                          </button>
                        </li>
                        <li>
                          <button type="button"  @click="() => setState('insertHorizontalRule')"  class="cursor-pointer p-2">hr</button>
                        </li>
                        <li>
                          <button type="button"
                          @click="() => {setState('bold'); bold = !bold}" :class="bold ? 'activate' : ''" class="cursor-pointer font-bold"><span>B</span></button>
                        </li>
                        <li>
                          <button type="button" @click="() => {setState('italic'); italic = !italic}" :class="italic ? 'activate' : ''"
                            ><span class="italic">i</span></button
                          >
                        </li>
                        <li>
                          <button type="button" @click="() => {setState('underline'); underline = !underline}" :class="underline ? 'activate' : ''" class="cursor-pointer underline"
                            >U</button
                          >
                        </li>
                       
                        <li>
                          <button  type="button" @click="() => {setState('justifyLeft'); justifyLeft = !justifyLeft}" class="cursor-pointer"
                            ><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 7H19" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 12L14 12" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 17L19 17" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg><span class="hidden">justify left</span></button
                          >
                        </li>
                        <li>
                          <button   type="button" @click="() => {setState('justifyCenter'); justifyCenter = !justifyCenter}"  class="cursor-pointer"
                            >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 7H19" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 12L16 12" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 17L19 17" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <span class="hidden">justify center</span> </button
                          >
                        </li>
                        <li>
                          <button type="button"  @click="() => {setState('justifyRight'); justifyRight = !justifyRight}"  class="cursor-pointer"
                            >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 7H19" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 12L19 12" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 17L19 17" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <span class="hidden">justify right</span></button
                          >
                        </li>
                      
                        <li>
                          <button data-command="indent" type="button" @click="() => {setState('indent'); indent = !indent}"  class="cursor-pointer"
                            ><svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 6C10.9477 6 10.5 6.44772 10.5 7C10.5 7.55228 10.9477 8 11.5 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H11.5ZM15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H15ZM12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H12ZM7.70711 8.29289C7.31658 7.90237 6.68342 7.90237 6.29289 8.29289C5.90237 8.68342 5.90237 9.31658 6.29289 9.70711L7.58579 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H7.58579L6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071C6.68342 16.0976 7.31658 16.0976 7.70711 15.7071L10.7071 12.7071C11.0976 12.3166 11.0976 11.6834 10.7071 11.2929L7.70711 8.29289Z" fill="#000000"></path> </g></svg>
                            <span class="hidden"></span></button
                          >
                        </li>
                        <li>
                          <button  @click="() => {setState('outdent'); outdent = !outdent}"  type="button" class="cursor-pointer"
                            ><svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C10.4477 6 10 6.44772 10 7C10 7.55228 10.4477 8 11 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H11ZM15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13L20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L15 11ZM11 16C10.4477 16 10 16.4477 10 17C10 17.5523 10.4477 18 11 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H11ZM7.70711 9.70711C8.09763 9.31658 8.09763 8.68342 7.70711 8.29289C7.31658 7.90237 6.68342 7.90237 6.29289 8.29289L3.29289 11.2929C2.90237 11.6834 2.90237 12.3166 3.29289 12.7071L6.29289 15.7071C6.68342 16.0976 7.31658 16.0976 7.70711 15.7071C8.09763 15.3166 8.09763 14.6834 7.70711 14.2929L6.41421 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6.41421L7.70711 9.70711Z" fill="#000000"></path> </g></svg>
                            <span class="hidden">outdent</span></button
                          >
                        </li>
                        <li>
                          <button class="cursor-pointer "  @click="() => {setState('subscript'); subscript = !subscript}"
                            >
                            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19,3V5a1,1,0,0,1-2,0V4H12V16h2a1,1,0,0,1,0,2H8a1,1,0,0,1,0-2h2V4H5V5A1,1,0,0,1,3,5V3A1,1,0,0,1,4,2H18A1,1,0,0,1,19,3Zm1.555,14.832A1,1,0,0,0,21,17V15a1,1,0,0,0-1-1H17a1,1,0,0,0,0,2h2v.465l-2.555,1.7A1,1,0,0,0,16,19v2a1,1,0,0,0,1,1h3a1,1,0,0,0,0-2H18v-.465Z"></path></g></svg>
                            <span class="hidden">subscript</span></button
                          >
                        </li>
                        <li>
                          <button  class="cursor-pointer"  @click="() => {setState('superscript'); superscript = !superscript}"
                            ><svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,10V8A1,1,0,0,1,2,7H16a1,1,0,0,1,1,1v2a1,1,0,0,1-2,0V9H10V21h2a1,1,0,0,1,0,2H6a1,1,0,0,1,0-2H8V9H3v1a1,1,0,0,1-2,0ZM22,1H19a1,1,0,0,0,0,2h2v.465l-2.555,1.7A1,1,0,0,0,18,6V8a1,1,0,0,0,1,1h3a1,1,0,0,0,0-2H20V6.535l2.555-1.7A1,1,0,0,0,23,4V2A1,1,0,0,0,22,1Z"></path></g></svg>
                            <span class="hidden">superscript</span></button
                          >
                        </li>
                      </ul>
                    </div>
                    <div
                      class="editor mt-8 p-2"
                      id="experienceExperienceEdit"
                      contenteditable="true"
                      @keyup="onChangeEditor"
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
        <Button type="submit" class="px-2 w-fit">
          <Plus :size="15" /> <span>Add</span>
        </Button>
      </div>
    </div>
  </form>
</template>
