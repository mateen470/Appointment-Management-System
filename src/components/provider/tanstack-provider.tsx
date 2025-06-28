"use client"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react';
import { TanStackProviderProps } from '@/types/tanstack.types';

export const TanStackProvider = ({ children }: TanStackProviderProps) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 10,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
