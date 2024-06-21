import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeRoute from "./Routes/HomeRoute";
import VideoRoute from "./Routes/VideoRoute";
import LoginRoute from "./Routes/LoginRoute";
import Subscribe from './pages/GetMsisdn'
import Redirect from "./pages/Redirect";
import Error from "./pages/Error";
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",element:<Subscribe />
    },  {
      path:"/redirect",element:<Redirect />
    },
    {
      path:"/login",element:<LoginRoute />
    },
    {
      path: "/home",
      element: <HomeRoute />,
    },
    {
      path:"/videos/:id",element:<VideoRoute />
    },
    {
      path:"/error",element:<Error />
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>
};

export default App;


