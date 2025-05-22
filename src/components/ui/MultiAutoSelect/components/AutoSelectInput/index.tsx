import { forwardRef, type ReactNode } from "react";
import Input from "../../../Input";
import type { Option } from "../../type";
import type { PropsBase } from "./type";
import { useAutoSelectInput } from "./use-auto-select-input";
import NoConnectionIcon from "@/assets/icons/svg/wifi.svg?react";
import "./index.scss";
import Loading from "@/components/ui/Loading";
import ArrowIcon from "@/assets/icons/svg/arrow-down.svg?react";

type Props = PropsBase & {
	placeholder?: string;
	selectedOptions?: Option[];
	visibleSelectedCountLimit?: number;
	onInputSubmitted: (inputValue: string) => void;
	customError?: ReactNode;
};

const AutoSelectInput = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const {
		placeholder = "select...",
		isLoading,
		selectedOptions,
		onInputSubmitted,
		visibleSelectedCountLimit = 2,
		onSearchChange,
		isPopoverOpen,
		isError = false,
		customError,
	} = props;

	const {
		getPlaceholder,
		onInputChange,
		handleFocusChange,
		getValue,
		inputRef,
	} = useAutoSelectInput({
		placeholder,
		selectedOptions,
		visibleSelectedCountLimit,
		onSearchChange,
		isPopoverOpen,
		isError,
		isLoading,
	});

	return (
		<div className="auto-select-input" ref={ref}>
			<Input
				ref={inputRef}
				onFocus={handleFocusChange(true)}
				onBlur={handleFocusChange(false)}
				onChange={(e) => onInputChange(e.target.value)}
				placeholder={getPlaceholder()}
				value={getValue()}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						onInputSubmitted(inputRef.current?.value ?? "");
					}
				}}
			/>
			<div
				className="arrow-icon__wrapper"
				onClick={() => inputRef.current?.focus()}
			>
				<div className={`anchor ${isPopoverOpen ? "open" : ""}`}>
					<ArrowIcon />
				</div>
			</div>
			{isLoading && (
				<div className="status loading">
					<Loading size={16} />
				</div>
			)}
			{isError && (
				<div role="status" className="status error">
					{customError ?? <NoConnectionIcon />}
				</div>
			)}
		</div>
	);
});

export default AutoSelectInput;
