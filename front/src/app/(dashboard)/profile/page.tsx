import type { Metadata } from 'next';
import { ProfileForm } from '@/features/profile/ui/profile-form';

export const metadata: Metadata = {
  title: 'Profile - AI Subscription Manager',
  description: 'Manage your profile',
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>
      <ProfileForm />
    </div>
  );
}

