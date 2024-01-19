"use client";
import { Toaster } from "react-hot-toast";
// https://react-hot-toast.com/
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ToastReactQueryProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // milliseconds, this is 1 minute
          },
        },
      })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
