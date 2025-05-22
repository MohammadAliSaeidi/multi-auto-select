import "./style.css";

interface LoadingProps {
	size?: number;
}

export default function Loading(props: LoadingProps) {
	const { size = 48 } = props;

	return (
		<span
			className="loader"
			style={
				{
					"--loading-spinner-size": `${size}px`,
				} as React.CSSProperties
			}
		></span>
	);
}
