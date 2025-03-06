import { TextField } from "@mui/material";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export const OrdersEdit: React.FC<IResourceComponentsProps> = () => {
  const { saveButtonProps, register, getValues } = useForm({
    refineCoreProps: {
      resource: "orders",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextField
        label="Product Name"
        {...register("product.product_name")}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Product Size"
        {...register("product.size")}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />

      <TextField
        label="Price"
        {...register("product.price")}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Currency"
        {...register("product.currency")}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />

      {/* <FormControl fullWidth margin="normal">
        <InputLabel>Quantity</InputLabel>

        <Controller
          control={control}
          name="quantity" // This should match your API field name
          render={({ field }) => (
            <NumberField value={field.value || 0} margin="normal" />
          )}
        />
      </FormControl> */}

      <TextField
        label="Quantity"
        type="number"
        {...register("quantity")}
        value={Number(getValues("quantity"))}
        fullWidth
        margin="normal"
      />
    </Edit>
  );
};
