import {sql} from '@vercel/postgres'
import { pgTable, boolean, serial, text, date, uniqueIndex, timestamp, primaryKey, integer} from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import {config } from 'dotenv'


export const User = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    isVerified: boolean('is_verified').default(false),
    isAdmin: boolean('is_admin').default(false),
    forgotPasswordToken: text('forgot_password_token'),
    forgotPasswordTokenExpiry: date('forgot_password_token_expiry'),
    verifyToken: text('verify_token'),
    verifyTokenExpiry: date('verify_token_expiry'),
},
(users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    }
  }

);
config({path: 'env'})
export const db = drizzle(sql);


