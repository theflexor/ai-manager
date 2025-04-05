'use client';

import { ROUTES } from '@/shared/constants/routes';
import { UiTextField } from '@/shared/ui/ui-text-field';
import { useSignUpForm } from '../model/use-sign-up-form';

export function SignUpForm() {
  const { handleSubmit, errorMessage, isLoading, register } = useSignUpForm();

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <UiTextField
        label="Email"
        inputProps={{ type: 'email', ...register('email', { required: true }) }}
      />
      <UiTextField
        label="Password"
        inputProps={{
          type: 'password',
          ...register('password', { required: true }),
        }}
      />
      <button disabled={isLoading}>Sign Up</button>
      <a className="text-center" href={ROUTES.SIGN_IN}>
        Sign In
      </a>
      {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
    </form>
  );
}

