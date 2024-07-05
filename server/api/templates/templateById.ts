
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

const getTemplate = (async (id: any) => {

  const data = await $fetch<Template>(BASE_URL + 'template/get/one/' + id);

  return data

});

const replaceUrl = (str: string) => {
  const url = str.replace("\/home\/ticketvi", "https:\/");
  return url;
};

export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
  const data = await getTemplate(query.id);
  const url = replaceUrl(data.template.templateViewPath)
  const htmlData = await $fetch<string>(url);
  // const cssData = await $fetch<string>("http://127.0.0.1:5500/CV-YAMO/style.css");
  return {
    html: htmlData,
    css: data.template.templateViewPath
  }
});
