import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Routes } from '@/enums/Routes';
import { Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const showDetails = (id) => {
    navigate(Routes.ProductDetails.replace(':id', id));
  };
  const edit = (id) => {
    navigate(Routes.EditProduct.replace(':id', id));
  };

  const { data, isLoading } = useQuery({
    queryKey: ['getProductsUserDetails'],
    queryFn: () => fetch('/api/products').then((res) => res.json()),
  });

  if (isLoading) return <div>Loader</div>;

  return (
    <>
      <HStack>
        <h1>{t('user.header', { id })}</h1>
      </HStack>

      <div>
        <h1>{t('user.products.header')}</h1>

        <ul>
          {data.map((product) => (
            <li key={product.id}>
              {product.id}. {product.name} {product.brand}
              <HStack>
                <Button onClick={() => showDetails(product.id)}>
                  Show details
                </Button>
                <Button onClick={() => edit(product.id)}>Edit</Button>
              </HStack>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
