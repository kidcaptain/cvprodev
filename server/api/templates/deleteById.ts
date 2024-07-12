import { CvModel } from "~/server/models/Cv.model";
export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
    try {
        const deletecv = await CvModel.destroy({ where: { id: query.id }});
        if (deletecv) {
            return { response: "Record delete successfully"}
        }else{
            return { error: "Record not found"}
        }
    } catch (error) {
        console.error("Error deleting record:", error);
        return { error: "An error occurred"}
    }
});
