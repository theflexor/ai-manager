import { ROUTES } from '@/shared/constants/routes';
import { getAuth } from '@/shared/api/orval/auth';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useSignInForm() {
  const router = useRouter();

  const { authControllerSignIn } = getAuth();

  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const signInMutation = useMutation({
    mutationFn: authControllerSignIn,
    onSuccess() {
      router.push(ROUTES.HOME);
    },
  });

  const errorMessage = signInMutation.error ? 'Sign in faled' : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isLoading: signInMutation.isPending,
  };
}

