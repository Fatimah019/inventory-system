import { Autocomplete, TextField, Typography } from "@mui/material";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useCallback, useState } from "react";
import { Controller } from "react-hook-form";

export const OrdersEdit: React.FC<IResourceComponentsProps> = () => {
  const [quantityMaxReached, setQuantityMaxReached] = useState<string | null>(
    null
  );
  const {
    saveButtonProps,
    register,
    watch,
    control,
    setValue,
    formState: { isSubmitting, isDirty },
  } = useForm({
    refineCoreProps: {
      resource: "orders",
    },
  });

  const { data } = useList({
    resource: "items",
    meta: {
      select: "id, product_name, currency, size, price, quantity",
    },
  });
  const { data: ordersData } = useList({
    resource: "orders",
    meta: {
      select: "id, product_id,quantity",
    },
  });
  const products = data?.data ?? [];
  const orders = ordersData?.data ?? [];

  const selectedProduct = watch("product");
  const product = products.find((p) => p.id === selectedProduct?.id);
  const order = orders.find((o) => o.product_id === selectedProduct?.id);

  const getQuantityMsg = useCallback(
    (
      value: number,
      maxAllowed: number,
      remainingQuantity: number,
      originalQuantity: number
    ) => {
      switch (true) {
        case value <= 0:
          setQuantityMaxReached("Quantity must be at least 1.");
          break;

        // When increasing, validate remaining stock
        case value > originalQuantity && value > remainingQuantity:
          setQuantityMaxReached(
            "ou have reached the max available quantity including previous orders."
          );
          break;

        // Validate the max allowed quantity (remaining + previous order)
        case value > remainingQuantity:
          setQuantityMaxReached(" You have reached the max available stock.");
          break;
        default:
          setQuantityMaxReached(null);
      }
    },
    []
  );
  return (
    <Edit
      saveButtonProps={{
        ...saveButtonProps,
        disabled:
          selectedProduct?.quantity <= 0 ||
          isSubmitting ||
          !!quantityMaxReached ||
          !isDirty,
      }}
    >
      <Controller
        control={control}
        name="product"
        render={({ field }) => (
          <Autocomplete
            {...field}
            defaultValue={product?.id}
            options={products}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) =>
              `${option.product_name || ""} ${option.size || ""}` ?? ""
            }
            onChange={(_, value) => {
              field.onChange(value);
              // setValue("quantity", 1);
              setValue("product_id", value?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product"
                margin="normal"
                defaultValue={product?.id}
                fullWidth
              />
            )}
          />
        )}
      />

      <TextField
        label="Product Size"
        {...register("product.price")}
        margin="normal"
        fullWidth
        value={product?.size || ""}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Price"
        {...register("product.price")}
        fullWidth
        margin="normal"
        value={product?.price || ""}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Currency"
        {...register("product.currency")}
        fullWidth
        margin="normal"
        value={product?.currency || ""}
        InputProps={{ readOnly: true }}
      />
      <Controller
        name="quantity"
        control={control}
        defaultValue={1} // Ensure default value
        render={({ field }) => (
          <TextField
            {...field}
            label="Quantity"
            type="number"
            fullWidth
            margin="normal"
            value={field.value ?? ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              const originalQuantity = order?.quantity ?? 0;
              const remainingQuantity = product?.quantity ?? 0;

              console.log({
                value,
                originalQuantity,
                remainingQuantity,
                b: field.value,
              });
              const maxAllowed = remainingQuantity + originalQuantity;
              field.onChange(value);
              getQuantityMsg(
                value,
                maxAllowed,
                remainingQuantity,
                originalQuantity
              );
            }}
          />
        )}
      />

      {quantityMaxReached && (
        <Typography color="red">{quantityMaxReached}</Typography>
      )}
    </Edit>
  );
};
