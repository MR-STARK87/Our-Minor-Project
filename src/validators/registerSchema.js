import z from "zod";
import { email, password, username } from "./validationRules.js";

const registerSchema = z
  .object({
    username,
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export default registerSchema;

export { username, email, password };
