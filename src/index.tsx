import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<>
		<App />
		<Toaster />
	</>
);


// git remote remove origin

// git remote add origin https://github.com/ArmirMirafzal/react-js-sinf-ishi-9-modul.git