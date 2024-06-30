
import { pgTable, pgColumn, integer, string, boolean, date, serial, text} from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm';

export const User = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    isVerified: boolean('is_verified').default(false),
    isAdmin: boolean('is_admin').default(false),
    // forgotPasswordToken: text('forgot_password_token').nullable(),
    // forgotPasswordTokenExpiry: date('forgot_password_token_expiry').nullable(),
    // verifyToken: text('verify_token').nullable(),
    // verifyTokenExpiry: date('verify_token_expiry').nullable(),
});

// const db = drizzle(process.env.DATABASE_URL, { dialect: 'postgres' });


