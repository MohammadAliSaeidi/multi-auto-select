import "./App.css";
import MultiAutoSelect from "./components/ui/MultiAutoSelect";
import type { CarBrand } from "./types/CarBrandType";
import mockBrands from "./mock/mock_carbrands.json";
import { Controller, useForm } from "react-hook-form";
import type { Option } from "./components/ui/MultiAutoSelect/type";
import { useEffect, useState } from "react";
import Button from "./components/ui/Button";

function App() {
	const optionsData: CarBrand[] = mockBrands;

	const [isBrandsLoading, setIsBrandsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [shouldFetch, setShouldFetch] = useState(true);

	useEffect(() => {
		if (!shouldFetch) return;

		setIsBrandsLoading(true);
		setIsError(false);

		setTimeout(() => {
			setIsBrandsLoading(false);
			setShouldFetch(false);
		}, 5000);
	}, [shouldFetch]);

	const form = useForm<{ carBrand: Option[] }>({
		defaultValues: {
			carBrand: [
				{
					value: mockBrands[0].id,
					label: mockBrands[0].name,
					isSelected: true,
				},
			],
		},
	});

	const onSubmit = (data: { carBrand: Option[] }) => {
		console.log("Selected car brands:", data.carBrand);
	};

	const refetchCarBrands = () => {
		setShouldFetch(true);
	};

	return (
		<div>
			<div>
				<p role="note">
					This form works with mocked data and simulates fetching,
					loading, and error states. To see the multi auto select
					component in an error state, enable the error toggle.
				</p>
				<input
					type="checkbox"
					onChange={(e) => setIsError(e.target.checked)}
				/>
			</div>
			<form onSubmit={form.handleSubmit(onSubmit)} className="test-form">
				<Controller
					control={form.control}
					name="carBrand"
					render={({ field }) => (
						<MultiAutoSelect<CarBrand>
							labelKey="name"
							valueKey="id"
							onRetry={() => refetchCarBrands()}
							optionsData={optionsData}
							defaultValue={field.value}
							isLoading={isBrandsLoading}
							placeholder="Select car brands"
							isError={isError}
							onChange={(selectedValues) => {
								field.onChange(selectedValues);
							}}
						/>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
}

export default App;
