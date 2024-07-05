import { useLazyAsyncData } from 'nuxt/app'

export default function useGetTemplate(id: string) {
  const { data, error, refresh } = useLazyAsyncData("cv-templates-list", () =>
    $fetch(
      id,
      { mode: "no-cors" }
    )
  );
  console.log(id);
  return data;
}