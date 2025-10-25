// app/product/[id]/edit/page.tsx
'use client';

import { PageProps } from '@/models/page-props.interface';
import { EditProduct } from '../../../../components/EditProduct';
import { use } from 'react';

export default function EditProductPage({ params }: PageProps) {
  const resolvedParams = use(params);

  return (
    <>
      <EditProduct id={resolvedParams.id} />
    </>
  );
}
