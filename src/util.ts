import { eq } from "drizzle-orm";
import { db } from "#/db";
import { tokens } from "#/db/schema";

export const generateRandomString = (length: number = 5): string => {
	const set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let str = "";

	for (let i = 0; i < length; i++) {
		const posOfSet = Math.floor(Math.random() * set.length);
		str += set[posOfSet];
	}

	return str;
};

export const getTokenId = async (tokenValue: string): Promise<number | null> => {
	const tokenData = await db
		.select({ id: tokens.id })
		.from(tokens)
		.where(eq(tokens.value, tokenValue));

	if (tokenData.length > 0) {
		return tokenData[0].id;
	}
	
	return null;
}

export const createTokenId = async (): Promise<[number, string]> => {
	const newTokenValue = generateRandomString(20);

	const result = await db
		.insert(tokens)
		.values({ value: newTokenValue })
		.returning({ id: tokens.id });

	return [result[0].id, newTokenValue];
}

