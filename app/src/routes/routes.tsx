import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';


const Dashboard = lazy(() => import('../pages/Dashboard/index'));
const Overview = lazy(() => import("../pages/Overview/index"));
const History = lazy(() => import('../pages/History/index'));


const ErrorBoundary = ({ error }: { error: Error }) => (
  <div className="p-4 bg-red-100 text-red-800">
    <h1 className="text-lg font-bold">Something went wrong!</h1>
    <p>{error.message}</p>
  </div>
);

const withLoader = (Component: React.FC) => (
  <Suspense fallback={<div className="p-4">Loading...</div>}>
    <Component />
  </Suspense>
);


const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary error={new Error("Page not found")} />,
    children: [
      {
        path: "dashboard",
        element: withLoader(Dashboard),
      },
      {
        path: "overview",
        element: withLoader(Overview),
      },
      {
        path: "history",
        element: withLoader(History),
      },
      {
        path: "*",
        element:withLoader(Dashboard),
      },
    ],
  },
];
const router = createBrowserRouter(routes);
const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;