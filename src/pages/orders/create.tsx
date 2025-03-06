import { Autocomplete, TextField, Typography } from "@mui/material";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
export const OrdersCreate: React.FC<IResourceComponentsProps> = () => {
  const { saveButtonProps, register, watch, control, setValue } = useForm({
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
  const products = data?.data ?? [];

  const selectedProduct = watch("product");

  // Find selected product
  const product = products.find((p) => p.id === selectedProduct?.id);

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        disabled: product?.quantity === 0,
      }}
    >
      <Controller
        control={control}
        name="product"
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={products}
            getOptionLabel={(option) =>
              `${option.product_name} ${option.size}` ?? ""
            }
            onChange={(_, value) => {
              field.onChange(value);
              setValue("quantity", value?.quantity);
              setValue("product_id", value?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product"
                margin="normal"
                fullWidth
              />
            )}
          />
        )}
      />

      <TextField
        label="Product Size"
        margin="normal"
        fullWidth
        value={product?.size || ""}
        InputProps={{ readOnly: true }}
      />

      <TextField
        label="Price"
        margin="normal"
        fullWidth
        value={`${product?.currency} ${product?.price}` || ""}
        InputProps={{ readOnly: true }}
      />

      {product?.quantity === 0 ? (
        <Typography>Out of stock</Typography>
      ) : (
        <TextField
          label="Quantity"
          type="number"
          {...register("quantity")}
          value={Number(watch("quantity"))}
          fullWidth
          margin="normal"
        />
      )}
    </Create>
  );
};
