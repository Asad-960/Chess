import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { route } from "./app/router/Routes.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
<QueryClientProvider client={queryClient}>
    <RouterProvider router={route}/>
</QueryClientProvider>
);
