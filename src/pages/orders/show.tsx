import { Typography } from "@mui/material";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { format } from "date-fns";

export const OrdersShow: React.FC<IResourceComponentsProps> = () => {
  const { query } = useShow({
    resource: "orders",
  });

  const { data, isLoading, isError } = query;
  if (isLoading || isError || !data.data)
    return (
      <Show>
        <Typography>Loading</Typography>
      </Show>
    );

  return (
    <Show>
      <Typography>Product Name: {data?.data?.product?.product_name}</Typography>
      <Typography>Product Size: {data?.data?.product?.size}</Typography>
      <Typography>Price: {data?.data?.product?.price}</Typography>
      <Typography>Currency: {data?.data?.product?.currency}</Typography>
      <Typography>Quantity: {data?.data?.quantity}</Typography>
      <Typography>
        Date Ordered:{" "}
        {format(new Date(data.data.created_at), "dd/MM/yyyy HH:mm a")}
      </Typography>
    </Show>
  );
};
