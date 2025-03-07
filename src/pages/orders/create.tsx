import { Autocomplete, TextField, Typography } from "@mui/material";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";

export const OrdersCreate: React.FC<IResourceComponentsProps> = () => {
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
  const products = useMemo(() => data?.data || [], [data?.data]);

  const selectedProduct = watch("product");

  // Find selected product
  const product = useMemo(
    () => products.find((p) => p.id === selectedProduct?.id),
    [products, selectedProduct?.id]
  );

  useEffect(() => {
    setQuantityMaxReached(null);
    setValue("quantity", 1);
  }, [product, setValue]);
  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        disabled:
          watch("quantity") <= 0 ||
          product?.quantity === 0 ||
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
        value={`${product?.currency || ""} ${product?.price || ""}`}
        InputProps={{ readOnly: true }}
      />
      {product?.quantity === 0 ? (
        <Typography>Out of stock</Typography>
      ) : (
        <TextField
          label="Quantity"
          type="number"
          defaultValue={1}
          {...register("quantity")}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value > product?.quantity) {
              setQuantityMaxReached("You have reached the max");
            } else {
              setValue("quantity", value);
              setQuantityMaxReached(null);
            }
          }}
          fullWidth
          margin="normal"
        />
      )}
      {quantityMaxReached && (
        <Typography color="red">{quantityMaxReached}</Typography>
      )}
    </Create>
  );
};
