import { createServerFn } from "@tanstack/react-start";

import { createLink, getLinkById, getLinksByToken } from "./links.server";

export const getLinksFn = createServerFn({ method: "GET" })
	.inputValidator((data: { token: string }) => data)
	.handler(async ({ data }) => {
		return getLinksByToken(data.token);
	});

export const getLink = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		return getLinkById(data.id);
	});

export const createLinkFn = createServerFn({ method: "POST" })
	.inputValidator((data: { linksTo: string; token?: string }) => data)
	.handler(async ({ data }) => {
		return createLink(data.linksTo, data.token);
	});
