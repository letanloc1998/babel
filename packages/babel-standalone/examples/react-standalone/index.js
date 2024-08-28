// Copyright (c) 2024 Le Tan Loc. All rights reserved

import App from "./App.jsx";

// React 17
// ReactDOM.render(<App />, document.querySelector("#root"));

const isLocalhost = () =>
	window.location.hostname === "localhost" ||
	window.location.hostname === "127.0.0.1" ||
	window.location.hostname === "" ||
	window.location.hostname === "::1" ||
	hostname.startsWith("192.168.") ||
	hostname.startsWith("10.0.") ||
	hostname.endsWith(".local");

// React 18
ReactDOM.createRoot(document.querySelector("#root")).render(
	isLocalhost ? (
		<React.StrictMode>
			<App />
		</React.StrictMode>
	) : (
		<App />
	)
);
