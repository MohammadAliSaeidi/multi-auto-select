import type { ComponentProps, ReactNode } from "react";
import "./index.scss";

type Props = ComponentProps<"button"> & {
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	variant?: "filled" | "ghost";
};

export default function Button(props: Props) {
	const {
		children,
		className,
		startIcon,
		endIcon,
		variant = "filled",
		type = "button",
		...rest
	} = props;

	return (
		<button
			className={`button ${className ?? ""} button--${variant}`}
			type={type}
			{...rest}
		>
			{startIcon && <div className="icon">{startIcon}</div>}
			{children}
			{endIcon && <div className="icon">{endIcon}</div>}
		</button>
	);
}
