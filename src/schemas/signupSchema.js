
import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signupSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }).max(25, { message: "First name must be no more than 25 characters long" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }).max(25, { message: "Last name must be no more than 25 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().regex(passwordRegex, { message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
