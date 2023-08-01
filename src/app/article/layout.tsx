'use client';

// auth
import { AuthGuard } from 'src/auth/guard';
// components
import AppLayout from 'src/layouts/app';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  );
}
