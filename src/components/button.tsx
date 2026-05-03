import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from "react";

interface ButtonBaseProps {
	variant?: "primary" | "ghost";
	loading?: boolean;
	className?: string;
}

type ButtonProps = ButtonBaseProps &
	(
		| ({ as?: "button" } & ButtonHTMLAttributes<HTMLButtonElement>)
		| ({ as: "link" } & LinkProps & { children: ReactNode })
		| ({ as: "external" } & AnchorHTMLAttributes<HTMLAnchorElement>)
	);

export function Button({
	variant = "primary",
	loading,
	...props
}: ButtonProps) {
	const baseStyles = "uppercase tracking-widest transition-all cursor-pointer";
	const variantStyles =
		variant === "primary"
			? "inline-block px-8 py-3 border border-neutral-900 text-sm hover:bg-neutral-900 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-900 text-center"
			: "text-xs hover:underline";

	const className = `${baseStyles} ${variantStyles} ${props.className || ""}`;

	if (props.as === "link") {
		const { as, children, ...linkProps } = props;
		return (
			<Link {...linkProps} className={className}>
				{children}
			</Link>
		);
	}

	if (props.as === "external") {
		const { as, children, ...anchorProps } = props;
		return (
			<a {...anchorProps} className={className}>
				{children}
			</a>
		);
	}

	const { as, children, ...buttonProps } = props;
	return (
		<button
			{...buttonProps}
			disabled={loading || buttonProps.disabled}
			className={className}
		>
			{children}
		</button>
	);
}
