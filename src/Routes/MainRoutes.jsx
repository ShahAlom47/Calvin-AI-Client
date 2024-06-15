

import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Register from "../Autentication/Register";
import Login from "../Autentication/Login";
import PrivetRouter from "./PrivetRoutes";
import GeneratePaint from "../Pages/GeneratePaint/GeneratePaint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/login',
        element: <PrivetRouter><GeneratePaint></GeneratePaint></PrivetRouter>
      },
    ]
  },
]);

export default router;