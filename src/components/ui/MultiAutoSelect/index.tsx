import Popover from "../Popover";
import ItemsList from "./components/ItemsList";
import AutoSelectInput from "./components/AutoSelectInput";
import type { MultiAutoSelectPropsBase } from "./type";
import useMultiAutoSelect from "./use-multi-auto-select";

type Props<T> = MultiAutoSelectPropsBase<T> & {
	optionsData?: T[];
	placeholder?: string;
	visibleSelectedCountLimit?: number;
	isError?: boolean;
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
	} = useMultiAutoSelect({
		isLoading,
		optionsData,
		labelKey,
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
					options={options}
					onItemSelect={handleItemSelection}
					isAddItemInstructionVisible={
						searchValue !== "" && options?.length === 0
					}
				/>
			}
			trigger={
				<AutoSelectInput
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
