'use client';

import * as z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useProfileQuery,
  useUpdateUserMutation,
} from '@/entities/user/model/queries';
import { useSessionQuery } from '@/entities/session';
import { useAuthPayload } from '@/entities/user/model/utils';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  bio: z.string().max(160).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { userId } = useAuthPayload();
  const { data, isSuccess, isLoading, isFetching } = useProfileQuery(userId); // Replace '1' with actual user ID
  const { mutate, isPending } = useUpdateUserMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {},
    disabled: isLoading || isPending,
  });

  async function onSubmit(data: ProfileFormValues) {
    await mutate({
      id: userId, // Replace with actual user ID
      data: {
        bio: data.bio || '',
        profilePicture: '',
        fullName: data.name || '',
      },
    });
    // Simulate API call
    setTimeout(() => {
      toast(`{
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      }`);
    }, 1000);
  }

  useEffect(() => {
    if (isSuccess && data) {
      form.reset({
        name: data.fullName || '',
        email: data.email || '',
        bio: data.bio || '',
      });
    }
  }, [isSuccess, data, form]);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={
                      data.profilePicture
                        ? data.profilePicture
                        : '/placeholder.png'
                    }
                    alt="Profile"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button type="button" variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and
                      organizations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading || isPending ? 'Updating...' : 'Update profile'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Password</h3>
            <p className="text-sm text-muted-foreground">
              Change your password to keep your account secure.
            </p>
          </div>
          <Button variant="outline">Change Password</Button>

          <div className="space-y-2 pt-4">
            <h3 className="text-lg font-medium">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Configure how you receive notifications.
            </p>
          </div>
          <Button variant="outline">Notification Settings</Button>

          <div className="space-y-2 pt-4">
            <h3 className="text-lg font-medium">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all of your data.
            </p>
          </div>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}

