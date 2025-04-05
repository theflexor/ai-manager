import { AuthWithGoogle, SignInForm } from '@/features/auth';

export const SignInPage = () => {
  return (
    <div>
      <AuthWithGoogle />
      <SignInForm />
    </div>
  );
};

