import { Typography } from "@mui/material";
import { IResourceComponentsProps, useOne, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { format } from "date-fns";

export const ItemsShow: React.FC<IResourceComponentsProps> = () => {
  const {
    query: { data },
  } = useShow({
    resource: "items",
  });

  const item = data?.data;
  const {
    data: itemData,
    isLoading: itemLoading,
    isError: itemError,
  } = useOne({
    resource: "items",
    id: item?.id,
    queryOptions: {
      enabled: !!item?.id,
    },
  });

  if (itemLoading || itemError || !itemData)
    return (
      <Show>
        <Typography>Loading</Typography>
      </Show>
    );
  return (
    <Show>
      <Typography>Product Name: {itemData?.data?.product_name}</Typography>
      <Typography>
        Product Size: {itemData?.data?.size.toUpperCase()}
      </Typography>
      <Typography>Price: {itemData?.data?.price}</Typography>
      <Typography>Currency: {itemData?.data?.currency}</Typography>
      <Typography>
        Quantity:{" "}
        {itemData?.data?.quantity < 1
          ? " Out of stock"
          : itemData?.data?.quantity}
      </Typography>
      <Typography>
        Date Created:{" "}
        {format(new Date(itemData.data.created_at), "dd/MM/yyyy HH:mm a")}
      </Typography>
    </Show>
  );
};
