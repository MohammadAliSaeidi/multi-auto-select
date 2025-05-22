import { useRef, useState } from "react";
import { useDebounce } from "../../../../../hooks/use-debounce";
import type { Option } from "../../type";
import type { PropsBase } from "./type";

type Props = PropsBase & {
	placeholder: string;
	selectedOptions?: Option[];
	visibleSelectedCountLimit: number;
};

export const useAutoSelectInput = (props: Props) => {
	const {
		placeholder,
		selectedOptions,
		visibleSelectedCountLimit,
		onSearchChange,
	} = props;
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [searchValue, setSearchValue] = useState("");
	useDebounce({
		delay: 300,
		value: searchValue,
		onDebounce: onSearchChange,
	});

	const getLabel = (): string => {
		if (selectedOptions === undefined || selectedOptions.length === 0)
			return placeholder;

		const isOverflowed =
			(selectedOptions?.length ?? 0) > visibleSelectedCountLimit;

		return (
			selectedOptions
				.slice(0, visibleSelectedCountLimit)
				.map((option) => option.label)
				.join(", ") + (isOverflowed ? "..." : "")
		);
	};

	const handleFocusChange = (newFocus: boolean) => () => {
		if (newFocus === isFocused) return;

		if (newFocus === true && inputRef.current)
			inputRef.current.value = searchValue;

		setIsFocused(newFocus);
	};

	const onInputChange = (value: string) => {
		setSearchValue(value);
	};

	return { getLabel, onInputChange, isFocused, inputRef, handleFocusChange };
};
