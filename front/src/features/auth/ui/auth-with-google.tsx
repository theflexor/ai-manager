import Link from 'next/link';
import React from 'react';

export const AuthWithGoogle = () => {
  const redirect = process.env.NEXT_PUBLIC_API_URL + '/auth/google';
  return (
    <div>
      <Link href={redirect}>Google</Link>
    </div>
  );
};

