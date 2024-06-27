
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


import {z} from "zod"

export const signupSchema = z.object({
    firstName: z.string().min(2).max(25),
    lastName: z.string().min(2).max(25),
    email: z.string().email(),
    password: z.string().regex(passwordRegex, { message: "Invalid password" }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


