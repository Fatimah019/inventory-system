import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTable } from "@refinedev/core";
import { DeleteButton, EditButton, List, ShowButton } from "@refinedev/mui";
import { format } from "date-fns";

export const OrdersList: React.FC<IResourceComponentsProps> = () => {
  const { tableQuery } = useTable({
    resource: "orders",
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "product.product_name",
      headerName: "Product Name",
      width: 200,
      valueGetter: (params) =>
        params.row.product?.product_name ?? "Unknown Product",
    },
    {
      field: "created_at",
      headerName: "Date Ordered",
      width: 250,
      renderCell: ({ row }) =>
        format(new Date(row.created_at), "dd/MM/yyyy HH:mm a"),
    },
    {
      field: "product.size",
      headerName: "Product Size",
      width: 100,
      valueGetter: (params) => params.row.product?.size ?? "Unknown Size",
    },
    {
      field: "product.price",
      headerName: "Product Price",
      width: 100,
      valueGetter: (params) => params.row.product?.price ?? "Unknown Product",
    },
    {
      field: "product.currency",
      headerName: "Currency",
      width: 100,
      valueGetter: (params) =>
        params.row.product?.currency ?? "Unknown Product",
    },
    { field: "quantity", headerName: "Quantity", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 250,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <ShowButton hideText size="small" recordItemId={row.id} />
          <EditButton hideText size="small" recordItemId={row.id} />
          <DeleteButton hideText size="small" recordItemId={row.id} />
        </Stack>
      ),
    },
  ];

  const rows = tableQuery?.data?.data?.map((order) => ({
    ...order,
    product_name: order.product?.product_name,
    size: order.product?.size,
    price: order.product?.price,
    currency: order.product?.currency,
  }));

  return (
    <List>
      <DataGrid
        rows={rows || []}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        loading={tableQuery?.isLoading}
      />
    </List>
  );
};
