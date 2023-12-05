
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: {Main},
  },
]);

const NotFoundPageRouter = createBrowserRouter([
  {
    path: "/404",
    element: {NotFound404},
  },
]);

const RoomPageRouter = createBrowserRouter([
  {
    path: "/room:id",
    element: {Room},
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <RouterProvider router={NotFoundPageRouter} />
      <RouterProvider router={RoomPageRouter} />
    </>
  )
}

export default App
