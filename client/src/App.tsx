import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, RequireAuth } from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Login from "./pages/Login/Login";
import Single from "./pages/Single/Single";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import NewPost from "./pages/NewPost/NewPost";
import { listPageLoader, singlePageLoader } from "./lib/loaders";

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
					loader: listPageLoader,
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
					loader: singlePageLoader,
				},
			],
		},
		{
			path: "/",
			element: <RequireAuth />,
			children: [
				{
					path: "/profile",
					element: <Profile />,
				},
				{
					path: "/profile/update",
					element: <UpdateUser />,
				},
				{
					path: "/post/add",
					element: <NewPost />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
