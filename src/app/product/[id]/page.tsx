// app/product/[id]/page.tsx
'use client';

import { use } from 'react';
import { ProductDetails } from '../../../components/ProductDetails';
import { PageProps } from '@/models/page-props.interface';

export default function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  return (
    <>
      <ProductDetails id={resolvedParams.id} />
    </>
  );
}
