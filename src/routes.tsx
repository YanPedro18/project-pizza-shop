import {createBrowserRouter} from "react-router-dom";
import SignIn from "./Pages/auth/sign-in";
import Dashboard from "./Pages/app/dashboard/dashboard";
import AppLayout from "./Pages/_layouts/app";
import AuthLayout from "./Pages/_layouts/auth";
import SignUp from "./Pages/auth/sign-up";
import Orders from "./Pages/app/orders/orders";
import NotFound from "./Pages/404";
import Error from "./Pages/error";





export const router = createBrowserRouter([

  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    
    children: [ {path: "/", element: <Dashboard />  } ]
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [ {path: "/orders", element: <Orders />  } ]
  },


  {
    path: '/',
    element: <AuthLayout />,
    children: [{path: "/sign-in", element: <SignIn />  }]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{path: "/sign-up", element: <SignUp />  }]
  },
  {
    path: '*',
    element: <NotFound />
  }

  // {path: "/sign-in", element: <SignIn />,  },


]);