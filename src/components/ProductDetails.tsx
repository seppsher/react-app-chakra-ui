import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '@/models/product.interface';
import { Field, Input, VStack } from '@chakra-ui/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useDebounce from '@/hooks/debounce.hook';
import { toaster } from './ui/toaster';
import { useMutation, useQuery } from '@tanstack/react-query';

export const ProductDetails = ({ id }: { id: string }) => {
  const { t } = useTranslation();

  const [product, setProduct] = useState<Product | null>(null);

  const processChange = useDebounce((value) => useUpdateProduct.mutate(value));

  type FormData = z.infer<typeof formSchema>;

  const formSchema = z.object({
    name: z.string().min(1, t('validations.required')),
  });

  const form = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    formState: { errors },
  } = form;

  const { isLoading } = useQuery({
    queryKey: ['getProductProductDetails'],
    queryFn: () =>
      fetch(`/api/product/${id}`)
        .then((res) => res.json())
        .then((res) => {
          form.setValue('name', res.name);
          setProduct(res);
          return res;
        }),
  });

  const useUpdateProduct = useMutation({
    mutationFn: (value) =>
      fetch(`/api/product/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: value }),
      }),
    onSuccess: () => {
      toaster.create({
        description: 'Nazwa produktu zaktualizowana pomyślnie',
        type: 'success',
      });
    },
  });

  if (isLoading) return <div>Loader</div>;

  return (
    <>
      <VStack gap={6} align="stretch" width={600} m="0 auto">
        <h1>{t('productDetails.header')}</h1>

        <Field.Root invalid={!!errors.name}>
          <Field.Label>{t('product.name.label')}</Field.Label>
          <Input
            {...register('name')}
            onChange={(event) => processChange(event.target.value)}
            placeholder={t('product.name.placeholder')}
          />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>
        <h2>{product?.brand}</h2>
      </VStack>
    </>
  );
};
