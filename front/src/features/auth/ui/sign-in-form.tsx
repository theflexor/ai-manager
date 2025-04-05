'use client';

import { ROUTES } from '@/shared/constants/routes';
import { UiTextField } from '@/shared/ui/ui-text-field';
import { useSignInForm } from '../model/use-sign-in-form';

export function SignInForm() {
  const { handleSubmit, errorMessage, isLoading, register } = useSignInForm();

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
      <button disabled={isLoading}>Sign In</button>
      <a className="text-center" href={ROUTES.SIGN_UP}>
        Sign Up
      </a>
      {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
    </form>
  );
}

