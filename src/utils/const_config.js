import dotenv from "dotenv";
dotenv.config();

export const ENV_DB_NAME = process.env.DB_NAME;
export const ENV_DB_URL = process.env.DB_URL;


export const ENV_PASSWORD_SALT = Number(process.env.PASSWORD_SALT);
export const ENV_JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const ENV_KAKAO_ID = process.env.KAKAO_ID;
export const ENV_KAKAO_SECRET_KEY = process.env.KAKAO_SECRET_KEY
export const ENV_REDIRECT_URL = process.env.REDIRECT_URL;