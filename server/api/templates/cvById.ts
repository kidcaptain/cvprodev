
import { useAsyncData } from "nuxt/app";

export interface Template {
  status: boolean,
  template: {
    templateId: string,
    name: string,
    description: string,
    templateImagePath: string,
    templateViewPath: string,
    isDeleted: boolean
  },
  message: any
}

const BASE_URL = useRuntimeConfig().public.backendAPI;

const getTemplate = (async (id: any, userId: any) => {

  const data = await $fetch(BASE_URL + 'cv/get/one?cvId=' + id + '&userId=' + userId);

  return data

});

const replaceUrl = (str: string) => {
  const url = str.replace("\/home\/ticketvi", "https:\/");
  return url;
};

export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
  const data : any= await getTemplate(query.id, query.userId);
  
  const url = replaceUrl(data.cvPro.templateViewPath)
  const htmlData = await $fetch<string>(url);
  // const cssData = await $fetch<string>("http://127.0.0.1:5500/CV-YAMO/style.css");
  return {
    html: htmlData,
    cv: data.cvPro
  }
});
