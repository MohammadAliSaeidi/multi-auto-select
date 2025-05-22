import { memo, forwardRef } from "react";
import type { Option, OptionValue } from "../../type";
import Item from "../Item";
import "./index.scss";
import Button from "../../../Button";
import NoConnectionIcon from "@/assets/icons/svg/wifi.svg?react";
import RetryIcon from "@/assets/icons/svg/refresh.svg?react";
import Loading from "@/components/ui/Loading";

type Props = {
	options?: Option[];
	onItemSelect: (value: OptionValue, isSelected: boolean) => void;
	isAddItemInstructionVisible?: boolean;
	isError?: boolean;
	isLoading?: boolean;
	onRetry?: () => void;
};

const Content = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const {
		options,
		onItemSelect,
		isAddItemInstructionVisible,
		isError,
		isLoading,
		onRetry,
	} = props;

	const items = options?.map((option) => (
		<Item key={option.value} option={option} onSelect={onItemSelect} />
	));

	const renderError = () => {
		return (
			!isLoading &&
			isError && (
				<div role="status" className="status error">
					<NoConnectionIcon />
					<p>Unable to fetch items.</p>
					{onRetry && (
						<Button
							type="button"
							onClick={onRetry}
							endIcon={<RetryIcon />}
							variant="ghost"
						>
							Retry
						</Button>
					)}
				</div>
			)
		);
	};

	const renderAddItemInstruction = () => {
		return (
			<div className="add-item-instruction">
				<p role="status">No matching items found.</p>
				<p role="note">
					Press "Enter" to add the current input as a new item.
				</p>
			</div>
		);
	};

	const renderEmptyList = () => {
		return (
			<p className="empty-list">
				<p role="status">empty list</p>
				<p role="note">
					you can add a new item by typing it in the input and
					pressing "Enter"
				</p>
			</p>
		);
	};

	return (
		<div ref={ref} className="multi-auto-select__content">
			{isLoading && !isError && (
				<div className="status loading">
					<Loading size={20} />
				</div>
			)}
			{renderError()}
			{!isLoading && !isError && (
				<>
					{isAddItemInstructionVisible
						? renderAddItemInstruction()
						: items && items.length > 0
						? items
						: renderEmptyList()}
				</>
			)}
			{}
		</div>
	);
});

export default memo(Content);
