import { v4 } from "uuid";
import { redis } from "../../../redis";

export const createConfirmationUrl = async (userId: number) => {
    const token = v4();
    await redis.set(token, userId, "EX", 300000); //1 day expiration

    return `http://localhost:4000/user/confirm/${token}`;
}