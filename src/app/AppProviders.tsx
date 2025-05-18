import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <SidebarProvider>
        {children}
    </SidebarProvider>
);