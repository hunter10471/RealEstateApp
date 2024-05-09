import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Login from "./pages/Login/Login";
import Single from "./pages/Single/Single";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/list",
					element: <List />,
				},
				{
					path: "/login",
					element: <Login />,
				},
				{
					path: "/register",
					element: <Register />,
				},
				{
					path: "/:id",
					element: <Single />,
				},
				{
					path: "/profile",
					element: <Profile />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
