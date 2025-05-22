import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MultiAutoSelectPropsBase, Option, OptionValue } from "./type";

type Props<T> = MultiAutoSelectPropsBase<T> & {
	isLoading?: boolean;
	optionsData?: T[];
};

function useMultiAutoSelect<T>(props: Props<T>) {
	const { isLoading, labelKey, valueKey, optionsData, defaultValue } = props;

	const itemsListRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	const initOptions = (): Option[] => {
		if (isLoading) return [];

		if (!optionsData || optionsData.length === 0) return [];

		return optionsData.map(
			(item): Option => ({
				label: item[labelKey] as string,
				value: item[valueKey] as OptionValue,
				isSelected: defaultValue?.includes(item[valueKey] as string),
			})
		);
	};

	const [options, setOptions] = useState<Option[] | undefined>(initOptions());
	const [searchValue, setSearchValue] = useState<string | undefined>();
	const [isOpen, setIsOpen] = useState(false);

	const handleItemSelection = useCallback(
		(value: OptionValue, isSelected: boolean) => {
			const updatedOptions = options?.map((option) => {
				if (option.value === value) {
					return { ...option, isSelected: !isSelected };
				}
				return option;
			});

			setOptions(updatedOptions);
		},
		[options]
	);

	const filteredOptions = useMemo(() => {
		if (!searchValue) return options;

		return options?.filter((option) =>
			option.label
				.trim()
				.toLowerCase()
				.includes(searchValue.toLowerCase())
		);
	}, [options, searchValue]);

	const onSearchChange = (searchValue: string) => {
		setSearchValue(searchValue);
	};

	const onClose = () => {
		setSearchValue("");
	};

	const onPopoverOpenChange = (open: boolean) => {
		setIsOpen(open);
	};

	useEffect(() => {
		if (isOpen && itemsListRef.current && triggerRef.current) {
			if (itemsListRef.current.parentNode instanceof HTMLElement) {
				itemsListRef.current.parentNode.style.width = `${triggerRef.current.offsetWidth}px`;
			}
		}
	}, [isOpen]);

	const onInputSubmitted = (inputValue: string) => {
		const duplicatedOption: Option | undefined = options?.find(
			(option) => option.label === inputValue
		);

		if (duplicatedOption) {
			handleItemSelection(
				duplicatedOption.value,
				duplicatedOption.isSelected ?? true
			);
		} else {
			const newOption: Option = {
				label: inputValue,
				value: inputValue,
				isSelected: true,
			};

			setOptions((prevOptions) => [...(prevOptions ?? []), newOption]);
		}
	};

	return {
		onClose,
		onPopoverOpenChange,
		handleItemSelection,
		options: filteredOptions,
		selectedOptions: options?.filter((option) => option.isSelected),
		onSearchChange,
		onInputSubmitted,
		searchValue,
		itemsListRef,
		triggerRef,
	};
}

export default useMultiAutoSelect;
