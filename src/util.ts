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

/*
    The tokens shown to the user are not the visual value, 
    but we're using the id (primary key) of the token to query

    This function either:
    - Returns a new token from the user's visual token value, if it exists in the database
    - Creates a new token and return it's id
*/
export const getOrCreateToken = async (
	existingToken?: string,
): Promise<[number, string]> => {
	if (existingToken) {
		const tokenData = await db
			.select({ id: tokens.id })
			.from(tokens)
			.where(eq(tokens.value, existingToken));

		if (tokenData.length > 0) {
			return [tokenData[0].id, existingToken];
		}
	}

	const newTokenValue = generateRandomString(20);

	const result = await db
		.insert(tokens)
		.values({ value: newTokenValue })
		.returning({ id: tokens.id });

	return [result[0].id, newTokenValue];
};
