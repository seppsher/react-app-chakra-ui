'use client';
import { Button, HStack } from '@chakra-ui/react';
import { Routes } from '../enums/Routes';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export const Home = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(Routes.About);
  };

  const { t } = useTranslation();

  return (
    <>
      <h1>{t('home.header')}</h1>
      <HStack>
        <Button onClick={handleNavigate}>{t('home.button')}</Button>
      </HStack>
    </>
  );
};
