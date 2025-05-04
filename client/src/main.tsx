import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { route } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
<QueryClientProvider client={queryClient}>
    <RouterProvider router={route}/>
    <ToastContainer />
</QueryClientProvider>
);
