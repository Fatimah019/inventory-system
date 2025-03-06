import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
export const ItemsCreate: React.FC<IResourceComponentsProps> = () => {
  const { saveButtonProps, register } = useForm({
    refineCoreProps: {
      resource: "items",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <TextField
        label="Product Name"
        {...register("product_name")}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Product Size</InputLabel>
        <Select {...register("size")}>
          {[
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ]?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Price"
        {...register("price")}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Currency</InputLabel>
        <Select {...register("currency")}>
          {[
            { label: "USD", value: "USD" },
            { label: "NGN", value: "NGN" },
          ]?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Quantity"
        type="number"
        {...register("quantity")}
        fullWidth
        margin="normal"
      />
    </Create>
  );
};
