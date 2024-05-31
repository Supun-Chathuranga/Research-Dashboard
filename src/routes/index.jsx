import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import AddItemPage from "../pages/AddItemPage";
import ItemListPage from "../pages/ListItemPage"; // Import the ItemListPage component
import ItemEditPage from "../pages/EditItemPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: "add_item", // Change the path to "add_item"
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <AddItemPage />
          }
        ]
      },
      // Add a route for the ItemListPage
      {
        path: "item_list",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <ItemListPage />
          }
        ]
      },
      {
        path: "item_edit/:id",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <ItemEditPage />
          }
        ]
      }
    ]
  }
]);
