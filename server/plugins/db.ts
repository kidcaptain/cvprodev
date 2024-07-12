import { Sequelize } from "sequelize";
import { sequelize } from "../utils/db.instance";

export default defineNitroPlugin(async (nitro) => {
    try {
        await sequelize.authenticate();
            
    } catch (error) {
        console.log(error)
    }
})