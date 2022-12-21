import MainLayout from "@/layout/MainLayout";
import Home from "@/pages";
import Page404 from "@/pages/404";

const router = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Page404 />,
        path: "*",
      },
    ],
  },
];

export default router;
