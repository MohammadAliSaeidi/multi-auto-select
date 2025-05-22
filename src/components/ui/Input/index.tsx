import type { ComponentProps, ReactNode } from "react";
import "./index.scss";

type Props = ComponentProps<"input"> & {
	endIcon?: ReactNode;
	startIcon?: ReactNode;
};

export default function Input(props: Props) {
	const { className, ...rest } = props;
	return <input className={`input ${className ?? ""}`} {...rest} />;
}
