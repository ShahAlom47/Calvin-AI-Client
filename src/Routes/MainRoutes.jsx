

import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Register from "../Autentication/Register";
import Login from "../Autentication/Login";
import PrivetRouter from "./PrivetRoutes";
import GeneratePaint from "../Pages/GeneratePaint/GeneratePaint";
import PaintingDetails from "../Pages/PaintingDetails/PaintingDetails";
import Paintings from "../Pages/Paintings/Paintings";

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
        path: '/paintings',
        element: <Paintings></Paintings>
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
        path: '/generatePaint',
        element: <PrivetRouter><GeneratePaint></GeneratePaint></PrivetRouter>
      },
      {
        path: '/paintingDetails/:id',
        element: <PrivetRouter><PaintingDetails></PaintingDetails></PrivetRouter>,
        
      },
    ]
  },
]);

export default router;