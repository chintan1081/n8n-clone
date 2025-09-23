import { z } from "zod";

export const signInSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string()
})