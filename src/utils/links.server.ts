import { eq } from "drizzle-orm";
import { db } from "#/db";
import { links } from "#/db/schema";
import { generateRandomString, getOrCreateToken } from "#/util";

export const getLinkById = async (
	shortcode: string,
): Promise<{ id: string; linksTo: string } | null> => {
	try {
		const data = await db
			.select({ id: links.id, linksTo: links.linksTo })
			.from(links)
			.where(eq(links.id, shortcode));

		return data[0] || null;
	} catch (error) {
		console.error("getLinkById failed", { shortcode, error });
		throw new Error("Unable to fetch link by id");
	}
};

export const createLink = async (
	linksTo: string,
	userToken?: string,
): Promise<{ id: string; token: string }> => {
	try {
		if (!linksTo) {
			throw new Error("linksTo is required to create a link");
		}

		const randomId = generateRandomString();
		const [token, tokenValue] = await getOrCreateToken(userToken || undefined);

		const data = await db
			.insert(links)
			.values({
				id: randomId,
				linksTo,
				tokenId: token,
			})
			.returning({ id: links.id });

		if (!data?.[0]?.id) {
			throw new Error("Failed to create link record");
		}

		return {
			id: data[0].id,
			token: tokenValue,
		};
	} catch (error) {
		console.error("createLink failed", {
			linksTo,
			userToken: !!userToken,
			error,
		});
		throw new Error("Unable to create link");
	}
};
