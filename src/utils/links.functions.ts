import { createServerFn } from "@tanstack/react-start";

import { createLink, getLinkById } from "./links.server";

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
