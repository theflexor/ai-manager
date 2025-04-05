'use client';

import React from 'react';
import { protectedPage } from '@/features/auth/ui/protected-page';

const HomePage = protectedPage(() => {
  return <div>HomePage</div>;
});

export { HomePage };

