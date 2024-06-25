import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import AddItemPage from "../pages/AddItemPage";
import ItemListPage from "../pages/ListItemPage"; // Import the ItemListPage component
import ItemEditPage from "../pages/EditItemPage";
import Analyze from "../pages/ReportAnalyse";
import Compare from "../pages/compare";

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
        path: "file_upload", // Change the path to "add_item"
        element: <AppLayout />,
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
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <ItemListPage />
          }
        ]
      },
      {
        path: "result",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <ItemEditPage />
          }
        ]
      },
      {
        path: "Analyze",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Analyze />
          }
        ]
      },
      {
        path: "Compare",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Compare />
          }
        ]
      }
    ]
  }
]);
