import { useState, useEffect } from "react";

interface UseDebounceProps<T> {
	value: T;
	delay: number;
	onDebounce?: (debouncedValue: T) => void;
}

export function useDebounce<T>(props: UseDebounceProps<T>): T {
	const { value, delay, onDebounce } = props;

	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (debouncedValue !== value) {
				setDebouncedValue(value);
				onDebounce?.(value);
			}
		}, delay);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [value, delay, debouncedValue, onDebounce]);

	return debouncedValue;
}
