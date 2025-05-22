import "./App.css";
import MultiAutoSelect from "./components/ui/MultiAutoSelect";
import type { CarBrand } from "./types/CarBrandType";
import mockBrands from "./mock/mock_carbrands.json";

function App() {
	const optionsData: CarBrand[] = mockBrands;

	return (
		<>
			<MultiAutoSelect<CarBrand>
				labelKey="name"
				valueKey="id"
				optionsData={optionsData}
			/>
		</>
	);
}

export default App;
