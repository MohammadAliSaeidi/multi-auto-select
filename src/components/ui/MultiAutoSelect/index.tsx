import Popover from "../Popover";
import ItemsList from "./components/ItemsList";
import AutoSelectInput from "./components/AutoSelectInput";
import type { MultiAutoSelectPropsBase } from "./type";
import useMultiAutoSelect from "./use-multi-auto-select";
import type { ReactNode } from "react";

type Props<T> = MultiAutoSelectPropsBase<T> & {
	optionsData?: T[];
	placeholder?: string;
	visibleSelectedCountLimit?: number;
	isError?: boolean;
	customError?: ReactNode;
	onRetry?: () => void;
};

export default function MultiAutoSelect<T>(props: Props<T>) {
	const {
		placeholder,
		visibleSelectedCountLimit,
		labelKey,
		valueKey,
		optionsData,
		defaultValue,
		isError,
		isLoading,
		customError,
		onRetry,
		onChange,
	} = props;

	const {
		handleItemSelection,
		onClose,
		options,
		onSearchChange,
		onInputSubmitted,
		selectedOptions,
		searchValue,
		itemsListRef,
		triggerRef,
		onPopoverOpenChange,
		isOpen,
	} = useMultiAutoSelect({
		isLoading,
		optionsData,
		labelKey,
		onChange,
		valueKey,
		defaultValue,
	});

	return (
		<Popover
			onClose={onClose}
			onOpenChange={onPopoverOpenChange}
			content={
				<ItemsList
					ref={itemsListRef}
					isError={isError}
					isLoading={isLoading}
					options={options}
					onItemSelect={handleItemSelection}
					onRetry={onRetry}
					isAddItemInstructionVisible={
						!!searchValue &&
						searchValue?.length > 0 &&
						options &&
						options?.length === 0
					}
				/>
			}
			trigger={
				<AutoSelectInput
					customError={customError}
					isError={isError}
					isLoading={isLoading}
					isPopoverOpen={isOpen}
					ref={triggerRef}
					onInputSubmitted={onInputSubmitted}
					onSearchChange={onSearchChange}
					selectedOptions={selectedOptions}
					visibleSelectedCountLimit={visibleSelectedCountLimit}
					placeholder={placeholder}
				/>
			}
		/>
	);
}
