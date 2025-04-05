import { ROUTES } from '@/shared/constants/routes';
import { getAuth } from '@/shared/api/orval/auth';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useSignUpForm() {
  const router = useRouter();

  const { authControllerSignUp } = getAuth();

  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const signUpMutation = useMutation({
    mutationFn: authControllerSignUp,
    onSuccess() {
      router.push(ROUTES.HOME);
    },
  });

  const errorMessage = signUpMutation.error ? 'Sign up faled' : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => signUpMutation.mutate(data)),
    isLoading: signUpMutation.isPending,
  };
}

