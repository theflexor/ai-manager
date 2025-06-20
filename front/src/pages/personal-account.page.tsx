import { UserProfileWidget } from '@/widgets/user-profile';
import { WalletWidget } from '@/widgets/wallet';

export function PersonalAccountPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <UserProfileWidget />
        <WalletWidget />
      </div>
    </div>
  );
}

