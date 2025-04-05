import { AuthWithGoogle, SignUpForm } from '@/features/auth';

export const SignUpPage = () => {
  return (
    <div>
      <AuthWithGoogle />
      <SignUpForm />
    </div>
  );
};

