// app/user/[id]/page.tsx
'use client';

import { use } from 'react';
import { UserDetails } from '../../../components/UserDetails';
import { PageProps } from '@/models/page-props.interface';

export default function UserPage({ params }: PageProps) {
  const resolvedParams = use(params);

  return (
    <>
      <UserDetails id={resolvedParams.id} />
    </>
  );
}
