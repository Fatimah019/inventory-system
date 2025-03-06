import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const ItemsEdit: React.FC<IResourceComponentsProps> = () => {
  const { saveButtonProps, register, control } = useForm({
    refineCoreProps: {
      resource: "items",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextField
        label="Product Name"
        {...register("product_name")}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Product Size</InputLabel>
        <Controller
          control={control}
          name="size" // This should match your API field name
          render={({ field }) => (
            <Select {...field} value={field.value || ""}>
              {[
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
                { label: "Large", value: "large" },
              ].map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <TextField
        label="Price"
        {...register("price")}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Currency</InputLabel>

        <Controller
          control={control}
          name="currency" // This should match your API field name
          render={({ field }) => (
            <Select {...field} value={field.value || ""}>
              {[
                { label: "USD", value: "USD" },
                { label: "NGN", value: "NGN" },
              ].map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <TextField
        label="Quantity"
        type="number"
        {...register("quantity")}
        fullWidth
        margin="normal"
      />
    </Edit>
  );
};
