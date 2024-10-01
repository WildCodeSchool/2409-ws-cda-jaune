import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdDetail from "./pages/AdDetail.tsx";
import RecentAds from "./components/RecentAds.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <RecentAds />,
			},
			{
				path: "/about",
				element: <p>About</p>,
			},
			{
				path: "/ads/:adId",
				element: <AdDetail />,
			},
		],
	},
]);

// biome-ignore lint/style/noNonNullAssertion: There *must* be a #root element for my whole page to work, this has no meaning otherwise
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
