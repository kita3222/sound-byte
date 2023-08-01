'use client';

// auth
import { GuestGuard } from 'src/auth/guard';
// components
import AuthLayout from 'src/layouts/auth/layout';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthLayout title="Hi, Welcome to Sound Byte">{children}</AuthLayout>
    </GuestGuard>
  );
}
