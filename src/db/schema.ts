import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tokens = sqliteTable("tokens", {
    id: int("id").primaryKey(),
    value: text("value").notNull().unique()
})

export const links = sqliteTable("links", {
    id: text("id").primaryKey(),
    linksTo: text("links-to").notNull(),
    tokenId: text("token-id")
        .notNull()
        .references(() => tokens.id, { onDelete: "cascade" })
})
