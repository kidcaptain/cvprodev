<script setup lang="ts">
import { Edit } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
const BASE_URL = useRuntimeConfig().public.backendAPI;

const { user, signOut, session } = useAuth();
definePageMeta({
  middleware: "auth"
});

const emit = defineEmits(["submit"]);

const onSubmit = async (values: any) => {
  values.preventDefault();
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  
 if(nameInput && emailInput){
  try {
    const name = (nameInput as HTMLInputElement).value;
    const email = (emailInput as HTMLInputElement).value;
    const response = await axios.post(BASE_URL + `user/edit?name=${name}&email=${email}&userId=${session?.uid}&isBlocked=${false}&role=user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("CV submitted successfully:", response.data);
  } catch (error) {
    console.error("Error submitting CV:", error);
  }
 }
};
</script>
 
<template>
  <div class="container " v-if="!user">
    <div id="user-profile">
      <!-- profile header -->
      <div class="row">
        <div class="col-12">
          <div class="mb-2 card profile-header">
            <!-- profile cover photo -->
            <img
              class="w-20 m-auto"
              src="@/assets/img/logo-footer.png"
              alt="User Profile Image"
            />
            <!--/ profile cover photo -->
            <form @submit="onSubmit" class="flex justify-center ">
              <div class="p-4 min-w-96 card-content rounded-lg bg-white shadow-lg">
                <div id="educationPart">
                  <div class="mt-2 row">
                    <div class="col-12 col-md-6">
                      <label
                        class="font-semibold"
                        for="modalEditCvProjectTitle"
                      >
                        Username</label
                      >
                      <br />
                      <input
                        type="text"
                        id="name"
                        name="modalEditCvProjectTitle"
                        class="p-2 bg-stone-50 w-full border-primary border ring-primary/20 text-sm focus-within:outline-none focus-within:ring-2 rounded-lg"
                        placeholder=" Institution"
                        data-msg="Please enter your Job Institution"
                      />
                    </div>
                  </div>
                  <div class="mt-2 row">
                    <div class="col-12 col-md-6">
                      <label
                        class="font-semibold"
                        for="modalEditCvCompanyProject"
                      >
                        Email</label
                      >
                      <br />
                      <input
                        type="text"
                        id="email"
                        name="modalEditCvCompanyProject"
                        class="p-2 bg-stone-50 w-full border-primary border ring-primary/20 text-sm focus-within:outline-none focus-within:ring-2 rounded-lg"
                        placeholder="Degree obtained and grade"
                        data-msg="Please enter your last name"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <Button
                    type="submit"
                    class="add-work-education w-full  btn btn-secondary"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
