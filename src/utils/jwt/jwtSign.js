import jwt from "jsonwebtoken";
import { ENV_JWT_SECRET_KEY } from "../const_config.js";

export default async function signToken (userId) {
    const sign = jwt.sign({ id : userId }, ENV_JWT_SECRET_KEY, { expiresIn : '12h' });

    return sign;
}