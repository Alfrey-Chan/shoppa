import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
	return (
		<Routes>
			<Route path="/:lang?" element={
				<LanguageProvider>
					<Header />
					<HomePage />
					<Footer />
				</LanguageProvider>
			} />
		</Routes>
	);
}

export default App;
