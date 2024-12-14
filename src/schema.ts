import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  pgEnum,
} from "drizzle-orm/pg-core";
// using vercel sql
import { sql } from "@vercel/postgres";
import postgres from "postgres";
//using vercel postgres
import { drizzle } from "drizzle-orm/vercel-postgres";
import type { AdapterAccountType } from "next-auth/adapters";
import { qualityOptions, rootOptions } from "@/lib/schemas";
import { relations } from "drizzle-orm";

const connectionString = "postgres://postgres:postgres@localhost:3000/drizzle";
const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(sql);

/*AUTHENTICATION*/

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

/*SONGS DATA*/
export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
});

export const measures = pgTable("measures", {
  id: serial("id").primaryKey(),
  songId: integer("songId")
    .notNull()
    .references(() => songs.id, { onDelete: "cascade" }),
  measureNumber: integer("measureNumber").notNull(),
});

export const rootEnum = pgEnum("root", rootOptions);
export const qualityEnum = pgEnum("quality", qualityOptions);

export const chords = pgTable("chords", {
  id: serial("id").primaryKey(),
  measureId: integer("measureId")
    .notNull()
    .references(() => measures.id, { onDelete: "cascade" }),
  root: rootEnum("root").notNull(),
  quality: qualityEnum("quality").notNull(),
});
