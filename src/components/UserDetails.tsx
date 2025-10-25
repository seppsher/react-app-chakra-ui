import { HStack, Table } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Routes } from '@/enums/Routes';
import { Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { Product } from '@/models/product.interface';

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

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Nazwa produktu',
      cell: (info) => (
        <span className="font-medium">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: 'brand',
      header: 'Marka',
      cell: (info) => info.getValue(),
    },
    {
      id: 'actions',
      header: 'Akcje',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button onClick={() => edit(row.original.id)}>Edit</Button>
          <Button onClick={() => showDetails(row.original.id)}>
            Show details
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loader</div>;

  return (
    <>
      <HStack>
        <h1>{t('user.header', { id })}</h1>
      </HStack>

      <div>
        <h1>{t('user.products.header')}</h1>

        <Table.Root size="sm">
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            ))}
          </Table.Header>

          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
};
