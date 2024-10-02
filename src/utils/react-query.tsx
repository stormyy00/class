"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60,
      gcTime: 10 * 1000 * 60,
    },
  },
}); // object, that interacts with the cached queries

export const ReactQueryClientProvider = (props: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);
