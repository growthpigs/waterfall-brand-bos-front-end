import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.tsx";
import "./index.css";

console.log("App started successfully");

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// HMR Connection Logger
function HMRLogger() {
  useEffect(() => {
    console.log("Vite HMR connected");

    // Check if HMR is available
    if (import.meta.hot) {
      console.log("HMR is available and active");

      // Listen for HMR updates
      import.meta.hot.on("vite:beforeUpdate", () => {
        console.log("HMR: About to update");
      });

      import.meta.hot.on("vite:afterUpdate", () => {
        console.log("HMR: Update completed");
      });
    } else {
      console.log("HMR is not available (production build)");
    }
  }, []);

  return null;
}

function AppWithHMR() {
  return (
    <QueryClientProvider client={queryClient}>
      <HMRLogger />
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWithHMR />
  </React.StrictMode>,
);
