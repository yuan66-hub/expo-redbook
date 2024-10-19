import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
export default function Providers({ children }: any) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
