import { Typography } from "@mui/material";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { format } from "date-fns";

export const ItemsShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({
    resource: "items",
  });

  const { data, isLoading, isError } = queryResult;
  if (isLoading || isError || !data.data)
    return (
      <Show>
        <Typography>Loading</Typography>
      </Show>
    );
  return (
    <Show>
      <Typography>Product Name: {data?.data?.product_name}</Typography>
      <Typography>Product Size: {data?.data?.size.toUpperCase()}</Typography>
      <Typography>Price: {data?.data?.price}</Typography>
      <Typography>Currency: {data?.data?.currency}</Typography>
      <Typography>
        Quantity:{" "}
        {data?.data?.quantity < 1 ? " Out of stock" : data?.data?.quantity}
      </Typography>
      <Typography>
        Date Created:{" "}
        {format(new Date(data.data.created_at), "dd/MM/yyyy HH:mm a")}
      </Typography>
    </Show>
  );
};
