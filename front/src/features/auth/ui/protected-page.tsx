import { PropsWithChildren, ReactElement } from 'react';

import { ROUTES } from '@/shared/constants/routes';
import { UiSpinner } from '@/shared/ui/ui-page-spinner';
import { useRouter } from 'next/navigation';
import { useSessionQuery } from '@/entities/session';

export function protectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const router = useRouter();

    const { isError, isLoading } = useSessionQuery();

    if (isLoading) {
      return <UiSpinner className="m-auto" />;
    }

    if (isError) {
      router.replace(ROUTES.SIGN_IN);
    }

    return <Component {...props} />;
  };
}

