import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tokens = sqliteTable("tokens", {
	id: int("id").primaryKey({ autoIncrement: true }),
	value: text("value").notNull().unique(),
});

export const links = sqliteTable("links", {
	id: text("id").primaryKey(),
	linksTo: text("links-to").notNull(),
	tokenId: int("token-id")
		.notNull()
		.references(() => tokens.id, { onDelete: "cascade" }),
});
