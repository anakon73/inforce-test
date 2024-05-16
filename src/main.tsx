import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { ListPage } from "./pages/ListPage.tsx";
import { ProductPage } from "./pages/ProductPage.tsx";
import { store } from "./store/index.ts";
import { App } from "./App.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "", element: <ListPage /> },
      { path: ":id", element: <ProductPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
