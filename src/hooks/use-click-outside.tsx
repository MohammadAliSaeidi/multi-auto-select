import { useEffect } from "react";

export const useClickOutside = (
	ref: React.RefObject<HTMLElement | null>,
	callback: (event: MouseEvent | TouchEvent) => void
) => {
	useEffect(() => {
		const handler = (event: MouseEvent | TouchEvent) => {
			const target = event.target as HTMLElement;

			if (ref.current && !ref.current.contains(target)) {
				callback(event);
			}
		};

		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
	}, [ref, callback]);
};
