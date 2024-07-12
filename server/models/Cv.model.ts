import { DataTypes, Model } from "sequelize";

export class CvModel extends Model { };

CvModel.init({
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    uuid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    template_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    tmp_key: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    years_of_experience: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture_path: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    goal: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0'
    },
    education: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    personal_skills: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    professional_skills: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    language: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    hobbies: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    certifications: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    references: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    projects: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_deleted: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    updated_at: {
        type: DataTypes.TIME,
        defaultValue: null
    }

}, { sequelize, tableName: "cvs" })
// Q89eK26oa6j49IY7HZ3ex9R9hlKGb+6X9f8mLbJaPfk=