import type { ComponentProps, ReactNode } from "react";
import "./index.scss";

type Props = ComponentProps<"button"> & {
	startIcon?: ReactNode;
	endIcon?: ReactNode;
};

export default function Button(props: Props) {
	const { children, className, startIcon, endIcon, ...rest } = props;

	return (
		<button className={`button ${className}`} {...rest}>
			{startIcon && <div className="icon">{startIcon}</div>}
			{children}
			{endIcon && <div className="icon">{endIcon}</div>}
		</button>
	);
}
