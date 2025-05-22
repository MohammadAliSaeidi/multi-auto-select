import { memo, forwardRef } from "react";
import type { Option, OptionValue } from "../../type";
import Item from "../Item";
import "./index.scss";
import Button from "../../../Button";
import AddIcon from "../../../../../assets/icons/svg/add.svg?react";

type Props = {
	options?: Option[];
	onItemSelect: (value: OptionValue, isSelected: boolean) => void;
	isAddItemInstructionVisible?: boolean;
};

const Content = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const { options, onItemSelect, isAddItemInstructionVisible } = props;

	const items = options?.map((option) => (
		<Item key={option.value} option={option} onSelect={onItemSelect} />
	));

	return (
		<div ref={ref} className="multi-auto-select__content">
			{items}
			{isAddItemInstructionVisible && (
				<div className="add-item-instruction">
					<p role="status">No matching items found.</p>
					<p role="note">
						Press "Enter" to add the current input as a new item.
					</p>
					<Button startIcon={<AddIcon />}>Add Item</Button>
				</div>
			)}
		</div>
	);
});

export default memo(Content);
