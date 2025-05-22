import { useCallback, useRef, useState } from "react";
import "./index.scss";
import { useClickOutside } from "../../../hooks/use-click-outside";

type Props = {
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	onOpen?: () => void;
	onClose?: () => void;
	trigger?: React.ReactNode;
	content?: React.ReactNode;
	className?: string;
	triggerClassName?: string;
	contentClassName?: string;
};

export default function Popover(props: Props) {
	const {
		content,
		onClose,
		onOpen,
		onOpenChange,
		defaultOpen,
		trigger,
		className,
		contentClassName,
		triggerClassName,
	} = props;

	const triggerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const handleTrigger = useCallback(() => {
		if (isOpen) onClose?.();
		else onOpen?.();

		setIsOpen((prev) => !prev);
		onOpenChange?.(!isOpen);
	}, [isOpen, onClose, onOpen, onOpenChange]);

	const onClickOutside = useCallback(() => {
		if (isOpen) {
			handleTrigger();
		}
	}, [handleTrigger, isOpen]);

	const popoverRef = useRef<HTMLDivElement>(null);

	const isTriggerInTopHalf = () => {
		if (!triggerRef.current) return true;

		const rect = triggerRef.current.getBoundingClientRect();
		const triggerMiddleY = rect.top + rect.height / 2;
		return triggerMiddleY < window.innerHeight / 2;
	};

	useClickOutside(popoverRef, onClickOutside);

	const handleOpen = () => {
		if (!isOpen) {
			handleTrigger();
		}
	};

	return (
		<div ref={popoverRef} className={`popover ${className ?? ""}`}>
			<div
				ref={triggerRef}
				onClick={() => handleOpen()}
				className={triggerClassName}
			>
				{trigger}
			</div>
			{isOpen && (
				<div
					className={`popover__content ${contentClassName ?? ""}`}
					style={{
						top: isTriggerInTopHalf()
							? "calc(100% + 0.5rem)"
							: "auto",
						bottom: isTriggerInTopHalf()
							? "auto"
							: "calc(100% + 0.5rem)",
					}}
				>
					{content}
				</div>
			)}
		</div>
	);
}
