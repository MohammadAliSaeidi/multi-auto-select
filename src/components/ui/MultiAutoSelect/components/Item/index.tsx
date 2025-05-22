import type { Option, OptionValue } from "../../type";
import "./index.scss";
import CheckIcon from "../../../../../assets/icons/svg/done.svg?react";

type Props = {
	option: Option;
	onSelect: (value: OptionValue, isSelected: boolean) => void;
};

export default function Item(props: Props) {
	const {
		option: { label, value, isSelected },
		onSelect,
	} = props;

	return (
		<div
			onClick={() => onSelect(value, isSelected ?? false)}
			className={`multi-auto-select__item ${
				isSelected ? "multi-auto-select__item--selected" : ""
			}`}
		>
			{label}
			{isSelected && (
				<CheckIcon className="multi-auto-select__item-icon" />
			)}
		</div>
	);
}
