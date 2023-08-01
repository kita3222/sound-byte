'use client';

import { useEffect } from 'react';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from '../config-global';
// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();

  const { authenticated, unauthenticated } = useAuthContext();
  useEffect(() => {
    if (unauthenticated) {
      router.push(paths.auth.amplify.login);
    }
    if (authenticated) {
      router.push(PATH_AFTER_LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, unauthenticated]);

  return null;
}
