import { Button, Field, HStack, Input, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toaster } from './ui/toaster';
import { useMutation } from '@tanstack/react-query';

export const Product = () => {
  type FormData = z.infer<typeof formSchema>;
  const { t } = useTranslation();

  const formSchema = z.object({
    name: z.string().min(1, t('validations.required')),
    brand: z.string().min(1, t('validations.required')),
  });

  const form = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const useAddProduct = useMutation({
    mutationFn: (data) =>
      fetch(`/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      toaster.create({
        description: t('product.form.submit.success'),
        type: 'success',
      });
      form.reset();
    },
  });

  const onSubmit = (data) => {
    useAddProduct.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={6} align="stretch" width={600} m="0 auto">
          <HStack>
            <h1>{t('product.header')}</h1>
          </HStack>

          <Field.Root invalid={!!errors.name}>
            <Field.Label>{t('product.name.label')}</Field.Label>
            <Input
              {...register('name')}
              placeholder={t('product.name.placeholder')}
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.brand}>
            <Field.Label>{t('product.brand.label')}</Field.Label>
            <Input
              {...register('brand')}
              placeholder={t('product.brand.placeholder')}
            />
            <Field.ErrorText>{errors.brand?.message}</Field.ErrorText>
          </Field.Root>

          <Button onClick={handleSubmit(onSubmit)}>
            {t('product.button.label')}
          </Button>
        </VStack>
      </form>
    </>
  );
};
