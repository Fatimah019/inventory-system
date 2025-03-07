import { Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTable } from "@refinedev/core";
import { DeleteButton, EditButton, List, ShowButton } from "@refinedev/mui";
import { format } from "date-fns";
import { useState } from "react";

export const ItemsList: React.FC<IResourceComponentsProps> = () => {
  const [search, setSearch] = useState("");
  const { tableQueryResult, setFilters } = useTable({
    resource: "items",
    filters: {
      initial: [
        {
          field: "product_name",
          operator: "contains",
          value: search,
        },
      ],
      permanent: [],
    },
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "product_name", headerName: "Product Name", width: 200 },
    {
      field: "created_at",
      headerName: "Date Created",
      width: 250,
      renderCell: ({ row }) =>
        format(new Date(row.created_at), "dd/MM/yyyy HH:mm a"),
    },
    {
      field: "size",
      headerName: "Product Size",
      width: 100,
      renderCell: ({ row }) => row.size.toUpperCase(),
    },
    { field: "price", headerName: "Product Price", width: 100 },
    { field: "currency", headerName: "Currency", width: 100 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
      renderCell: ({ row }) =>
        row.quantity < 1 ? "Out of stock" : row.quantity,
    },
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilters([
      {
        field: "product_name",
        operator: "contains",
        value: e.target.value,
      },
    ]);
  };
  return (
    <List>
      <TextField
        label="Search Item"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />
      <DataGrid
        rows={tableQueryResult?.data?.data || []}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        loading={tableQueryResult?.isLoading}
      />
    </List>
  );
};
