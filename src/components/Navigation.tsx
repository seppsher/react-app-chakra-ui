// components/Navigation.tsx
'use client';

import { HStack, Button, Container } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Routes as RoutesEnum } from '../enums/Routes';

export default function Navigation() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Container>
      <HStack mb={20} py={4}>
        <Link href={RoutesEnum.Home}>
          <Button variant="subtle">{t('menu.home')}</Button>
        </Link>
        <Link href={RoutesEnum.About}>
          <Button variant="subtle">{t('menu.about')}</Button>
        </Link>
        <Link href={`${RoutesEnum.User}/123`}>
          <Button variant="subtle">{t('menu.user')}</Button>
        </Link>
        <Link href={RoutesEnum.Form}>
          <Button variant="subtle">{t('menu.form')}</Button>
        </Link>
        <Link href={RoutesEnum.Counter}>
          <Button variant="subtle">{t('menu.counter')}</Button>
        </Link>
        <Link href={RoutesEnum.Product}>
          <Button variant="subtle">{t('menu.product')}</Button>
        </Link>

        <Button onClick={() => changeLanguage('en')}>
          {t('menu.language.english')}
        </Button>
        <Button onClick={() => changeLanguage('pl')}>
          {t('menu.language.polish')}
        </Button>
      </HStack>
    </Container>
  );
}
