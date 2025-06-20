'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useSignUpForm } from '../model/use-sign-up-form';

export function RegisterForm() {
  const { handleSubmit, form, isLoading } = useSignUpForm();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </Form>
  );
}

