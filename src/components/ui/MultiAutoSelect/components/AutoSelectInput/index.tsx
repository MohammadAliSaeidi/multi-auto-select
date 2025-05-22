import { forwardRef } from "react";
import Input from "../../../Input";
import type { Option } from "../../type";
import type { PropsBase } from "./type";
import { useAutoSelectInput } from "./use-auto-select-input";

type Props = PropsBase & {
	placeholder?: string;
	selectedOptions?: Option[];
	visibleSelectedCountLimit?: number;
	onInputSubmitted: (inputValue: string) => void;
};

const Trigger = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const {
		placeholder = "select...",
		selectedOptions,
		onInputSubmitted,
		visibleSelectedCountLimit = 2,
		onSearchChange,
	} = props;

	const { getLabel, isFocused, onInputChange, handleFocusChange, inputRef } =
		useAutoSelectInput({
			placeholder,
			selectedOptions,
			visibleSelectedCountLimit,
			onSearchChange,
		});

	return (
		<div ref={ref}>
			<Input
				ref={inputRef}
				onFocus={handleFocusChange(true)}
				onBlur={handleFocusChange(false)}
				onChange={(e) => onInputChange(e.target.value)}
				placeholder={isFocused ? "find item..." : placeholder}
				value={isFocused ? undefined : getLabel()}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						onInputSubmitted(inputRef.current?.value ?? "");
					}
				}}
			/>
		</div>
	);
});

export default Trigger;
